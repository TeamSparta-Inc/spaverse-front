import { Button } from "antd";

export const ZoomControls = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col">
      <Button>+</Button>
      <Button>-</Button>
    </div>
  );
};
