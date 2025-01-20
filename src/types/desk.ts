// 책상 정보
export interface Desk {
  id: string; // 책상 고유 ID
  position: {
    x: number; // 우측 위 꼭짓점 X 좌표 (그리드 기준)
    y: number; // 우측 위 꼭짓점 Y 좌표 (그리드 기준)
  };
  occupant?: User; // 책상 사용자 이름 (선택)
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface User {
  name: string;
  email: string;
  slack_id: string;
  photoUrl: string;
  team_id: string;
  onVacation: boolean;
  leader: boolean;
  noLeader: boolean;
}
