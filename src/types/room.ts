import { Position } from "./desk";

export interface Room {
  position: Position;
  room_unique_id: string;
  room_name: string;
  size: {
    height: number; // 그리드 단위 세로 길이
    width: number; // 그리드 단위 가로 길이
  };
}
