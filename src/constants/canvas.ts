export const CANVAS_CONSTANTS = {
  CELL_WIDTH: 30,
  CELL_HEIGHT: 30,
  MIN_DESK_WIDTH: 15,
  MIN_DESK_HEIGHT: 10,
  MIN_FONT_SIZE: 8,
  MAX_FONT_SIZE: 12,
  COLORS: {
    GRID: 0xdddddd,
    DESK_FILL: 0xd4eaff,
    DESK_STROKE: 0x8fc9ff,
    TEXT: 0x141617,
    TEXT_STROKE: 0xffffff,
    ROOM_FILL: 0xf6f9fa, // neutral-5
    ROOM_STROKE: 0xd7e0e6, // neutral-30
    BACKGROUND: 0xffffff,
  },
} as const;
