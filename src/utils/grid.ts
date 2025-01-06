import { GridPosition } from "../models/desk";

export const GRID_SIZE = 40; // 그리드 한 칸의 크기

export const pixelToGrid = (x: number, y: number): GridPosition => {
  return {
    row: Math.floor(y / GRID_SIZE),
    col: Math.floor(x / GRID_SIZE),
  };
};

export const gridToPixel = (position: GridPosition) => {
  return {
    x: position.col * GRID_SIZE,
    y: position.row * GRID_SIZE,
  };
};

export const snapToGrid = (x: number, y: number) => {
  const gridPos = pixelToGrid(x, y);
  return gridToPixel(gridPos);
};
