import { Desk } from "../types/desk";
import { sampleUsers } from "./sampleUsers";

export const sampleDesks: Desk[] = [
  {
    id: "desk1",
    position: { x: 3, y: 2 },
    occupant: sampleUsers[0],
  },
  {
    id: "desk2",
    position: { x: 6, y: 2 },
    occupant: sampleUsers[1],
  },
  {
    id: "desk3",
    position: { x: 3, y: 5 },
    occupant: sampleUsers[2],
  },
  {
    id: "desk4",
    position: { x: 6, y: 5 },
    occupant: sampleUsers[3],
  },
];
