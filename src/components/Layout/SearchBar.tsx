import { Input } from "antd";
import { Desk } from "../../types/desk";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  searchText: string;
  placeholder?: string;
  filteredDesks: Desk[];
  onDeskSelect: (desk: Desk, event: React.MouseEvent) => void;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  searchText,
  filteredDesks,
  onDeskSelect,
}: SearchBarProps) => {
  // 데스크의 층 정보를 가져오는 함수
  const getOfficeName = (desk: Desk): string => {
    const office = (desk.occupant as any)?.office;
    // 층 이름을 사용자 친화적으로 변환
    switch (office) {
      case "HQ12":
        return "본진 12층";
      case "HQ13":
        return "본진 13층";
      case "FF9":
        return "패스트파이브 9층";
      case "FF10":
        return "패스트파이브 10층";
      default:
        return office || "";
    }
  };

  return (
    <>
      <Input.Search
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {searchText && (
        <div className="">
          {filteredDesks
            .slice()
            .sort((a, b) =>
              (a.occupant?.name || "").localeCompare(
                b.occupant?.name || "",
                "ko"
              )
            )
            .map((desk) => (
              <div
                key={desk.desk_unique_id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[15px] leading-[22px] font-medium"
                onClick={(event) => onDeskSelect(desk, event)}
              >
                {desk.occupant?.name}{" "}
                <span className="text-[#81898F]">
                  | {desk.occupant?.team}
                  {getOfficeName(desk) && ` | ${getOfficeName(desk)}`}
                </span>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
