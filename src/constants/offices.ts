export const VALID_OFFICES = ["HQ12", "HQ13", "FF9", "FF10"] as const;
export type OfficeName = (typeof VALID_OFFICES)[number];

export const isValidOffice = (office: string): office is OfficeName => {
  return VALID_OFFICES.includes(office as OfficeName);
};
