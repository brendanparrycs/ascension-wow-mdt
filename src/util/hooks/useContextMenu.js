import { useCallback, useEffect } from "react";
import makeUseExclusiveState from "./exlusiveState";

const useExclusiveState = makeUseExclusiveState();

export default function useContextMenu({ minWidth, minHeight }) {
  const [position, setPosition] = useExclusiveState();

  const onClose = useCallback(() => {
    setPosition(null);
  }, [setPosition]);

  const onRightClick = useCallback(
    (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const newPos = {
        top:
          e.pageY + minHeight < windowHeight
            ? e.pageY
            : windowHeight - minHeight,
        left:
          e.pageX + minWidth < windowWidth ? e.pageX : windowWidth - minWidth,
      };

      setPosition((pos) => {
        if (!pos) return newPos;
        const x = newPos.left - pos.left;
        const y = newPos.top - pos.top;
        return Math.hypot(x, y) < 20 ? null : newPos;
      });
    },
    [minWidth, minHeight, setPosition]
  );

  useEffect(() => {
    document.addEventListener("click", onClose);
    return () => {
      document.removeEventListener("click", onClose);
    };
  }, [onClose]);

  return { contextMenuPosition: position, onRightClick, onClose };
}
