import OfficeCanvas from "../components/Canvas/OfficeCanvas";
import { sampleDesks } from "../data/sampleDesks";

export const SeatingChartPage = () => {
  return (
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
  );
};
