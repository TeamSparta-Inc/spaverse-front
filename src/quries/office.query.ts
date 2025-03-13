import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { OfficeName } from "../constants/offices";
import Axios from "../axios/instance";
import { Office } from "../types/offices";

export const officeKeys = {
  all: ["office"] as const,
  tempOffice: (officeName: OfficeName) =>
    [...officeKeys.all, "tempOffice", officeName] as const,
  finalOffice: (officeName: OfficeName) =>
    [...officeKeys.all, "finalOffice", officeName] as const,
};

export const officeQuery = {
  finalOffice: (officeName: OfficeName) =>
    queryOptions<Office>({
      queryKey: officeKeys.finalOffice(officeName),
      // queryFn: () => Axios("get", `/final-offices/HQ13/${officeName}`),
      queryFn: () => Axios("get", `/final-offices/HQ13`),
      retry: 1,
    }),
  tempOffice: (officeName: OfficeName) =>
    queryOptions({
      queryKey: officeKeys.tempOffice(officeName),
      queryFn: () => Axios("get", `/temp-offices/${officeName}`),
      retry: 1,
    }),
};

export const useGetFinalOffice = (officeName: OfficeName) =>
  useSuspenseQuery(officeQuery.finalOffice(officeName));

export const useGetTempOffice = (officeName: OfficeName) =>
  useSuspenseQuery(officeQuery.tempOffice(officeName));
