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
          {filteredDesks.map((desk) => (
            <div
              key={desk.desk_unique_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[15px] leading-[22px] font-medium"
              onClick={(event) => onDeskSelect(desk, event)}
            >
              {desk.occupant?.name}{" "}
              <span className="text-[#81898F]">| {desk.occupant?.team}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
