import { Input } from "antd";
import { Desk } from "../../types/desk";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchText: string;
  desks: Desk[];
  onDeskSelect: (deskId: string) => void;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  searchText,
  desks,
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
          {desks.map((desk) => (
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
