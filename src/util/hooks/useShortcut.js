import { useEffect } from "react";
import { isMacOs } from "react-device-detect";

export default function useShortcut(shortcuts, callback, options) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!options?.allowedRepeat && event.repeat) return;

      if (typeof shortcuts === "string") {
        if (event.key.toLowerCase() === shortcuts.toLowerCase()) {
          event.preventDefault();
          callback(event);
        }

        return;
      }

      for (const { key, ctrl, shift, allowShift } of shortcuts) {
        const eventCtrlKey = isMacOs ? event.metaKey : event.ctrlKey;

        if (!!ctrl !== eventCtrlKey) continue;
        if (!!shift !== event.shiftKey && !(allowShift && event.shiftKey))
          continue;

        if (event.key.toLowerCase() == key.toLowerCase()) {
          event.preventDefault();
          callback(event);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, shortcuts, options?.allowedRepeat]);
}
