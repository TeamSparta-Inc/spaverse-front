export const VALID_OFFICES = ["HQ12", "HQ13", "FF9", "FF10"] as const;
export type OfficeName = (typeof VALID_OFFICES)[number];

export const isValidOffice = (office: string): office is OfficeName => {
  return VALID_OFFICES.includes(office as OfficeName);
};

export const OFFICE_NAMES: { id: OfficeName; label: string }[] = [
  { id: "HQ12", label: "본진 12층" },
  { id: "HQ13", label: "본진 13층" },
  { id: "FF9", label: "패스트파이브 9층" },
  { id: "FF10", label: "패스트파이브 10층" },
];
