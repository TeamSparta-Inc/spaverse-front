import { Button } from "@teamsparta/stack-button";
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
              navigate(`/seating-chart/${officeName}`);
              toast.success("성공적으로 저장되었습니다");
            },
          }
        );
      }
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeSeatClick = () => {
    // window.confirm으로 기본 얼럿 표시
    const isConfirmed = window.confirm(
      `자리 편집 권한이 있는 팀원이신가요?\n승인 받지 않고 변경할 경우 세인님의 분노를 살 수 있습니다.`
    );

    // 확인 버튼을 눌렀을 때만 이동
    if (isConfirmed && officeName) {
      navigate(`/change-seats/${officeName}`);
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full h-[60px] bg-white border-b border-gray-200 flex items-center px-6 z-10">
        <div className="flex items-center justify-between w-full mx-auto">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/seating-chart/HQ12")}
          >
            <img src="/logo.svg" alt="층간소통 로고" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            {isChangeSeatsPage ? (
              <>
                <Button
                  variant="outline"
                  colorScheme="secondary"
                  size="sm"
                  onClick={() => {
                    navigate(`/seating-chart/${officeName}`);
                  }}
                >
                  나가기
                </Button>
                <Button
                  variant="solid"
                  colorScheme="primary"
                  size="sm"
                  onClick={() => {
                    showModal();
                  }}
                >
                  최종 저장하기
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="secondary"
                  onClick={() =>
                    window.open("https://forms.gle/6mWTwDQC412joN7f9", "_blank")
                  }
                >
                  의견 남기기
                </Button>
                <Button
                  variant="solid"
                  colorScheme="tertiary"
                  size="sm"
                  onClick={handleChangeSeatClick}
                >
                  자리 바꾸기
                </Button>
              </>
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
