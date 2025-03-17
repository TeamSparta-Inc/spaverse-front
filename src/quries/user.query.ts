import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import Axios from "../axios/instance";
import { Team, User } from "../types/user";

export const userKeys = {
  all: ["user"] as const,
  allTeams: () => [...userKeys.all, "teams"] as const,
  teamUsers: (teamId: string) => [...userKeys.allTeams(), teamId] as const,
};

export const userQuery = {
  allTeams: () =>
    queryOptions<Team[]>({
      queryKey: userKeys.allTeams(),
      queryFn: () => Axios("get", `/teams`),
    }),
  teamUsers: (teamId: string) =>
    queryOptions<User[]>({
      queryKey: userKeys.teamUsers(teamId),
      queryFn: () => Axios("get", `/teams/${teamId}/users`),
    }),
};

export const useGetAllTeams = () => useSuspenseQuery(userQuery.allTeams());

export const useGetTeamUsers = (teamId: string) =>
  useSuspenseQuery(userQuery.teamUsers(teamId));
