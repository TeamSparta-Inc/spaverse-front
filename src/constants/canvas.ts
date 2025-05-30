export const CANVAS_CONSTANTS = {
  CELL_WIDTH: 32,
  CELL_HEIGHT: 32,
  MIN_DESK_WIDTH: 15,
  MIN_DESK_HEIGHT: 10,

  COLORS: {
    GRID: 0xdddddd,
    DESK_FILL: 0xd4eaff,
    DESK_STROKE: 0x8fc9ff,
    TEXT: "#141617",
    TEXT_EMPTY: "#9DA7AE",
    TEXT_STROKE: "#ffffff",
    ROOM_FILL: 0xe4ebf0, // neutral-5
    ROOM_STROKE: 0xd7e0e6, // neutral-30
    BACKGROUND: 0xffffff,
    OUTSIDE_BACKGROUND: 0x000000,
  },
} as const;
