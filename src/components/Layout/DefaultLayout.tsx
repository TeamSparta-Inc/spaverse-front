import { Outlet } from "react-router-dom";
import { Gnb } from "./Gnb";
import { Toaster } from "@teamsparta/stack-toast";
import { StackProvider } from "@teamsparta/stack-core";

export const DefaultLayout = () => {
  return (
    <StackProvider theme="sccLight">
      <div className="flex flex-col w-screen min-h-dvh p-0 m-0">
        <Gnb />
        <Toaster />
        <div className="flex flex-1 mt-12 relative">
          <Outlet />
        </div>
      </div>
    </StackProvider>
  );
};
