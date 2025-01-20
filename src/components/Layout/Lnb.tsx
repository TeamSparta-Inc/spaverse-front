import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Desk } from "../../types/desk";
import { CheckOutlined } from "@ant-design/icons";

interface LnbProps {
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const Lnb = ({ desks, onDeskSelect }: LnbProps) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");

  const filteredDesks = desks.filter((desk) =>
    desk.occupant?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const floors = [
    "본진 12층",
    "본진 13층",
    "패스트파이브 9층",
    "패스트파이브 10층",
  ];

  return (
    <div className="z-10 fixed top-[80px] left-0 right-0">
      <button className="absolute left-4 w-[200px] flex justify-center items-center px-4 py-3 gap-1.5 rounded-md bg-slate-700 text-white shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08),0px_0px_4px_0px_rgba(0,0,0,0.12)] text-[15px] leading-[22px] font-bold">
        자리 바꾸기
      </button>

      <div className="absolute left-4 top-[60px] w-[200px] bg-white rounded-lg shadow-lg">
        <div className="flex flex-col">
          {floors.map((floor) => (
            <div
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`p-4 text-[15px] hover:bg-gray-50 cursor-pointer ${
                floor !== floors[floors.length - 1]
                  ? "border-b border-gray-200"
                  : ""
              } font-[15px] leading-[22px] flex justify-between items-center ${
                selectedFloor === floor ? "text-red-500" : "text-[#81898F]"
              }`}
            >
              {floor}
              {selectedFloor === floor && (
                <CheckOutlined style={{ color: "#FF0000", fontSize: "16px" }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-4 top-[300px] w-[200px] bg-white rounded-lg shadow-lg">
        <SearchBar
          value={searchText}
          onChange={(value) => setSearchText(value)}
          placeholder="팀원 이름으로 검색"
          searchText={searchText}
          onDeskSelect={onDeskSelect}
          desks={filteredDesks}
        />
      </div>
    </div>
  );
};
