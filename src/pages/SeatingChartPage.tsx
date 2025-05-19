import { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { OfficeName } from "../constants/offices";
import { useZoomStore } from "../store/useZoomStore";
export const SeatingChartPage = () => {
  const setScale = useZoomStore((state) => state.setScale);
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const centerViewRef = useRef<(() => void) | null>(null);

  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
  };

  const { officeName } = useParams() as {
    officeName: OfficeName;
  };

  // Set up an effect to center the view when officeName changes
  useEffect(() => {
    if (centerViewRef.current) {
      centerViewRef.current();
      setScale(1); // Reset zoom level to default
    }
  }, [officeName, setScale]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lnb onDeskSelect={handleDeskSelect} />
      <OfficeCanvasContainer
        selectedDeskId={selectedDeskId}
        setSelectedDeskId={setSelectedDeskId}
        isChangeSeatPage={false}
      />
      <ZoomControls />
    </Suspense>
  );
};
