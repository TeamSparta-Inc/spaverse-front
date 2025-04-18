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
    const badgeRadius = 8;

    //TODO: 팀 색깔 정하기
    const colors = TEAM_COLORS[desk.occupant.team] ?? TEAM_COLORS["미지정"];

    badge.beginFill(colors.primary);
    badge.lineStyle(1, 0xffffff);
    badge.drawCircle(
      deskX + deskWidth / 2 - 26,
      deskY + deskHeight / 2 + 1,
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
  const { COLORS } = CANVAS_CONSTANTS;

  const text = new PIXI.Text(desk.occupant?.name || "(공석)", {
    fontSize: 17,
    fill: COLORS.TEXT,
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 26,
    stroke: COLORS.TEXT_STROKE,
    strokeThickness: 2,
  });

  if (desk.occupant) {
    text.position.set(
      deskX + deskWidth / 2 - 14,
      deskY + deskHeight / 2 - text.height / 2
    );
  } else {
    text.position.set(
      deskX + deskWidth / 2 - text.width / 2,
      deskY + deskHeight / 2 - text.height / 2
    );
  }

  return text;
};

export const TEAM_COLORS: Record<Team, { primary: string }> = {
  스코클팀: {
    primary: "#FF8026",
  },
  디자인팀: {
    primary: "#ACF2AC",
  },
  개발팀: {
    primary: "#B70D23",
  },
  내배캠팀: {
    primary: "#FFBAC4",
  },
  마케팅팀: {
    primary: "#008000",
  },
  항해팀: {
    primary: "#82E8DE",
  },
  CX팀: {
    primary: "#FFBE8F",
  },
  대외협력팀: {
    primary: "#26CE75",
  },
  피플팀: {
    primary: "#FFDEA6",
  },
  재무팀: {
    primary: "#1F94DC",
  },
  콘텐츠팀: {
    primary: "#681FDC",
  },
  외주팀: {
    primary: "#BED417",
  },
  게임팀: {
    primary: "#BC50E4",
  },
  커리어개발팀: {
    primary: "#37A28C",
  },
  글로벌팀: {
    primary: "#681FDC",
  },
  직속팀: {
    primary: "#A54E0B",
  },
  B2B팀: {
    primary: "#DC1F87",
  },
  스튜디오팀: {
    primary: "#1D519F",
  },
  미지정: {
    primary: "#9DA7AE",
  },
};

export const createRoomGraphics = (room: Room): PIXI.Container => {
  const { CELL_WIDTH, CELL_HEIGHT, COLORS } = CANVAS_CONSTANTS;
  const container = new PIXI.Container();

  // 방 배경 그리기
  const roomGraphics = new PIXI.Graphics();
  const roomX = (room.position.x - 3) * CELL_WIDTH;
  const roomY = room.position.y * CELL_HEIGHT;
  const roomWidth = room.size.width * CELL_WIDTH;
  const roomHeight = room.size.height * CELL_HEIGHT;

  // 방 배경
  roomGraphics.beginFill(COLORS.ROOM_FILL); // neutral-5 with opacity
  roomGraphics.lineStyle(2, COLORS.ROOM_STROKE); // neutral-30
  roomGraphics.drawRect(roomX, roomY, roomWidth, roomHeight);
  roomGraphics.endFill();

  // 방 이름 텍스트
  const text = new PIXI.Text(room.room_name, {
    fontSize: 16,
    fill: "#81898f",
    fontFamily: "Pretendard",
    align: "center",
    fontWeight: "600",
  });

  text.position.set(roomX + roomWidth / 2 - text.width / 2, roomY + 10);

  container.addChild(roomGraphics);
  container.addChild(text);

  return container;
};
