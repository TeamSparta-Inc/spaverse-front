import * as PIXI from "pixi.js";
import { CANVAS_CONSTANTS } from "../constants/canvas";
import { Desk } from "../types/desk";
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
    const colors = TEAM_COLORS[desk.occupant.team] ?? TEAM_COLORS["-"];

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

  const text = new PIXI.Text(desk.occupant?.name || "-", {
    fontSize: 17,
    fill: desk.occupant?.name ? COLORS.TEXT : COLORS.TEXT_EMPTY,
    fontFamily: "Pretendard",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 26,
    stroke: COLORS.TEXT_STROKE,
    strokeThickness: 2,
    align: "center",
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

export const TEAM_COLORS: Record<string, { primary: string }> = {
  B2B팀: {
    primary: "#1F77B4", // 1. 다크 블루
  },
  재무팀: {
    primary: "#FF7F0E", // 2. 오렌지
  },
  스튜디오팀: {
    primary: "#17BECF", // 3. 청록
  },
  게임팀: {
    primary: "#FFD700", // 4. 골드
  },
  PM팀: {
    primary: "#9467BD", // 5. 퍼플
  },
  "B2C 교육운영팀": {
    primary: "#8C564B", // 6. 올리브
  },
  "브랜드 콘텐츠팀": {
    primary: "#AEC7E8", // 7. 스카이블루
  },
  피플팀: {
    primary: "#FF9896", // 8. 살몬 핑크
  },
  "그로스 마케팅팀": {
    primary: "#8E44AD", // 9. 라임
  },
  "B2G 교육기획팀": {
    primary: "#9EDAe5", // 10. 민트
  },
  "KDT 커리어개발팀": {
    primary: "#2C3E50", // 11. 네이비
  },
  "KDT 교육운영팀": {
    primary: "#E67E22", // 12. 진한 오렌지
  },
  CX팀: {
    primary: "#2980B9", // 13. 코발트 블루
  },
  일본팀: {
    primary: "#D62728", // 14. 마젠타
  },
  "B2C 교육기획팀": {
    primary: "#7F8C8D", // 15. 카키
  },
  외주팀: {
    primary: "#C39BD3", // 16. 연보라
  },
  세일즈팀: {
    primary: "#E74C3C", // 17. 버밀리언
  },
  "콘텐츠 프로듀싱팀": {
    primary: "#5DADE2", // 18. 아쿠아 블루
  },
  개발팀: {
    primary: "#1ABC9C", // 19. 다크 민트
  },
  디자인팀: {
    primary: "#BCBD22", // 20. 다크 퍼플
  },
  "-": {
    primary: "#141617",
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

  text.anchor.set(0.5);
  text.position.set(roomX + roomWidth / 2, roomY + roomHeight / 2);

  container.addChild(roomGraphics);
  container.addChild(text);

  return container;
};
