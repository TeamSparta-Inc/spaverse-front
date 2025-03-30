import { Suspense, useState } from "react";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { sampleDesks } from "../data/sampleDesks";
import { useZoomStore } from "../store/useZoomStore";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";

export const SeatingChartPage = () => {
  const setScale = useZoomStore((state) => state.setScale);

  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
    setScale(1.5); // 선택된 책상 확대
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lnb desks={sampleDesks} onDeskSelect={handleDeskSelect} />
      <OfficeCanvasContainer selectedDeskId={selectedDeskId} />
      <ZoomControls />
    </Suspense>
  );
};
