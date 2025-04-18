import { useEffect, useRef } from "react";
import { Occupant } from "../../types/desk";
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

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white shadow-elevation-1 rounded-lg p-4 min-w-[200px]"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="flex gap-4">
        <div className="w-[54px] h-[54px] bg-gray-100 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-blue-40 text-white rounded">
            {occupant.name.charAt(0)}
          </div>
          {/* TODO: 슬랙 이미지 추가 시 사용 */}
          {/* {occupant.slackImageUrl ? (
            <img
              src={occupant.slackImageUrl}
              alt={occupant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            
          )} */}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Text as="p" font="subTitle2" color={vars.text.primary}>
              {occupant.name}
            </Text>
            <Tag size="md" color="primary">
              {occupant.team}
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
