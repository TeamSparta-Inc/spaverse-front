import { useGetTempOffice } from "../../quries/office.query";
import { OfficeCanvas } from "./OfficeCanvas";

export const OfficeCanvasContainer = ({
  selectedDeskId,
}: {
  selectedDeskId: string | null;
}) => {
  const { data: finalOffice } = useGetTempOffice("FF9");
  const desks = finalOffice?.desks || [];

  console.log(JSON.stringify(desks, null, 2));

  return (
    <div className="flex-1 relative">
      <OfficeCanvas
        columns={37}
        rows={73}
        desks={desks}
        selectedDeskId={selectedDeskId}
      />
    </div>
  );
};
