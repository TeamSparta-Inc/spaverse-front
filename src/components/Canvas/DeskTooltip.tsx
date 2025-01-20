import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Desk } from "../../types/desk";

interface DeskTooltipProps {
  desk: Desk;
  position: { x: number; y: number };
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeskTooltip = ({
  desk,
  position,
  isOpen,
  onOpenChange,
}: DeskTooltipProps) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="fixed" style={{ left: position.x, top: position.y }}>
          <span className="w-1 h-1" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-2">
          <div className="space-y-1">
            <h4 className="font-semibold">책상 정보</h4>
            <p className="text-sm text-muted-foreground">
              사용자: {desk.occupant?.name || "(공석)"}
            </p>
            <p className="text-sm text-muted-foreground">
              위치: ({desk.position.x}, {desk.position.y})
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
