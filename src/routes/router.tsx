import { createBrowserRouter } from "react-router-dom";
import { SeatingChartPage } from "../pages/SeatingChartPage";

export const router = createBrowserRouter([
  {
    path: "/seating-chart",
    element: <SeatingChartPage />,
  },
  {
    path: "/",
    element: <a href="/seating-chart">좌석 배치도로 가기</a>,
  },
]);
