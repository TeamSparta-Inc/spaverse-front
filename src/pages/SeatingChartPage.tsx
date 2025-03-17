import { useState } from "react";
import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { sampleDesks } from "../data/sampleDesks";
import { useZoomStore } from "../store/useZoomStore";
import { useGetFinalOffice } from "../quries/office.query";

export const SeatingChartPage = () => {
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const setScale = useZoomStore((state) => state.setScale);

  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
    setScale(1.5); // 선택된 책상 확대
  };

  const { data: finalOffice } = useGetFinalOffice("HQ13");

  console.log(finalOffice);

  return (
    <>
      <Lnb desks={sampleDesks} onDeskSelect={handleDeskSelect} />
      <div className="flex-1 relative">
        <OfficeCanvas
          columns={37}
          rows={73}
          desks={sampleDesks}
          selectedDeskId={selectedDeskId}
        />
      </div>
      <ZoomControls />
    </>
  );
};
