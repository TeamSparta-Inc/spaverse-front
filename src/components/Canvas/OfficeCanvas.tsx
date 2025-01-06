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
  const appRef = useRef<PIXI.Application | null>(null);
  const containerRef = useRef<PIXI.Container | null>(null);

  const scale = useZoomStore((state) => state.scale);

  // 초기 렌더링 시 한 번만 실행되는 설정
  useEffect(() => {
    if (!canvasRef.current) return;

    const { width, height } = canvasRef.current.getBoundingClientRect();

    appRef.current = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const canvas = appRef.current.view as HTMLCanvasElement;
    canvasRef.current.appendChild(canvas);

    // 컨테이너 생성
    containerRef.current = new PIXI.Container();
    appRef.current.stage.addChild(containerRef.current);

    // 그리드와 책상 그리기
    drawGridAndDesks();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
      }
    };
  }, []);

  // 그리드와 책상을 그리는 함수
  const drawGridAndDesks = () => {
    if (!appRef.current || !containerRef.current) return;

    containerRef.current.removeChildren();

    const { width, height } = appRef.current.screen;
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

    containerRef.current.addChild(gridGraphics);

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

        containerRef.current?.addChild(deskGraphics);
        containerRef.current?.addChild(text);
      }
    });
  };

  // scale이나 데이터가 변경될 때 실행
  useEffect(() => {
    if (!containerRef.current) return;

    // 컨테이너의 scale만 업데이트
    containerRef.current.scale.set(scale);
  }, [scale]);

  // desks, rows, columns가 변경될 때 다시 그리기
  useEffect(() => {
    drawGridAndDesks();
  }, [desks, rows, columns]);

  return <div ref={canvasRef} className="w-full h-full overflow-auto" />;
};

export default OfficeCanvas;
