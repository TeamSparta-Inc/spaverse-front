import * as PIXI from "pixi.js";
import { Desk } from "../types/desk";
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

export const createDeskGraphics = (desk: Desk): PIXI.Graphics => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;
  const deskGraphics = new PIXI.Graphics();

  const deskX = (desk.position.x - 3) * CELL_WIDTH;
  const deskY = desk.position.y * CELL_HEIGHT;
  const deskWidth = 3 * CELL_WIDTH;
  const deskHeight = 2 * CELL_HEIGHT;

  deskGraphics.beginFill(COLORS.DESK_FILL, 0.8);
  deskGraphics.lineStyle(Math.max(1, CELL_WIDTH / 30), COLORS.DESK_STROKE);
  deskGraphics.drawRect(deskX, deskY, deskWidth, deskHeight);
  deskGraphics.endFill();

  return deskGraphics;
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
