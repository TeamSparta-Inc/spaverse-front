import { Outlet } from "react-router-dom";
import { Gnb } from "./Gnb";

export const DefaultLayout = () => {
  return (
    <div className="flex flex-col w-screen min-h-dvh p-0 m-0">
      <Gnb />
      <div className="flex flex-1 mt-12 relative">
        <Outlet />
      </div>
    </div>
  );
};
