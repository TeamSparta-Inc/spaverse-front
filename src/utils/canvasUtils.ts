import * as PIXI from "pixi.js";
import { Desk, Team } from "../types/desk";
import { CANVAS_CONSTANTS } from "../constants/canvas";
import { Room } from "../types/room";

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

export const createDeskGraphics = (desk: Desk): PIXI.Container => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;
  const container = new PIXI.Container();

  // 책상 배경 그리기
  const deskGraphics = new PIXI.Graphics();
  const deskX = (desk.position.x - 3) * CELL_WIDTH;
  const deskY = desk.position.y * CELL_HEIGHT;
  const deskWidth = 3 * CELL_WIDTH;
  const deskHeight = 2 * CELL_HEIGHT;

  deskGraphics.beginFill(COLORS.DESK_FILL, 0.8);
  deskGraphics.lineStyle(Math.max(1, CELL_WIDTH / 30), COLORS.DESK_STROKE);
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

export const createRoomGraphics = (room: Room): PIXI.Container => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;
  const container = new PIXI.Container();

  // 방 배경 그리기
  const roomGraphics = new PIXI.Graphics();
  const roomX = room.position.x * CELL_WIDTH;
  const roomY = room.position.y * CELL_HEIGHT;
  const roomWidth = room.size.width * CELL_WIDTH;
  const roomHeight = room.size.height * CELL_HEIGHT;

  // 방 배경
  roomGraphics.beginFill(COLORS.ROOM_FILL || 0xf6f9fa, 0.5); // neutral-5 with opacity
  roomGraphics.lineStyle(2, COLORS.ROOM_STROKE || 0xd7e0e6); // neutral-30
  roomGraphics.drawRect(roomX, roomY, roomWidth, roomHeight);
  roomGraphics.endFill();

  // 방 이름 텍스트
  const text = new PIXI.Text(room.name, {
    fontSize: 14,
    fill: COLORS.TEXT,
    fontFamily: "Arial",
    align: "center",
  });

  text.position.set(roomX + roomWidth / 2 - text.width / 2, roomY + 10);

  container.addChild(roomGraphics);
  container.addChild(text);

  return container;
};
