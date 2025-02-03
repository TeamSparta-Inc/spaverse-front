import { useEffect, useRef } from "react";
import { CANVAS_CONSTANTS } from "../../constants/canvas";
import { sampleRooms } from "../../data/sampleRooms";
import { usePixiApp } from "../../hooks/usePixiApp";
import { useZoomStore } from "../../store/useZoomStore";
import { Desk } from "../../types/desk";
import {
  createDeskGraphics,
  createDeskText,
  createRoomGraphics,
} from "../../utils/canvasUtils";

interface OfficeCanvasProps {
  rows?: number;
  columns?: number;
  desks: Desk[];
}

export const OfficeCanvas = ({
  rows = 12,
  columns = 16,
  desks = [],
}: OfficeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { pixiContainerRef } = usePixiApp(canvasRef);
  const scale = useZoomStore((state) => state.scale);

  const draw = () => {
    if (!pixiContainerRef.current) return;
    pixiContainerRef.current.removeChildren();

    const { CELL_WIDTH, CELL_HEIGHT, MIN_DESK_WIDTH, MIN_DESK_HEIGHT } =
      CANVAS_CONSTANTS;

    // 방 그리기
    sampleRooms.forEach((room) => {
      const roomGraphics = createRoomGraphics(room);
      pixiContainerRef.current?.addChild(roomGraphics);
    });

    // 책상 그리기
    desks.forEach((desk) => {
      const deskX = (desk.position.x - 3) * CELL_WIDTH;
      const deskY = desk.position.y * CELL_HEIGHT;
      const deskWidth = 3 * CELL_WIDTH;
      const deskHeight = 2 * CELL_HEIGHT;

      if (deskWidth >= MIN_DESK_WIDTH && deskHeight >= MIN_DESK_HEIGHT) {
        const deskGraphics = createDeskGraphics(desk);
        const text = createDeskText(desk, deskX, deskY, deskWidth, deskHeight);

        pixiContainerRef.current?.addChild(deskGraphics);
        pixiContainerRef.current?.addChild(text);
      }
    });
  };

  useEffect(() => {
    if (!pixiContainerRef.current) return;
    pixiContainerRef.current.scale.set(scale);
  }, [scale]);

  useEffect(() => {
    draw();
  }, [desks, rows, columns]);

  return <div ref={canvasRef} className="p-10 w-full h-full overflow-auto" />;
};

export default OfficeCanvas;
