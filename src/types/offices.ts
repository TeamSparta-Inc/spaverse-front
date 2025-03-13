import { Desk } from "./desk";
import { Room } from "./room";

export interface Office {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  desks: Desk[];
  rooms: Room[];
}
