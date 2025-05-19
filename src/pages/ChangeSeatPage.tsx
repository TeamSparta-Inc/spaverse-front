import { Suspense, useState } from "react";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";

import { Sidebar } from "../components/Layout/Sidebar";

export const ChangeSeatPage = () => {
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);

  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
  };

  return (
    <>
      <Suspense>
        <Lnb onDeskSelect={handleDeskSelect} />
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
