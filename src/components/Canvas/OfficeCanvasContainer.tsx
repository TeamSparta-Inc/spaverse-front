import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGetTempOffice, useGetFinalOffice } from "../../quries/office.query";
import { OfficeCanvas } from "./OfficeCanvas";
import { OfficeName } from "../../constants/offices";
import { Desk } from "../../types/desk";

interface OfficeCanvasContainerProps {
  selectedDeskId: string | null;
  isChangeSeatPage?: boolean;
  setSelectedDeskId?: (deskId: string) => void;
}

export const OfficeCanvasContainer = ({
  selectedDeskId,
  isChangeSeatPage = false,
  setSelectedDeskId,
}: OfficeCanvasContainerProps) => {
  const { officeName } = useParams() as { officeName: OfficeName };
  const centerViewRef = useRef<(() => void) | null>(null);
  const centerOnDeskRef = useRef<((desk: Desk) => void) | null>(null);

  // isChangeSeatPage에 따라 다른 API 사용
  const { data: officeData } = isChangeSeatPage
    ? useGetTempOffice(officeName)
    : useGetFinalOffice(officeName);

  const desks = officeData?.desks || [];
  const rooms = officeData?.rooms || [];

  // officeName이 바뀔 때 중앙으로 이동
  useEffect(() => {
    if (centerViewRef.current) {
      centerViewRef.current();
    }
  }, [officeName]);

  // 선택된 좌석 ID가 변경될 때 해당 좌석으로 화면 이동
  useEffect(() => {
    if (selectedDeskId && centerOnDeskRef.current) {
      const selectedDesk = desks.find(
        (desk) => desk.desk_unique_id === selectedDeskId
      );
      if (selectedDesk) {
        centerOnDeskRef.current(selectedDesk);
      }
    }
  }, [selectedDeskId, desks]);

  // centerView 함수를 저장하는 콜백
  const handleCanvasReady = (
    centerView: () => void,
    centerOnDesk: (desk: Desk) => void
  ) => {
    centerViewRef.current = centerView;
    centerOnDeskRef.current = centerOnDesk;
  };

  return (
    <div className="flex-1 relative">
      <OfficeCanvas
        columns={37}
        rows={73}
        desks={desks}
        rooms={rooms}
        selectedDeskId={selectedDeskId}
        setSelectedDeskId={setSelectedDeskId}
        isChangeSeatPage={isChangeSeatPage}
        onCanvasReady={handleCanvasReady}
      />
    </div>
  );
};
