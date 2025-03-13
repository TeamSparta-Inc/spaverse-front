import { useNavigate, useLocation } from "react-router-dom";

export const Gnb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChangeSeatsPage = location.pathname.includes("/change-seats");

  return (
    <nav className="sticky top-0 w-full h-12 bg-white border-b border-gray-200 flex items-center px-6 z-10">
      <div className="flex items-center justify-between w-full mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/seating-chart/HQ12")}
        >
          <img src="/logo.svg" alt="층간소통 로고" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          {isChangeSeatsPage ? (
            <button
              className="flex w-[104px] px-2 py-2 justify-center items-center gap-2.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-[15px] leading-[22px] font-bold"
              onClick={() => {}}
            >
              최종 저장하기
            </button>
          ) : (
            <button
              className="flex w-[104px] px-3 py-2 justify-center items-center gap-2.5 rounded-md bg-slate-100 text-gray-600 hover:text-gray-900 text-[15px] leading-[22px] font-bold"
              onClick={() => navigate("/change-seats")}
            >
              자리 바꾸기
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
