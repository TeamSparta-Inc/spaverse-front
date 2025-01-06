import { OfficeCanvas } from "../components/Canvas/OfficeCanvas";
import { Gnb } from "../components/Layout/Gnb";
import { Lnb } from "../components/Layout/Lnb";
import { ZoomControls } from "../components/Layout/ZoomContorls";
import { DeskMockData } from "../data/search.mock";

export const SeatingChartPage = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen p-0 m-0">
      <Gnb />
      <Lnb desks={DeskMockData} onDeskSelect={() => {}} />
      <OfficeCanvas />
      <ZoomControls />
    </div>
  );
};
