import { Suspense, useState } from "react";
import { Desk, Team } from "../../types/desk";
import { SearchBar } from "./SearchBar";
import { DeskTooltip } from "../Tooltip/DeskTooltip";
import { OFFICE_NAMES, OfficeName } from "../../constants/offices";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const Lnb = ({ desks, onDeskSelect }: LnbProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [tooltipState, setTooltipState] = useState<{
    show: boolean;
    position: { x: number; y: number };
    desk: Desk | null;
  }>({
    show: false,
    position: { x: 0, y: 0 },
    desk: null,
  });
  const [selectedOffice, setSelectedOffice] = useState<OfficeName | null>(
    () => {
      const path = location.pathname;
      const match = path.match(
        /\/(seating-chart|change-seats)\/(HQ12|HQ13|FF9)/
      );
      return match ? (match[2] as OfficeName) : null;
    }
  );

  const filteredDesks = desks.filter((desk) => {
    const searchLower = searchText.toLowerCase();

    if (searchText) {
      return (
        (desk.occupant?.name?.toLowerCase().includes(searchLower) ||
          desk.occupant?.team?.toLowerCase().includes(searchLower)) &&
        desk.occupant?.team !== ("Unknown Team" as Team)
      );
    }

    return true;
  });

  const handleDeskClick = (desk: Desk, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipState({
      show: true,
      position: { x: rect.right + 10, y: rect.top },
      desk,
    });
    onDeskSelect(desk.desk_unique_id);
  };

  const handleOfficeClick = (office: OfficeName) => {
    setSelectedOffice(office);

    // 현재 경로가 change-seat인지 seating-chart인지 확인
    const isChangeSeatPage = location.pathname.includes("/change-seats");

    if (isChangeSeatPage) {
      navigate(`/change-seats/${office}`);
    } else {
      navigate(`/seating-chart/${office}`);
    }
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
              <span style={{ fontFamily: 'Pretendard' }}>{office.label}</span>
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
          placeholder="팀명 또는 이름으로 검색"
          searchText={searchText}
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
