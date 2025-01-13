import { createBrowserRouter } from "react-router-dom";
import { SeatingChartPage } from "../pages/SeatingChartPage";
import { AdminPage } from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/seating-chart",
    element: <SeatingChartPage />,
  },
  {
    path: "/",
    element: (
      <div className="flex flex-col items-center justify-center h-dvh gap-2">
        <a href="/seating-chart">좌석 배치도로 가기</a>
        <a href="/admin">관리자 페이지로 가기</a>
      </div>
    ),
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
