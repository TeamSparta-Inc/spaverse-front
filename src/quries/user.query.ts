import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
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
      enabled: !!teamId,
    }),
};

export const useGetAllTeams = () => useSuspenseQuery(userQuery.allTeams());

export const useGetTeamUsers = (teamId: string) =>
  useSuspenseQuery(userQuery.teamUsers(teamId));

export const usePatchOccupant = () =>
  useMutation({
    mutationFn: ({
      officeName,
      deskId,
      memberId,
    }: {
      officeName: string;
      deskId: string;
      memberId: string;
    }) =>
      Axios("patch", `/temp-offices/${officeName}/desks/${deskId}/occupant`, {
        data: { clear: false, job_title: "", user_id: memberId },
      }),
  });

export const usePatchTeam = () =>
  useMutation({
    mutationFn: ({
      officeName,
      deskId,
      teamId,
    }: {
      officeName: string;
      deskId: string;
      teamId: string;
    }) =>
      Axios("patch", `/temp-offices/${officeName}/desks/${deskId}/team`, {
        data: { team_id: teamId },
      }),
  });

export const useClearOccupant = () =>
  useMutation({
    mutationFn: ({
      officeName,
      deskId,
    }: {
      officeName: string;
      deskId: string;
    }) =>
      Axios("patch", `/temp-offices/${officeName}/desks/${deskId}/occupant`, {
        data: { memberId: null },
      }),
  });
