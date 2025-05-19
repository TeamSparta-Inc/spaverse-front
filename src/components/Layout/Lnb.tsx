import { Suspense, useState, useEffect } from "react";
import { Desk } from "../../types/desk";
import { SearchBar } from "./SearchBar";
import { DeskTooltip } from "../Tooltip/DeskTooltip";
import { OFFICE_NAMES, OfficeName } from "../../constants/offices";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllDesks } from "../../quries/desk.query";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const Lnb = ({ desks, onDeskSelect }: LnbProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const [tooltipState, setTooltipState] = useState<{
    show: boolean;
    position: { x: number; y: number };
    desk: Desk | null;
  }>({
    show: false,
    position: { x: 0, y: 0 },
    desk: null,
  });

  // 현재 URL에서 선택된 층을 가져옵니다
  const [selectedOffice, setSelectedOffice] = useState<OfficeName | null>(
    () => {
      const path = location.pathname;
      const match = path.match(
        /\/(seating-chart|change-seats)\/(HQ12|HQ13|FF9)/
      );
      return match ? (match[2] as OfficeName) : null;
    }
  );

  // URL이 변경되면 selectedOffice 상태를 업데이트합니다
  useEffect(() => {
    const officeParam = params.officeName as OfficeName;
    if (officeParam && officeParam !== selectedOffice) {
      setSelectedOffice(officeParam);
    }
  }, [params.officeName]);

  // 모든 층의 데스크 데이터를 가져옵니다
  const { data: allDesks = [] } = useGetAllDesks();

  // 현재 층과 전체 층 데스크를 합쳐서 검색 대상으로 사용 (중복 제거)
  const searchTargetDesks = [...allDesks];

  // 정확한 검색을 위한 필터링 로직
  const filteredDesks = searchTargetDesks.filter((desk) => {
    if (!debouncedSearchText) return false; // 검색어가 없으면 결과를 표시하지 않음

    const searchLower = debouncedSearchText.toLowerCase();
    const name = desk.occupant?.name?.toLowerCase() || "";
    const team = desk.occupant?.team?.toLowerCase() || "";

    // 1. 전체 이름이 정확히 일치하는 경우 (최우선)
    if (name === searchLower) return true;

    // 2. 성+이름 순서대로 포함되는 경우 (예: "김철수"를 검색하면 "김"으로 시작하고 "철수"가 포함)
    const nameParts = searchLower.split("");
    let nameMatches = true;
    let lastIndex = -1;

    for (const char of nameParts) {
      const nextIndex = name.indexOf(char, lastIndex + 1);
      if (nextIndex === -1) {
        nameMatches = false;
        break;
      }
      lastIndex = nextIndex;
    }

    if (nameMatches) return true;

    // 3. 팀명에 검색어가 포함되는 경우
    if (team.includes(searchLower)) return true;

    return false;
  });

  const handleDeskClick = (desk: Desk, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipState({
      show: true,
      position: { x: rect.right + 10, y: rect.top },
      desk,
    });
    onDeskSelect(desk.desk_unique_id);

    // 데스크의 층 정보를 확인하고, 해당 층으로 이동
    const office = desk.desk_unique_id.split("_")[0] as OfficeName;
    if (office && office !== selectedOffice) {
      console.log(`다른 층으로 이동: ${office}`);
      handleOfficeClick(office);
    }
  };

  const handleOfficeClick = (office: OfficeName) => {
    console.log("handleOfficeClick 호출됨:", office);
    setSelectedOffice(office);

    // 현재 경로가 change-seat인지 seating-chart인지 확인
    const isChangeSeatPage = location.pathname.includes("/change-seats");
    const targetPath = isChangeSeatPage
      ? `/change-seats/${office}`
      : `/seating-chart/${office}`;

    console.log("이동할 경로:", targetPath);
    navigate(targetPath);
  };

  return (
    <div className="z-10">
      <div className="absolute left-4 top-[24px] w-[200px] bg-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          {OFFICE_NAMES.map((office, index) => (
            <div
              key={office.id}
              onClick={() => handleOfficeClick(office.id)}
              className={`p-4 text-[15px] hover:bg-gray-50 cursor-pointer ${
                index !== OFFICE_NAMES.length - 1
                  ? "border-b border-gray-200"
                  : ""
              } font-[15px] leading-[22px] flex justify-between items-center ${
                selectedOffice === office.id ? "text-red-500" : "text-[#81898F]"
              }`}
            >
              <span style={{ fontFamily: "Pretendard" }}>{office.label}</span>
              {selectedOffice === office.id && (
                <CheckOutlined className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-[254px] w-[200px] bg-white rounded-lg shadow-lg">
        <SearchBar
          value={searchText}
          onChange={(value) => setSearchText(value)}
          placeholder="팀명 또는 이름으로 검색 (전체 층)"
          searchText={debouncedSearchText}
          filteredDesks={filteredDesks}
          onDeskSelect={(desk, event) => handleDeskClick(desk, event)}
        />
      </div>
      {tooltipState.show && tooltipState.desk?.occupant && (
        <Suspense>
          <DeskTooltip
            occupant={tooltipState.desk.occupant}
            position={tooltipState.position}
            onClose={() =>
              setTooltipState((prev) => ({ ...prev, show: false }))
            }
          />
        </Suspense>
      )}
    </div>
  );
};
