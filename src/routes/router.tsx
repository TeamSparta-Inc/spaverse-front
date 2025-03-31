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
import { Suspense } from "react";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route
          path="/seating-chart/:officeName"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SeatingChartPage />
            </Suspense>
          }
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
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChangeSeatPage />
            </Suspense>
          }
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
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Navigate to="/change-seats/HQ12" replace />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Navigate to="/seating-chart/HQ12" replace />
          </Suspense>
        }
      />
    </>
  )
);
