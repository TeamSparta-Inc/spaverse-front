import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
};
