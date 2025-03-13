import { InfoCircleFilled } from "@ant-design/icons";

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`fixed top-[30px] right-0 w-[300px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full p-4 ">
        <div className="flex flex-col items-center justify-center gap-2">
          <InfoCircleFilled className="text-gray-500 text-md" />
          <h4 className="text-sm text-center font-pretendard font-bold tracking-normal">
            <span className="text-red-500">비어있는 책상을 클릭</span>
            해서 <br />
            자리 배정을 시작하세요.
          </h4>
          <div className="text-xs text-center font-pretendard font-normal tracking-normal text-gray-500">
            [팀 지정] &gt; [팀원 지정] 순서이며,
            <br /> 선택된 옵션은 즉시 자동 저장됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};
