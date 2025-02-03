import { Room } from "../types/room";

export const sampleRooms: Room[] = [
  {
    id: "room1",
    name: "회의실 1",
    position: { x: 0, y: 0 },
    size: { width: 8, height: 6 },
  },
  {
    id: "room2",
    name: "큰 삼",
    position: { x: 30, y: 0 },
    size: { width: 6, height: 4 },
  },
  {
    id: "room3",
    name: "휴게실",
    position: { x: 0, y: 18 },
    size: { width: 10, height: 8 },
  },
];
