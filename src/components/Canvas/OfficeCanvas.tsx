import { useRef, useEffect, useState } from "react";
import { usePixiApp } from "../../hooks/usePixiApp";
import { DeskGraphics } from "./Desk";
import { initialDesks } from "../../store/office";
import { Graphics } from "pixi.js";
import { GRID_SIZE } from "../../utils/grid";
import { Desk } from "../../models/desk";

export const OfficeCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const app = usePixiApp(800, 600);
  const [desks, setDesks] = useState<Desk[]>(initialDesks);
  const gridRef = useRef<Graphics | null>(null);

  // 그리드 그리기 함수
  const createGrid = () => {
    const grid = new Graphics();

    grid.beginFill(0xffffff);
    grid.drawRect(0, 0, 800, 600);
    grid.endFill();

    grid.lineStyle(1, 0xe0e0e0);

    for (let x = 0; x <= 800; x += GRID_SIZE) {
      grid.moveTo(x, 0);
      grid.lineTo(x, 600);

      if (x % (GRID_SIZE * 5) === 0) {
        grid.lineStyle(1, 0xcccccc);
        grid.moveTo(x, 0);
        grid.lineTo(x, 600);
        grid.lineStyle(1, 0xe0e0e0);
      }
    }

    for (let y = 0; y <= 600; y += GRID_SIZE) {
      grid.moveTo(0, y);
      grid.lineTo(800, y);

      if (y % (GRID_SIZE * 5) === 0) {
        grid.lineStyle(1, 0xcccccc);
        grid.moveTo(0, y);
        grid.lineTo(800, y);
        grid.lineStyle(1, 0xe0e0e0);
      }
    }

    return grid;
  };

  // Pixi.js 앱 초기화
  useEffect(() => {
    if (!app) return;

    // 그리드 생성 및 추가
    if (!gridRef.current) {
      gridRef.current = createGrid();
      app.stage.addChild(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        app.stage.removeChild(gridRef.current);
        gridRef.current = null;
      }
    };
  }, [app]);

  // 책상들 관리
  useEffect(() => {
    if (!app) return;

    // 기존 책상들 제거 (그리드는 유지)
    app.stage.children.slice(1).forEach((child) => {
      app.stage.removeChild(child);
    });

    // 책상들 다시 그리기
    desks.forEach((desk) => {
      const deskGraphics = new DeskGraphics(desk);
      app.stage.addChild(deskGraphics);
    });
  }, [app, desks]);

  // DOM에 캔버스 추가
  useEffect(() => {
    if (containerRef.current && app) {
      containerRef.current.appendChild(app.view as HTMLCanvasElement);
    }

    return () => {
      if (containerRef.current && app) {
        containerRef.current.removeChild(app.view as HTMLCanvasElement);
      }
    };
  }, [app]);

  const handleAddDesk = () => {
    const newDesk: Desk = {
      id: `desk${desks.length + 1}`,
      x: GRID_SIZE * 2,
      y: GRID_SIZE * 2,
      width: GRID_SIZE * 2,
      height: GRID_SIZE,
      name: `새 책상 ${desks.length + 1}`,
    };
    setDesks([...desks, newDesk]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="border-2 border-gray-300 rounded-lg shadow-lg"
        style={{ width: "800px", height: "600px" }}
      />
      <button
        onClick={handleAddDesk}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        책상 추가
      </button>
    </div>
  );
};
