import { create } from "zustand";

interface ZoomState {
  scale: number;
  setScale: (scale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useZoomStore = create<ZoomState>((set) => ({
  scale: 1,
  setScale: (scale) => set({ scale: Math.min(Math.max(0.25, scale), 2) }), // 0.25 ~ 2.0 사이로 제한
  zoomIn: () => set((state) => ({ scale: Math.min(state.scale + 0.25, 2) })),
  zoomOut: () =>
    set((state) => ({ scale: Math.max(state.scale - 0.25, 0.25) })),
}));
