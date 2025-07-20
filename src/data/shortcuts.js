import { isMacOs } from "react-device-detect";

export const shortcuts = {
  cancel: [{ key: "Escape" }],
  undo: [{ key: "Z", ctrl: true }],
  redo: [{ key: "Z", ctrl: true, shift: true }],
  selectNextPull: [{ key: "ArrowDown" }, { key: "ArrowRight" }, { key: "Tab" }],
  selectPreviousPull: [
    { key: "ArrowUp" },
    { key: "ArrowLeft" },
    { key: "Tab", shift: true },
  ],
  addPullAfterSelected: [{ key: "A" }],
  addPullToEnd: [{ key: "A", shift: true }],
  addPullBeforeSelected: [{ key: "B" }],
  clearSelectedPull: [{ key: "C" }],
  deleteSelectedPull: [{ key: "D" }, { key: "Delete" }],
  drawMode: [{ key: "P" }],
  help: [{ key: "?", allowShift: true }],
};

export function keyText({ key, ctrl, shift }) {
  let text = "";

  if (ctrl) text += isMacOs ? "\u2318" : "Ctrl+";
  if (shift) text += isMacOs ? "\u21E7" : "Shift+";

  if (key === "Delete") text += "Del";
  else if (key === "Enter") text += "\u21B5";
  else if (key === "Escape") text += "Esc";
  else if (key === "ArrowUp") text += "\u2191";
  else if (key === "ArrowDown") text += "\u2193";
  else if (key === "ArrowLeft") text += "\u2190";
  else if (key === "ArrowRight") text += "\u2192";
  else text += key;

  return text;
}
