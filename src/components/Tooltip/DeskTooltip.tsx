import { useEffect, useRef } from "react";
import { Occupant, Team } from "../../types/desk";
import { vars } from "@teamsparta/stack-tokens";
import { Text } from "@teamsparta/stack-text";
import { Tag } from "@teamsparta/stack-tag";

interface DeskTooltipProps {
  occupant: Occupant;
  position: { x: number; y: number };
  onClose: () => void;
}

export const DeskTooltip = ({
  occupant,
  position,
  onClose,
}: DeskTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // 검색 결과를 통해 클릭된 경우에 대한 위치 조정
  const tooltipStyle = {
    left: position.x,
    top: position.y - 10,
    transform: "translate(-50%, -100%)",
  };

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white shadow-elevation-1 rounded-lg p-4 min-w-[200px] after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white"
      style={tooltipStyle}
    >
      <div className="flex gap-4">
        <div className="w-[54px] h-[54px] bg-gray-100 overflow-hidden">
          {/* <div className="w-full h-full flex items-center justify-center bg-blue-40 text-white rounded">
            {occupant.name.charAt(0)}
          </div> */}

          {occupant.slackImageUrl ? (
            <img
              src={`https://static.spartacodingclub.kr/samsam/user/${occupant.slackImageUrl}`}
              alt={occupant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
              <Text as="p" font="captionM" color={vars.text.tertiary}>
                {occupant.name.charAt(0)}
              </Text>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Text as="p" font="subTitle2" color={vars.text.primary}>
              {occupant.name}
            </Text>
            <Tag size="md" color="primary">
              {occupant.team === ("Unknown Team" as Team)
                ? "비어있음"
                : occupant.team}
            </Tag>
          </div>
          <div className="text-sm text-text-secondary mt-1">
            <Text as="p" font="captionM" color={vars.text.tertiary}>
              {occupant.email}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
