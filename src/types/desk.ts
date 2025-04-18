import { TEAM_COLORS } from "../utils/canvasUtils";

// 책상 정보
export interface Desk {
  desk_unique_id: string; // 책상 고유 ID
  position: Position;
  occupant?: Occupant; // 책상 사용자 이름 (선택)
}

export interface Position {
  x: number; // 우측 위 꼭짓점 X 좌표 (그리드 기준)
  y: number; // 우측 위 꼭짓점 Y 좌표 (그리드 기준)
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface Occupant {
  id: string;
  name: string;
  email: string;
  team: Team;
  slackImageUrl?: string;
}

export type Team = keyof typeof TEAM_COLORS;
