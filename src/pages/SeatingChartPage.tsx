import { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { OfficeName } from "../constants/offices";
import { useZoomStore } from "../store/useZoomStore";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const SeatingChartPage = () => {
  const setScale = useZoomStore((state) => state.setScale);
  const scale = useZoomStore((state) => state.scale);
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const centerViewRef = useRef<(() => void) | null>(null);
  const transformComponentRef = useRef(null);

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

  // 페이지 로드 시 항상 줌 상태 초기화
  useEffect(() => {
    setScale(1);
  }, [setScale]);

  useEffect(() => {
    const checkTimeAndRefresh = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 8 && hours <= 22) {
        window.location.reload();
      }
    };

    const intervalId = setInterval(checkTimeAndRefresh, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lnb onDeskSelect={handleDeskSelect} />
      <TransformWrapper
        initialScale={scale}
        minScale={0.25}
        maxScale={2.0}
        onZoom={({ state }) => {
          setScale(state.scale);
        }}
        limitToBounds={false}
        centerOnInit={true}
        ref={transformComponentRef}
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <OfficeCanvasContainer
            selectedDeskId={selectedDeskId}
            setSelectedDeskId={setSelectedDeskId}
            isChangeSeatPage={false}
          />
        </TransformComponent>
      </TransformWrapper>
      <ZoomControls />
    </Suspense>
  );
};
