import * as PIXI from "pixi.js";
import { Desk, Team } from "../types/desk";
import { CANVAS_CONSTANTS } from "../constants/canvas";

export const drawGrid = (
  graphics: PIXI.Graphics,
  width: number,
  height: number,
  rows: number,
  columns: number
) => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;

  graphics.lineStyle(1, COLORS.GRID);

  // 수직선
  for (let x = 0; x <= columns; x++) {
    const xPos = x * CELL_WIDTH;
    graphics.moveTo(xPos, 0);
    graphics.lineTo(xPos, height);
  }

  // 수평선
  for (let y = 0; y <= rows; y++) {
    const yPos = y * CELL_HEIGHT;
    graphics.moveTo(0, yPos);
    graphics.lineTo(width, yPos);
  }
};

export const createDeskGraphics = (
  desk: Desk,
  isSelected: boolean
): PIXI.Container => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;
  const container = new PIXI.Container();

  // 책상 배경 그리기
  const deskGraphics = new PIXI.Graphics();
  const deskX = (desk.position.x - 3) * CELL_WIDTH;
  const deskY = desk.position.y * CELL_HEIGHT;
  const deskWidth = 3 * CELL_WIDTH;
  const deskHeight = 2 * CELL_HEIGHT;

  // 선택된 책상일 경우 다른 색상 적용
  const fillColor = isSelected ? 0xffe082 : COLORS.DESK_FILL;
  const strokeColor = isSelected ? 0xffa000 : COLORS.DESK_STROKE;
  const strokeWidth = isSelected
    ? Math.max(2, CELL_WIDTH / 20)
    : Math.max(1, CELL_WIDTH / 30);

  deskGraphics.beginFill(fillColor, 0.8);
  deskGraphics.lineStyle(strokeWidth, strokeColor);
  deskGraphics.drawRect(deskX, deskY, deskWidth, deskHeight);
  deskGraphics.endFill();

  container.addChild(deskGraphics);

  if (desk.occupant) {
    const badge = new PIXI.Graphics();
    const badgeRadius = 7;
    const colors = TEAM_COLORS[desk.occupant.team];

    badge.beginFill(colors.primary);
    badge.lineStyle(1, colors.secondary);
    badge.drawCircle(
      deskX + badgeRadius + 10,
      deskY + deskHeight / 2,
      badgeRadius
    );
    badge.endFill();

    container.addChild(badge);
  }

  return container;
};

export const createDeskText = (
  desk: Desk,
  deskX: number,
  deskY: number,
  deskWidth: number,
  deskHeight: number
): PIXI.Text => {
  const { MIN_FONT_SIZE, MAX_FONT_SIZE, COLORS } = CANVAS_CONSTANTS;

  const fontSize = Math.max(
    MIN_FONT_SIZE,
    Math.min(MAX_FONT_SIZE, deskWidth / 8)
  );
  const text = new PIXI.Text(desk.occupant?.name || "(공석)", {
    fontSize,
    fill: COLORS.TEXT,
    fontFamily: "Arial",
    align: "center",
    stroke: COLORS.TEXT_STROKE,
    strokeThickness: 1.36089026927948,
  });

  text.position.set(
    deskX + deskWidth / 2 - text.width / 2,
    deskY + deskHeight / 2 - text.height / 2
  );

  return text;
};

export const TEAM_COLORS: Record<Team, { primary: number; secondary: number }> =
  {
    "개발 팀": {
      primary: 0x8fc9ff, // blue-40
      secondary: 0x2998ff, // blue-60
    },
    "디자인 팀": {
      primary: 0xb2a3ff, // purple-40
      secondary: 0x846bff, // purple-60
    },
    "스코클 팀": {
      primary: 0x96eb96, // green-40
      secondary: 0x55d455, // green-60
    },
    "항해 팀": {
      primary: 0xffbe8f, // orange-40
      secondary: 0xff8026, // orange-60
    },
  };
