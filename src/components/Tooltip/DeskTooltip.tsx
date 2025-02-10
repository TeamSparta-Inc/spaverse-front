import { Occupant } from "../../types/desk";

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
  return (
    <div
      className="fixed z-50 bg-white shadow-elevation-1 rounded-lg p-4 min-w-[200px]"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-text-tertiary hover:text-text-primary"
      >
        ✕
      </button>
      <div className="space-y-2">
        <h3 className="font-medium text-text-primary">{occupant.name}</h3>
        <p className="text-sm text-text-secondary">{occupant.email}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-40" />
          <span className="text-sm text-text-secondary">{occupant.team}</span>
        </div>
      </div>
    </div>
  );
};
