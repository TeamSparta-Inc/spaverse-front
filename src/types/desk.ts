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

export type Team =
  | "개발팀"
  | "디자인팀"
  | "스코클팀"
  | "항해팀"
  | "게임팀"
  | "B2B팀"
  | "내배캠팀"
  | "CX팀"
  | "커리어개발팀"
  | "직속팀"
  | "마케팅팀"
  | "피플팀"
  | "외주팀"
  | "재무팀"
  | "글로벌팀"
  | "대외협력팀"
  | "콘텐츠팀"
  | "스튜디오팀"
  | "미지정";
