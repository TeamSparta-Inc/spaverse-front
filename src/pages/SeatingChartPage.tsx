import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { OfficeName } from "../constants/offices";
import { useGetFinalOffice } from "../quries/office.query";
import { useZoomStore } from "../store/useZoomStore";
export const SeatingChartPage = () => {
  const setScale = useZoomStore((state) => state.setScale);

  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
    setScale(1.5); // 선택된 책상 확대
  };

  const { officeName } = useParams() as {
    officeName: OfficeName;
  };

  const { data: finalOffice } = useGetFinalOffice(officeName);
  const desks = finalOffice?.desks || [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lnb desks={desks} onDeskSelect={handleDeskSelect} />
      <OfficeCanvasContainer selectedDeskId={selectedDeskId} />
      <ZoomControls />
    </Suspense>
  );
};
