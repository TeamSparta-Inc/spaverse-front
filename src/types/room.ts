export interface Room {
  id: string;
  name: string;
  position: {
    x: number; // 좌측 위 꼭짓점 X 좌표 (그리드 기준)
    y: number; // 좌측 위 꼭짓점 Y 좌표 (그리드 기준)
  };
  size: {
    width: number; // 그리드 단위 가로 길이
    height: number; // 그리드 단위 세로 길이
  };
}
