import { Application } from "pixi.js";
import { useEffect, useRef } from "react";

export const usePixiApp = (width: number, height: number) => {
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (!appRef.current) {
      appRef.current = new Application({
        width,
        height,
        backgroundColor: 0xffffff,
        antialias: true,
      });
    }

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [width, height]);

  return appRef.current;
};
