import { Suspense, useState } from "react";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";

import { useZoomStore } from "../store/useZoomStore";
import { Sidebar } from "../components/Layout/Sidebar";
import { useGetTempOffice } from "../quries/office.query";
import { useParams } from "react-router-dom";
import { OfficeName } from "../constants/offices";

export const ChangeSeatPage = () => {
  const { officeName } = useParams() as {
    officeName: OfficeName;
  };
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const setScale = useZoomStore((state) => state.setScale);

  const { data: finalOffice } = useGetTempOffice(officeName);
  const desks = finalOffice?.desks || [];
  const rooms = finalOffice?.rooms || [];
  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
    setScale(1.5); // 선택된 책상 확대
  };

  return (
    <>
      <Lnb desks={desks} onDeskSelect={handleDeskSelect} />
      <OfficeCanvasContainer
        selectedDeskId={selectedDeskId}
        setSelectedDeskId={setSelectedDeskId}
        isChangeSeatPage={true}
      />
      <Suspense>
        <Sidebar isOpen={true} deskId={selectedDeskId} />
      </Suspense>
      <ZoomControls />
    </>
  );
};
