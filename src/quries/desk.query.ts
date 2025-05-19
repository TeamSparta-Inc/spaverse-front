import { useGetFinalOffice } from "./office.query";

// 모든 사무실 층의 데스크 데이터를 가져오는 커스텀 훅
export const useGetAllDesks = () => {
  // 임시로 하드코딩된 오피스 층 데이터를 가져옵니다
  const hq12 = useGetFinalOffice("HQ12");
  const hq13 = useGetFinalOffice("HQ13");
  const ff9 = useGetFinalOffice("FF9");
  const ff10 = useGetFinalOffice("FF10");

  // 모든 층의 데스크를 합친 배열을 리턴합니다
  return {
    data: [
      ...(hq12.data?.desks || []),
      ...(hq13.data?.desks || []),
      ...(ff9.data?.desks || []),
      ...(ff10.data?.desks || []),
    ],
  };
};
