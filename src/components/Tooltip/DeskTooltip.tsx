import { Occupant } from "../../types/desk";
import { useEffect, useRef } from "react";
import { OFFICE_NAMES } from "../../constants/offices";
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
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="w-[52px] h-[52px] rounded-full bg-gray-100 overflow-hidden">
          {occupant.image ? (
            <img 
              src={occupant.image} 
              alt={occupant.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-40 text-white">
              {occupant.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-text-primary">{occupant.name}</h3>
            <span className="text-sm text-text-secondary ml-2">{occupant.team}</span>
          </div>
          <div className="text-sm text-text-secondary mt-1">
            <span>{OFFICE_NAMES.find((office) => office.id === occupant.office)?.label}</span>
            <span className="mx-2">|</span>
            <span>{occupant.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
