import { InfoCircleFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Select, Input } from "antd";
import {
  useGetAllTeams,
  useGetTeamUsers,
  usePatchOccupant,
  usePatchTeam,
} from "../../quries/user.query";
import { useParams } from "react-router-dom";

const TeamDropdown = ({ deskId }: { deskId: string }) => {
  const [, setSelectedTeam] = useState<string | null>(null);
  const [selectedTeamKey, setSelectedTeamKey] = useState<string>(
    "64d35eb339e9cbd2505cecfb"
  );
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [isCustomMember, setIsCustomMember] = useState<boolean>(false);
  const [customMemberName, setCustomMemberName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { officeName } = useParams<{ officeName: string }>();
  const { data: teams } = useGetAllTeams();
  const { data: teamUsers } = useGetTeamUsers(selectedTeamKey);
  const { mutate: patchOccupant } = usePatchOccupant(selectedTeamKey);
  const { mutate: patchTeam } = usePatchTeam();
  useEffect(() => {
    if (!selectedTeamKey) return;

    const timer = setTimeout(() => {
      saveChangesToServer();
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedTeamKey, selectedMember, customMemberName]);

  const saveChangesToServer = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      const data: any = {
        team: selectedTeamKey,
      };

      if (selectedMember === "custom" && customMemberName) {
        data.member = {
          id: "custom",
          name: customMemberName,
          isCustom: true,
        };
      } else if (selectedMember && selectedMember !== "custom") {
        const member = teamUsers?.find((m) => m._id === selectedMember);
        if (member) {
          data.member = {
            id: member._id,
            name: member.name,
            isCustom: false,
          };
        }
      }
    } catch (error) {
      console.error("자동 저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTeamSelect = (value: string) => {
    setSelectedTeamKey(value);
    const team = teams.find((t) => t.name === value);
    if (team) {
      setSelectedTeam(team.name);
    }
    setSelectedMember(null);
    setIsCustomMember(false);
    setCustomMemberName("");
    patchTeam({
      officeName: officeName || "",
      deskId: deskId,
      teamId: value,
    });
  };

  const handleMemberSelect = (value: string) => {
    if (value === "custom") {
      setIsCustomMember(true);
      setSelectedMember("custom");
    } else {
      setIsCustomMember(false);
      setSelectedMember(value);
    }
    patchOccupant({
      officeName: officeName || "",
      deskId: deskId,
      memberId: value,
    });
  };

  const handleCustomMemberNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomMemberName(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        showSearch
        placeholder="팀 선택"
        onChange={handleTeamSelect}
        value={selectedTeamKey}
        style={{ width: "100%" }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {teams.map((team) => (
          <Select.Option key={team.name + team.floor} value={team._id}>
            {team.name}
          </Select.Option>
        ))}
      </Select>

      {selectedTeamKey && (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-pretendard font-bold">팀원 지정</div>
          <Select
            showSearch
            placeholder="팀원 검색"
            optionFilterProp="children"
            onChange={handleMemberSelect}
            value={selectedMember}
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            style={{ width: "100%" }}
          >
            {teamUsers?.map((member) => (
              <Select.Option key={member._id} value={member._id}>
                {member.name}
              </Select.Option>
            ))}
            <Select.Option key="custom" value="custom">
              기타
            </Select.Option>
          </Select>

          {isCustomMember && (
            <Input
              placeholder="표시할 이름을 작성해주세요"
              value={customMemberName}
              onChange={handleCustomMemberNameChange}
              style={{ marginTop: "8px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({
  isOpen,
  deskId,
}: {
  isOpen: boolean;
  deskId?: string | null;
}) => {
  const isSeatClick = !!deskId;
  return (
    <div
      className={`fixed top-[30px] right-0 w-[300px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {isSeatClick && deskId ? (
        <div className="flex flex-col h-full p-5 py-10 gap-2">
          <div className="text-xl font-pretendard font-bold tracking-normal">
            이 자리의
            <br /> 팀을 지정해주세요.
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2"></div>
          </div>
          <div className="text-sm font-pretendard font-bold">팀 지정</div>
          <TeamDropdown key={deskId} deskId={deskId} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <InfoCircleFilled className="text-gray-500 text-md" />
            <h4 className="text-sm text-center font-pretendard font-bold tracking-normal">
              <span className="text-red-500">비어있는 책상을 클릭</span>
              해서 <br />
              자리 배정을 시작하세요.
            </h4>
            <div className="text-xs text-center font-pretendard font-normal tracking-normal text-gray-500">
              [팀 지정] &gt; [팀원 지정] 순서이며,
              <br /> 선택된 옵션은 즉시 자동 저장됩니다.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
