import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { DefaultLayout } from "../components/Layout/DefaultLayout";
import { SeatingChartPage } from "../pages/SeatingChartPage";
import { isValidOffice } from "../constants/offices";
import { ChangeSeatPage } from "../pages/ChangeSeatPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route
          path="/seating-chart/:officeName"
          element={<SeatingChartPage />}
          loader={({ params }) => {
            if (!params.officeName || !isValidOffice(params.officeName)) {
              throw new Response("", {
                status: 404,
                statusText: "Invalid Office",
              });
            }
            return null;
          }}
          errorElement={<Navigate to="/seating-chart/HQ12" replace />}
        />
        <Route
          path="/change-seats/:officeName"
          element={<ChangeSeatPage />}
          loader={({ params }) => {
            if (!params.officeName || !isValidOffice(params.officeName)) {
              throw new Response("", {
                status: 404,
                statusText: "Invalid Office",
              });
            }
            return null;
          }}
          errorElement={<Navigate to="/change-seats/HQ12" replace />}
        />
        <Route
          path="/change-seats"
          element={<Navigate to="/change-seats/HQ12" replace />}
        />
      </Route>
      <Route path="/" element={<Navigate to="/seating-chart/HQ12" replace />} />
    </>
  )
);
