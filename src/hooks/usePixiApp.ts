import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export const usePixiApp = (containerRef: React.RefObject<HTMLDivElement>) => {
  const appRef = useRef<PIXI.Application | null>(null);
  const pixiContainerRef = useRef<PIXI.Container | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    appRef.current = new PIXI.Application({
      width,
      height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    const canvas = appRef.current.view as HTMLCanvasElement;
    containerRef.current.appendChild(canvas);

    pixiContainerRef.current = new PIXI.Container();
    appRef.current.stage.addChild(pixiContainerRef.current);

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
      }
    };
  }, []);

  return { appRef, pixiContainerRef };
};
