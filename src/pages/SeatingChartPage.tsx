import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Gnb } from "../components/Layout/Gnb";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomContorls";
import { sampleDesks } from "../data/sampleDesks";
import { DeskMockData } from "../data/search.mock";

export const SeatingChartPage = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen p-0 m-0">
      <Gnb />
      <Lnb desks={DeskMockData} onDeskSelect={() => {}} />
      <OfficeCanvas
        // width={1258}
        // height={2482}
        // columns={37}
        // rows={73}
        width={500}
        height={900}
        columns={37}
        rows={73}
        desks={sampleDesks}
      />
      <ZoomControls />
    </div>
  );
};
