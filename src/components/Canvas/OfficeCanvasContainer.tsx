import { useParams } from "react-router-dom";
import { useGetTempOffice } from "../../quries/office.query";
import { OfficeCanvas } from "./OfficeCanvas";
import { OfficeName } from "../../constants/offices";

export const OfficeCanvasContainer = ({
  selectedDeskId,
}: {
  selectedDeskId: string | null;
}) => {
  const { officeName } = useParams() as { officeName: OfficeName };
  const { data: finalOffice } = useGetTempOffice(officeName);
  const desks = finalOffice?.desks || [];
  const rooms = finalOffice?.rooms || [];

  return (
    <div className="flex-1 relative">
      <OfficeCanvas
        columns={37}
        rows={73}
        desks={desks}
        rooms={rooms}
        selectedDeskId={selectedDeskId}
      />
    </div>
  );
};
