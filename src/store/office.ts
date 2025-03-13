import { Desk } from "../types/desk";

export const initialDesks: Desk[] = [
  {
    desk_unique_id: "desk1",
    position: {
      x: 0,
      y: 0,
    },
    occupant: {
      id: "1",
      name: "김철수",
      email: "kim@example.com",
      team: "개발 팀",
      office: "HQ12",
    },
  },
  {
    desk_unique_id: "desk2",
    position: {
      x: 0,
      y: 0,
    },
    occupant: {
      id: "2",
      name: "이영희",
      email: "lee@example.com",
      team: "디자인 팀",
      office: "HQ12",
    },
  },
  {
    desk_unique_id: "desk3",
    position: {
      x: 0,
      y: 0,
    },
    occupant: {
      id: "3",
      name: "박지성",
      email: "park@example.com",
      team: "스코클 팀",
      office: "HQ12",
    },
  },
];
