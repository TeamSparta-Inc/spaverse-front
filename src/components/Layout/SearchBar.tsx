import { Input } from "antd";
import { Desk } from "../../types/desk";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  searchText: string;
  placeholder?: string;
  filteredDesks: Desk[];
  onDeskSelect: (deskId: string) => void;
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
              key={desk.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[15px] leading-[22px] font-medium"
              onClick={() => onDeskSelect(desk.id)}
            >
              {desk.occupant?.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
