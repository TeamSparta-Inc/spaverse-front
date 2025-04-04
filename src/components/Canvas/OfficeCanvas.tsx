import { useEffect, useRef, useState } from "react";
import { CANVAS_CONSTANTS } from "../../constants/canvas";
import { usePixiApp } from "../../hooks/usePixiApp";
import { useZoomStore } from "../../store/useZoomStore";
import { Desk } from "../../types/desk";
import {
  createDeskGraphics,
  createDeskText,
  createRoomGraphics,
} from "../../utils/canvasUtils";
import { DeskTooltip } from "../Tooltip/DeskTooltip";
import * as PIXI from "pixi.js";
import { Room } from "../../types/room";
import { sampleRooms } from "../../data/sampleRooms";

interface OfficeCanvasProps {
  rows?: number;
  columns?: number;
  desks: Desk[];
  rooms: Room[];
  selectedDeskId?: string | null;
  setSelectedDeskId?: (deskId: string) => void;
}

export const OfficeCanvas = ({
  rows = 12,
  columns = 16,
  desks = [],
  rooms = [],
  selectedDeskId,
  setSelectedDeskId,
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

  const { appRef, pixiContainerRef, handleDeskClick } = usePixiApp(
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

    // 배경 그리기
    const background = new PIXI.Graphics();
    background.beginFill(CANVAS_CONSTANTS.COLORS.BACKGROUND);
    background.drawRect(0, 0, columns * CELL_WIDTH, rows * CELL_HEIGHT);
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

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {tooltipState.show && tooltipState.desk?.occupant && (
        <DeskTooltip
          occupant={tooltipState.desk.occupant}
          position={tooltipState.position}
          onClose={() => setTooltipState((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
};

export default OfficeCanvas;
