export const Gnb = () => {
  return (
    <nav className="sticky top-0 w-full h-12 bg-white border-b border-gray-200 flex items-center px-4 z-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="층간소통 로고" className="h-8 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex w-[104px] px-3 py-2 justify-center items-center gap-2.5 rounded-md bg-slate-100 text-gray-600 hover:text-gray-900 text-[15px] leading-[22px] font-bold">
            자리 바꾸기
          </button>
        </div>
      </div>
    </nav>
  );
};
