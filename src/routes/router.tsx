import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { DefaultLayout } from "../components/Layout/DefaultLayout";
import { isValidOffice } from "../constants/offices";
import { ChangeSeatPage } from "../pages/ChangeSeatPage";
import { SeatingChartPage } from "../pages/SeatingChartPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route
          path="/"
          element={<Navigate to="/seating-chart/HQ12" replace />}
        />
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
        />
      </Route>
    </>
  )
);
