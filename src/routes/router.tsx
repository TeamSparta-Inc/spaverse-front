import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
} from "react-router-dom";
import { DefaultLayout } from "../components/Layout/DefaultLayout";
import { AdminPage } from "../pages/AdminPage";
import { SeatingChartPage } from "../pages/SeatingChartPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/seating-chart" element={<SeatingChartPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route
        path="/"
        element={
          <div className="flex flex-col items-center justify-center h-dvh gap-2">
            <Link to="/seating-chart">좌석 배치도로 가기</Link>
            <Link to="/admin">관리자 페이지로 가기</Link>
          </div>
        }
      />
    </>
  )
);
