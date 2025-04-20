import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { CANVAS_CONSTANTS } from "../../constants/canvas";
import { usePixiApp } from "../../hooks/usePixiApp";
import { useZoomStore } from "../../store/useZoomStore";
import { Desk } from "../../types/desk";
import { Room } from "../../types/room";
import {
  createDeskGraphics,
  createDeskText,
  createRoomGraphics,
} from "../../utils/canvasUtils";
import { DeskTooltip } from "../Tooltip/DeskTooltip";

interface OfficeCanvasProps {
  columns: number;
  rows: number;
  desks: Desk[];
  rooms: Room[];
  selectedDeskId: string | null;
  setSelectedDeskId?: (deskId: string) => void;
  isChangeSeatPage: boolean;
  onCanvasReady?: (centerView: () => void) => void;
}

export const OfficeCanvas = ({
  columns,
  rows,
  desks,
  rooms,
  selectedDeskId,
  setSelectedDeskId,
  isChangeSeatPage,
  onCanvasReady,
}: OfficeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipState, setTooltipState] = useState<{
    show: boolean;
    position: { x: number; y: number };
    desk: Desk | null;
  }>({
    show: false,
    position: { x: 0, y: 0 },
    desk: null,
  });

  const { appRef, pixiContainerRef, handleDeskClick, centerView } = usePixiApp(
    containerRef,
    setTooltipState,
    setSelectedDeskId
  );

  const scale = useZoomStore((state) => state.scale);

  const draw = () => {
    if (!appRef.current || !pixiContainerRef.current) return;

    pixiContainerRef.current.removeChildren();

    const { CELL_WIDTH, CELL_HEIGHT, MIN_DESK_WIDTH, MIN_DESK_HEIGHT } =
      CANVAS_CONSTANTS;

    // 배경 그리기 (전체 viewport 크기로 확장)
    const background = new PIXI.Graphics();
    background.beginFill(0xf6f9fa);

    // 캔버스 크기보다 더 넓은 영역으로 배경 확장 (앱 크기 또는 충분히 큰 값으로)
    const viewportWidth = appRef.current.renderer.width;
    const viewportHeight = appRef.current.renderer.height;
    const canvasWidth = columns * CELL_WIDTH;
    const canvasHeight = rows * CELL_HEIGHT;

    // 더 큰 영역으로 배경 그리기 (캔버스 크기와 viewport 크기 중 더 큰 값)
    const backgroundWidth = Math.max(viewportWidth, canvasWidth) * 1.3;
    const backgroundHeight = Math.max(viewportHeight, canvasHeight) * 1.4;

    // 중앙 정렬을 위해 오프셋 계산
    const offsetX = (backgroundWidth - canvasWidth) / 2;
    const offsetY = (backgroundHeight - canvasHeight) / 2;

    background.drawRect(-offsetX, -offsetY, backgroundWidth, backgroundHeight);
    background.endFill();
    pixiContainerRef.current.addChild(background);

    // 방 그리기
    rooms.forEach((room) => {
      const roomGraphics = createRoomGraphics(room);
      pixiContainerRef.current?.addChild(roomGraphics);
    });

    // 책상 그리기
    desks.forEach((desk) => {
      // const isSelected = desk.desk_unique_id === selectedDeskId;
      const deskX = (desk.position.x - 3) * CELL_WIDTH;
      const deskY = desk.position.y * CELL_HEIGHT;
      const deskWidth = 3 * CELL_WIDTH;
      const deskHeight = 2 * CELL_HEIGHT;

      if (deskWidth >= MIN_DESK_WIDTH && deskHeight >= MIN_DESK_HEIGHT) {
        const deskGraphics = createDeskWithEvents(desk);
        const text = createDeskText(desk, deskX, deskY, deskWidth, deskHeight);

        // Add the same click event to the text element
        if (desk.occupant) {
          text.eventMode = "static";
          text.cursor = "pointer";
          text.on("click", (event) => handleDeskClick(event, desk));
        }

        pixiContainerRef.current?.addChild(deskGraphics);
        pixiContainerRef.current?.addChild(text);
      }
    });
  };

  // desk graphics 생성 시 클릭 이벤트 추가
  const createDeskWithEvents = (desk: Desk) => {
    const isSelected = desk.desk_unique_id === selectedDeskId;
    const deskContainer = createDeskGraphics(desk, isSelected);

    if (desk.occupant) {
      deskContainer.eventMode = "static";
      deskContainer.cursor = "pointer";
      deskContainer.on("click", (event) => handleDeskClick(event, desk));
    }

    return deskContainer;
  };

  useEffect(() => {
    if (!pixiContainerRef.current) return;
    pixiContainerRef.current.scale.set(scale);
  }, [scale]);

  useEffect(() => {
    draw();
  }, [desks, rows, columns, selectedDeskId, rooms]);

  useEffect(() => {
    if (onCanvasReady && centerView) {
      onCanvasReady(centerView);
    }
  }, [onCanvasReady, centerView]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {tooltipState.show &&
        tooltipState.desk?.occupant &&
        !isChangeSeatPage && (
          <DeskTooltip
            occupant={tooltipState.desk.occupant}
            position={tooltipState.position}
            onClose={() =>
              setTooltipState((prev) => ({ ...prev, show: false }))
            }
          />
        )}
    </div>
  );
};

export default OfficeCanvas;
