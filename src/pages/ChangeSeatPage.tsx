import { useState } from "react";
import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { sampleDesks } from "../data/sampleDesks";
import { useZoomStore } from "../store/useZoomStore";
import { Sidebar } from "../components/Layout/Sidebar";
import { useGetTempOffice } from "../quries/office.query";

export const ChangeSeatPage = () => {
  const [selectedDeskId, setSelectedDeskId] = useState<string | null>(null);
  const setScale = useZoomStore((state) => state.setScale);

  const { data: finalOffice } = useGetTempOffice("FF9");
  const desks = finalOffice?.desks || [];
  const rooms = finalOffice?.rooms || [];
  const handleDeskSelect = (deskId: string) => {
    setSelectedDeskId(deskId);
    setScale(1.5); // 선택된 책상 확대
  };

  return (
    <>
      <Lnb desks={sampleDesks} onDeskSelect={handleDeskSelect} />
      <div className="flex-1 relative">
        <OfficeCanvas
          columns={37}
          rows={73}
          desks={desks}
          rooms={rooms}
          selectedDeskId={selectedDeskId}
          setSelectedDeskId={setSelectedDeskId}
        />
      </div>
      <Sidebar isOpen={true} deskId={selectedDeskId} />
      <ZoomControls />
    </>
  );
};
