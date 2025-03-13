import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import Axios from "../axios/instance";

export const userKeys = {
  all: ["user"] as const,
  allTeams: () => [...userKeys.all, "teams"] as const,
  teamUsers: (teamId: string) => [...userKeys.allTeams(), teamId] as const,
};

export const userQuery = {
  allTeams: () =>
    queryOptions({
      queryKey: userKeys.allTeams(),
      queryFn: () => Axios("get", `/teams`),
    }),
  teamUsers: (teamId: string) =>
    queryOptions({
      queryKey: userKeys.teamUsers(teamId),
      queryFn: () => Axios("get", `/teams/${teamId}/users`),
    }),
};

export const useGetAllTeams = () => useSuspenseQuery(userQuery.allTeams());

export const useGetTeamUsers = (teamId: string) =>
  useSuspenseQuery(userQuery.teamUsers(teamId));
