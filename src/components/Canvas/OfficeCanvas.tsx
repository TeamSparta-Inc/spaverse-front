import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Desk } from "../../types/desk";
import { useZoomStore } from "../../store/useZoomStore";

interface OfficeCanvasProps {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  desks: Desk[]; // 책상 데이터 추가
}

export const OfficeCanvas = ({
  rows = 12,
  columns = 16,
  desks = [],
}: Omit<OfficeCanvasProps, "width" | "height">) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const scale = useZoomStore((state) => state.scale);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { width, height } = canvasRef.current.getBoundingClientRect();

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const canvas = app.view as HTMLCanvasElement;

    canvasRef.current.appendChild(canvas);

    const cellWidth = 30;
    const cellHeight = 30;

    // 그리드 그리기
    const gridGraphics = new PIXI.Graphics();
    gridGraphics.lineStyle(1, 0xdddddd);

    // 수직선
    for (let x = 0; x <= columns; x++) {
      const xPos = x * cellWidth;
      gridGraphics.moveTo(xPos, 0);
      gridGraphics.lineTo(xPos, height);
    }

    // 수평선
    for (let y = 0; y <= rows; y++) {
      const yPos = y * cellHeight;
      gridGraphics.moveTo(0, yPos);
      gridGraphics.lineTo(width, yPos);
    }

    app.stage.addChild(gridGraphics);

    // 책상 그리기
    desks.forEach((desk) => {
      const deskGraphics = new PIXI.Graphics();

      const deskX = (desk.position.x - 3) * cellWidth;
      const deskY = desk.position.y * cellHeight;
      const deskWidth = 3 * cellWidth;
      const deskHeight = 2 * cellHeight;

      // 책상 크기가 너무 작지 않도록 최소 크기 설정
      if (deskWidth >= 15 && deskHeight >= 10) {
        // 최소 크기 조건
        // 책상 그리기
        deskGraphics.beginFill(0xd4eaff, 0.8);
        deskGraphics.lineStyle(Math.max(1, cellWidth / 30), 0x8fc9ff); // 선 두께 동적 조정
        deskGraphics.drawRect(deskX, deskY, deskWidth, deskHeight);
        deskGraphics.endFill();

        // 책상 정보 표시 (좌표 포함)
        const fontSize = Math.max(8, Math.min(12, deskWidth / 8));
        const info = `${desk.occupant || "(공석)"}`;
        const text = new PIXI.Text(info, {
          fontSize,
          fill: 0x141617, // 텍스트 색상 #141617
          fontFamily: "Arial",
          align: "center",
          stroke: 0xffffff, // 외곽선 색상 #FFFFFF
          strokeThickness: 1.36089026927948,
        });

        text.position.set(
          deskX + deskWidth / 2 - text.width / 2,
          deskY + deskHeight / 2 - text.height / 2
        );

        app.stage.addChild(text);
        app.stage.addChild(deskGraphics);
      }
    });

    // scale 적용
    app.stage.scale.set(scale);

    return () => {
      app.destroy(true);
    };
  }, [rows, columns, desks, scale]);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full overflow-auto"
      style={{
        position: "relative",
        cursor: "grab", // 드래그 가능함을 표시
      }}
    />
  );
};

export default OfficeCanvas;
