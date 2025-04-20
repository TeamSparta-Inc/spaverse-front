import { Suspense, useState } from "react";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";

import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Layout/Sidebar";
import { OfficeName } from "../constants/offices";
import { useGetTempOffice } from "../quries/office.query";

export const ChangeSeatPage = () => {
  const { officeName } = useParams() as {
    officeName: OfficeName;
  };
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);

  const { data: finalOffice } = useGetTempOffice(officeName);
  const desks = finalOffice?.desks || [];

  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
  };

  return (
    <>
      <Suspense>
        <Lnb desks={desks} onDeskSelect={handleDeskSelect} />
      </Suspense>
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
