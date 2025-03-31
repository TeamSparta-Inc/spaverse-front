import { useGetTempOffice } from "../../quries/office.query";
import { OfficeCanvas } from "./OfficeCanvas";

export const OfficeCanvasContainer = ({
  selectedDeskId,
}: {
  selectedDeskId: string | null;
}) => {
  const { data: finalOffice } = useGetTempOffice("FF9");
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
