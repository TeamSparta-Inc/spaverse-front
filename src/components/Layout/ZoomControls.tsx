import { Button } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { useZoomStore } from "../../store/useZoomStore";

export const ZoomControls = () => {
  const { scale, zoomIn, zoomOut } = useZoomStore();

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-2">
      <Button
        icon={<ZoomInOutlined />}
        onClick={zoomIn}
        disabled={scale >= 2}
      />
      <Button
        icon={<ZoomOutOutlined />}
        onClick={zoomOut}
        disabled={scale <= 0.25}
      />
      <div className="text-center text-sm text-gray-600">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
};
