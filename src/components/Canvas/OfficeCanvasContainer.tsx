import { useParams } from "react-router-dom";
import { useGetTempOffice, useGetFinalOffice } from "../../quries/office.query";
import { OfficeCanvas } from "./OfficeCanvas";
import { OfficeName } from "../../constants/offices";

interface OfficeCanvasContainerProps {
  selectedDeskId: string | null;
  isChangeSeatPage?: boolean;
  setSelectedDeskId?: (deskId: string) => void;
}

export const OfficeCanvasContainer = ({
  selectedDeskId,
  isChangeSeatPage = false,
  setSelectedDeskId,
}: OfficeCanvasContainerProps) => {
  const { officeName } = useParams() as { officeName: OfficeName };

  // isChangeSeatPage에 따라 다른 API 사용
  const { data: officeData } = isChangeSeatPage
    ? useGetTempOffice(officeName)
    : useGetFinalOffice(officeName);

  const desks = officeData?.desks || [];
  const rooms = officeData?.rooms || [];

  return (
    <div className="flex-1 relative">
      <OfficeCanvas
        columns={37}
        rows={73}
        desks={desks}
        rooms={rooms}
        selectedDeskId={selectedDeskId}
        setSelectedDeskId={setSelectedDeskId}
        isChangeSeatPage={isChangeSeatPage}
      />
    </div>
  );
};
