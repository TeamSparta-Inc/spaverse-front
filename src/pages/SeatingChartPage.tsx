import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { sampleDesks } from "../data/sampleDesks";

export const SeatingChartPage = () => {
  return (
    <>
      <Lnb desks={sampleDesks} onDeskSelect={() => {}} />
      <div className="flex-1 relative">
        <OfficeCanvas columns={37} rows={73} desks={sampleDesks} />
      </div>
      <ZoomControls />
    </>
  );
};
