import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Desk } from "../../types/desk";

interface OfficeCanvasProps {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  desks: Desk[]; // 책상 데이터 추가
}

export const OfficeCanvas = ({
  width = 800,
  height = 600,
  rows = 12,
  columns = 16,
  desks = [],
}: OfficeCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log("Canvas ref exists");

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const canvas = app.view as HTMLCanvasElement;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    canvasRef.current.appendChild(canvas);

    const cellWidth = width / columns;
    const cellHeight = height / rows;

    // 그리드 그리기
    const gridGraphics = new PIXI.Graphics();

    // 그리드 라인
    gridGraphics.lineStyle(1, 0xdddddd);

    // 수직선과 열 번호
    for (let x = 0; x <= columns; x++) {
      const xPos = x * cellWidth;
      gridGraphics.moveTo(xPos, 0);
      gridGraphics.lineTo(xPos, height);

      // 열 번호 (간격 동적 조정)
      const columnLabelInterval = Math.max(1, Math.floor(columns / 20)); // 전체 열을 최대 20개 구간으로
      if (x % columnLabelInterval === 0) {
        const text = new PIXI.Text(x.toString(), {
          fontSize: Math.max(8, Math.min(10, cellWidth / 3)), // 셀 크기에 따라 폰트 크기 조정
          fill: 0x999999,
        });
        text.position.set(xPos + 2, 2);
        app.stage.addChild(text);
      }
    }

    // 수평선과 행 번호
    for (let y = 0; y <= rows; y++) {
      const yPos = y * cellHeight;
      gridGraphics.moveTo(0, yPos);
      gridGraphics.lineTo(width, yPos);

      // 행 번호 (간격 동적 조정)
      const rowLabelInterval = Math.max(1, Math.floor(rows / 20)); // 전체 행을 최대 20개 구간으로
      if (y % rowLabelInterval === 0) {
        const text = new PIXI.Text(y.toString(), {
          fontSize: Math.max(8, Math.min(10, cellHeight / 3)), // 셀 크기에 따라 폰트 크기 조정
          fill: 0x999999,
        });
        text.position.set(2, yPos + 2);
        app.stage.addChild(text);
      }
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
        deskGraphics.beginFill(0x4a90e2, 0.8);
        deskGraphics.lineStyle(Math.max(1, cellWidth / 30), 0x2171c7); // 선 두께 동적 조정
        deskGraphics.drawRect(deskX, deskY, deskWidth, deskHeight);
        deskGraphics.endFill();

        // 책상 정보 표시 (좌표 포함)
        const fontSize = Math.max(8, Math.min(12, deskWidth / 8)); // 폰트 크기 동적 조정
        const info = `${desk.occupant || "Empty"}\n(${desk.position.x - 3},${
          desk.position.y
        })`;
        const text = new PIXI.Text(info, {
          fontSize,
          fill: 0x333333,
          fontFamily: "Arial",
          align: "center",
        });

        text.position.set(
          deskX + deskWidth / 2 - text.width / 2,
          deskY + deskHeight / 2 - text.height / 2
        );

        app.stage.addChild(text);
        app.stage.addChild(deskGraphics);
      }
    });

    // 캔버스 크기 정보 표시
    const fontSize = Math.max(8, Math.min(12, width / 100)); // 폰트 크기 동적 조정
    const sizeInfo = new PIXI.Text(
      `Grid: ${columns}x${rows}\nSize: ${width}x${height}`,
      {
        fontSize,
        fill: 0x666666,
        fontFamily: "Arial",
      }
    );
    sizeInfo.position.set(
      width - sizeInfo.width - 10,
      height - sizeInfo.height - 10
    );
    app.stage.addChild(sizeInfo);

    return () => {
      app.destroy(true);
    };
  }, [width, height, rows, columns, desks]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid #ccc",
        position: "relative",
        overflow: "hidden",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
};

export default OfficeCanvas;
