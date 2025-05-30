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

  // 핀치 줌 이벤트 처리
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2) return;
      e.preventDefault();

      const scale = useZoomStore.getState().scale;
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      // 터치 포인트 간 거리 계산
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );

      // 이전 거리와 비교해 줌 계산
      if (e.target && (e.target as any)._lastDist) {
        const change = dist / (e.target as any)._lastDist;
        const newScale = Math.min(Math.max(0.25, scale * change), 2);
        setScale(newScale);
      }

      // 현재 거리 저장
      if (e.target) {
        (e.target as any)._lastDist = dist;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.target) {
        (e.target as any)._lastDist = null;
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setScale]);

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
