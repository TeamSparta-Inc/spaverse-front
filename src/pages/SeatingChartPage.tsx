import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Gnb } from "../components/Layout/Gnb";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomControls";
import { sampleDesks } from "../data/sampleDesks";

export const SeatingChartPage = () => {
  return (
    <div className="flex flex-col w-screen min-h-dvh p-0 m-0">
      <Gnb />
      <div className="flex flex-1 relative">
        <Lnb desks={sampleDesks} onDeskSelect={() => {}} />
        <div className="flex-1 relative">
          <OfficeCanvas columns={37} rows={73} desks={sampleDesks} />
        </div>
        <ZoomControls />
      </div>
    </div>
  );
};
