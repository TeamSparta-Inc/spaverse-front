import { OfficeName } from "../constants/offices";

// 책상 정보
export interface Desk {
  id: string; // 책상 고유 ID
  position: {
    x: number; // 우측 위 꼭짓점 X 좌표 (그리드 기준)
    y: number; // 우측 위 꼭짓점 Y 좌표 (그리드 기준)
  };
  occupant?: Occupant; // 책상 사용자 이름 (선택)
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
  office: OfficeName;
  image?: string;
}

export type Team = "개발 팀" | "디자인 팀" | "스코클 팀" | "항해 팀";
