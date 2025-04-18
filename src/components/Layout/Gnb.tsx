import { toast } from "@teamsparta/stack-toast";
import { Input, Modal } from "antd";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { OfficeName } from "../../constants/offices";
import { usePublishOffice } from "../../quries/office.query";

export const Gnb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isChangeSeatsPage = location.pathname.includes("/change-seats");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [, setIsPasswordCorrect] = useState(false);
  const { officeName } = useParams<{ officeName: OfficeName }>();
  const { mutate: publishOffice } = usePublishOffice();

  // 올바른 비밀번호 설정 (실제로는 환경변수나 서버에서 관리하는 것이 좋습니다)
  const correctPassword = "sparta99"; // 예시 비밀번호

  const showModal = () => {
    setIsModalVisible(true);
    setInputValue(""); // 모달 열 때 입력값 초기화
    setIsPasswordCorrect(false); // 비밀번호 검증 상태 초기화
  };

  const handleOk = () => {
    // 비밀번호 검증
    if (inputValue === correctPassword) {
      setIsPasswordCorrect(true);
      setIsModalVisible(false);

      // 비밀번호가 맞으면 원하는 동작 수행
      if (officeName) {
        publishOffice(
          { officeName },
          {
            onSuccess: () => {
              toast.success("성공적으로 저장되었습니다");
              navigate(`/change-seats/${officeName}`);
            },
          }
        );
      }
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
      // 비밀번호가 틀려도 모달은 닫지 않음
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <nav className="sticky top-0 w-full h-12 bg-white border-b border-gray-200 flex items-center px-6 z-10">
        <div className="flex items-center justify-between w-full mx-auto">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/seating-chart/HQ12")}
          >
            <img src="/logo.svg" alt="층간소통 로고" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            {isChangeSeatsPage ? (
              <button
                className="flex p-2 justify-center items-center gap-2.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-[15px] leading-[22px] font-bold"
                onClick={() => {
                  showModal();
                }}
              >
                최종 저장하기
              </button>
            ) : (
              <button
                className="flex p-2 justify-center items-center gap-2.5 rounded-md bg-slate-100 text-gray-600 hover:text-gray-900 text-[15px] leading-[22px] font-bold"
                onClick={() => {
                  navigate("/change-seats");
                }}
              >
                자리 바꾸기
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 모달 추가 */}
      <Modal
        title="비밀번호 입력"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
      >
        <p className="mb-2">관리자 비밀번호를 입력해주세요:</p>
        <Input.Password
          placeholder="비밀번호를 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleOk}
          autoFocus
        />
      </Modal>
    </>
  );
};
