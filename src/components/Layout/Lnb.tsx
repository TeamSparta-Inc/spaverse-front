import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Desk } from "../../types/desk";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const Lnb = ({ desks, onDeskSelect }: LnbProps) => {
  const [searchText, setSearchText] = useState("");

  const filteredDesks = desks.filter((desk) =>
    desk.occupant?.toLowerCase().includes(searchText.toLowerCase())
  );
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
          placeholder="팀원 이름으로 검색"
        />
        {searchText && (
          <div className="">
            {filteredDesks.map((desk) => (
              <div
                key={desk.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[15px] leading-[22px] font-medium"
                onClick={() => onDeskSelect(desk.id)}
              >
                {desk.occupant}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
