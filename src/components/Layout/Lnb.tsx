import { useState } from "react";
import { Desk } from "../../types/desk";
import { SearchBar } from "./SearchBar";
import { DeskTooltip } from "../Tooltip/DeskTooltip";
import { OfficeName } from "../../constants/offices";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

const OFFICE_NAMES: { id: OfficeName; label: string }[] = [
  { id: "HQ12", label: "본진 12층" },
  { id: "HQ13", label: "본진 13층" },
  { id: "FF9", label: "패스트파이브 9층" },
  { id: "FF10", label: "패스트파이브 10층" },
];

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
      const match = path.match(/\/seating-chart\/(HQ12|HQ13|FF9)/);
      return match ? (match[1] as OfficeName) : null;
    }
  );

  const filteredDesks = desks.filter((desk) => {
    const searchLower = searchText.toLowerCase();
    return (
      desk.occupant?.name?.toLowerCase().includes(searchLower) ||
      desk.occupant?.team?.toLowerCase().includes(searchLower)
    );
  });

  const handleDeskClick = (desk: Desk, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipState({
      show: true,
      position: { x: rect.right + 10, y: rect.top },
      desk,
    });
    onDeskSelect(desk.id);
  };

  const handleOfficeClick = (office: OfficeName) => {
    setSelectedOffice(office);
    navigate(`/seating-chart/${office}`);
  };

  return (
    <div className="z-10">
      <div className="absolute left-4 w-[200px] bg-white rounded-lg shadow-lg">
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
              <span>{office.label}</span>
              {selectedOffice === office.id && (
                <CheckOutlined className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-[230px] w-[200px] bg-white rounded-lg shadow-lg">
        <SearchBar
          value={searchText}
          onChange={(value) => setSearchText(value)}
          placeholder="팀/이름으로 검색"
          searchText={searchText}
          filteredDesks={filteredDesks}
          onDeskSelect={(desk, event) => handleDeskClick(desk, event)}
        />
      </div>
      {tooltipState.show && tooltipState.desk?.occupant && (
        <DeskTooltip
          occupant={tooltipState.desk.occupant}
          position={tooltipState.position}
          onClose={() => setTooltipState((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};
