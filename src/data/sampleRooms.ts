import { Room } from "../types/room";

export const sampleRooms: Room[] = [
  {
    room_unique_id: "room1",
    room_name: "회의실 1",
    position: { x: 0, y: 0 },
    size: { width: 8, height: 6 },
  },
  {
    room_unique_id: "room2",
    room_name: "큰 삼",
    position: { x: 30, y: 0 },
    size: { width: 6, height: 4 },
  },
  {
    room_unique_id: "room3",
    room_name: "휴게실",
    position: { x: 0, y: 18 },
    size: { width: 10, height: 8 },
  },
];
