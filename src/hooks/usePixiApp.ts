import { useEffect, useRef, useCallback } from "react";
import * as PIXI from "pixi.js";
import { Desk } from "../types/desk";

interface TooltipState {
  show: boolean;
  position: { x: number; y: number };
  desk: Desk | null;
}

export const usePixiApp = (
  containerRef: React.RefObject<HTMLDivElement>,
  onDeskClick?: (tooltipState: TooltipState) => void,
  setSelectedDeskId?: (deskId: string) => void
) => {
  const appRef = useRef<PIXI.Application | null>(null);
  const pixiContainerRef = useRef<PIXI.Container | null>(null);

  // 드래그 상태를 추적하기 위한 refs
  const isDraggingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // 데스크 클릭 핸들러
  const handleDeskClick = useCallback(
    (event: PIXI.FederatedPointerEvent, desk: Desk) => {
      if (isDraggingRef.current || !onDeskClick) return;

      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;

      // 클릭 위치 계산
      const x = event.clientX;
      const y = event.clientY;

      onDeskClick({
        show: true,
        position: { x, y },
        desk,
      });

      setSelectedDeskId?.(desk.desk_unique_id);
    },
    [onDeskClick]
  );

  // 뷰를 중앙으로 리셋하는 함수 추가
  const centerView = useCallback(() => {
    if (!pixiContainerRef.current || !appRef.current) return;

    // 컨테이너 위치를 초기화하여 중앙으로 이동
    pixiContainerRef.current.position.x = 300;
    pixiContainerRef.current.position.y = 100;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    appRef.current = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xd7e0e6,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const canvas = appRef.current.view as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    containerRef.current.appendChild(canvas);

    pixiContainerRef.current = new PIXI.Container();
    appRef.current.stage.addChild(pixiContainerRef.current);

    // 드래그 이벤트 핸들러 설정
    const handleDragStart = (event: PIXI.FederatedPointerEvent) => {
      isDraggingRef.current = true;
      lastPositionRef.current = { x: event.clientX, y: event.clientY };
      //@ts-ignore
      appRef.current.stage.cursor = "grabbing";
    };

    const handleDragMove = (event: PIXI.FederatedPointerEvent) => {
      if (!isDraggingRef.current || !pixiContainerRef.current) return;

      const dx = event.clientX - lastPositionRef.current.x;
      const dy = event.clientY - lastPositionRef.current.y;

      pixiContainerRef.current.position.x += dx;
      pixiContainerRef.current.position.y += dy;

      lastPositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleDragEnd = () => {
      isDraggingRef.current = false;
      //@ts-ignore
      appRef.current.stage.cursor = "grab";
    };

    // 터치패드 휠 이벤트 처리 함수
    const handleWheel = (event: WheelEvent) => {
      if (!pixiContainerRef.current) return;

      // 기본 스크롤 동작 방지
      event.preventDefault();

      // deltaX와 deltaY를 사용하여 캔버스 이동
      pixiContainerRef.current.position.x -= event.deltaX;
      pixiContainerRef.current.position.y -= event.deltaY;
    };

    // 이벤트 리스너 등록
    appRef.current.stage.eventMode = "static";
    appRef.current.stage
      .on("pointerdown", handleDragStart)
      .on("pointermove", handleDragMove)
      .on("pointerup", handleDragEnd)
      .on("pointerupoutside", handleDragEnd);

    // 터치 이벤트도 지원
    appRef.current.stage
      .on("touchstart", handleDragStart)
      .on("touchmove", handleDragMove)
      .on("touchend", handleDragEnd)
      .on("touchendoutside", handleDragEnd);

    // 휠 이벤트 리스너 추가
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      // 이벤트 리스너 제거
      if (appRef.current) {
        const canvas = appRef.current.view as HTMLCanvasElement;
        canvas.removeEventListener("wheel", handleWheel);

        appRef.current.stage
          .off("pointerdown", handleDragStart)
          .off("pointermove", handleDragMove)
          .off("pointerup", handleDragEnd)
          .off("pointerupoutside", handleDragEnd)
          .off("touchstart", handleDragStart)
          .off("touchmove", handleDragMove)
          .off("touchend", handleDragEnd)
          .off("touchendoutside", handleDragEnd);

        appRef.current.destroy(true);
      }
    };
  }, []);

  return {
    appRef,
    pixiContainerRef,
    handleDeskClick,
    centerView,
  };
};
