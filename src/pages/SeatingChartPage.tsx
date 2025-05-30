import { Suspense, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { OfficeCanvasContainer } from "../components/Canvas/OfficeCanvasContainer";
import { Lnb } from "../components/Layout/Lnb";
import { OfficeName } from "../constants/offices";
import { useZoomStore } from "../store/useZoomStore";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const SeatingChartPage = () => {
  const setScale = useZoomStore((state) => state.setScale);
  const scale = useZoomStore((state) => state.scale);
  const zoomIn = useZoomStore((state) => state.zoomIn);
  const zoomOut = useZoomStore((state) => state.zoomOut);
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

      // 라이브러리의 줌 초기화
      if (transformComponentRef.current) {
        // @ts-ignore - 타입스크립트 에러 무시
        transformComponentRef.current.resetTransform();
      }
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
        ref={transformComponentRef}
        initialScale={scale}
        minScale={0.25}
        maxScale={2}
        onZoom={({ state }) => {
          // 라이브러리 줌 상태와 store 동기화
          setScale(state.scale);
        }}
        wheel={{ step: 0.25 }}
        doubleClick={{ disabled: true }}
      >
        {({
          zoomIn: wrapperZoomIn,
          zoomOut: wrapperZoomOut,
          resetTransform,
        }) => (
          <>
            <TransformComponent wrapperClass="flex-1 relative">
              <OfficeCanvasContainer
                selectedDeskId={selectedDeskId}
                setSelectedDeskId={setSelectedDeskId}
                isChangeSeatPage={false}
              />
            </TransformComponent>

            {/* 기존 ZoomControls 대신 라이브러리 기능 사용 */}
            <div className="fixed flex flex-col gap-2 bottom-6 left-6">
              <button
                className="ant-btn ant-btn-default"
                onClick={() => {
                  wrapperZoomIn();
                  zoomIn();
                }}
                disabled={scale >= 2}
              >
                <span
                  role="img"
                  aria-label="zoom-in"
                  className="anticon anticon-zoom-in"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="zoom-in"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                  </svg>
                </span>
              </button>
              <button
                className="ant-btn ant-btn-default"
                onClick={() => {
                  wrapperZoomOut();
                  zoomOut();
                }}
                disabled={scale <= 0.25}
              >
                <span
                  role="img"
                  aria-label="zoom-out"
                  className="anticon anticon-zoom-out"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="zoom-out"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path>
                  </svg>
                </span>
              </button>
              <div className="text-sm text-center text-gray-600">
                {Math.round(scale * 100)}%
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
    </Suspense>
  );
};
