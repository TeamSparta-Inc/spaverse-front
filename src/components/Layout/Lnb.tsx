import { useState } from "react";
import { Desk } from "../../types/desk";
import { SearchBar } from "./SearchBar";
import { DeskTooltip } from "../Tooltip/DeskTooltip";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const Lnb = ({ desks, onDeskSelect }: LnbProps) => {
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

  return (
    <div className="z-10">
      <button className="absolute left-4 top-[80px] w-[200px] flex justify-center items-center px-4 py-3 gap-1.5 rounded-md bg-slate-700 text-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08),0px_0px_4px_0px_rgba(0,0,0,0.12)] text-[15px] leading-[22px] font-bold">
        자리 바꾸기
      </button>

      <div className="absolute left-4 top-[140px] w-[200px] bg-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          <div className="p-4 text-[15px] text-[#81898F] hover:bg-gray-50 cursor-pointer border-b border-gray-200 font-[15px] leading-[22px]">
            본진 12층
          </div>
          <div className="p-4 text-[15px] text-[#81898F] hover:bg-gray-50 cursor-pointer border-b border-gray-200 font-[15px] leading-[22px]">
            본진 13층
          </div>
          <div className="p-4 text-[15px] text-[#81898F] hover:bg-gray-50 cursor-pointer font-[15px] leading-[22px] font-medium">
            패스트파이브
          </div>
        </div>
      </div>
      <div className="absolute left-4 top-[320px] w-[200px] bg-white rounded-lg shadow-lg">
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
