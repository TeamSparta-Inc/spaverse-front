export interface Team {
  _id: string;
  floor: number;
  name: string;
}

export interface User {
  _id: string;
  email: string;
  leader: boolean;
  name: string;
  noLeader: boolean;
  onVacation: boolean;
  photoUrl: string;
  slack_id: string;
  team_id: string;
}
