import { isMobile } from "react-device-detect";
import { keyText, shortcuts } from "../../../data/shortcuts";

const Shortcuts = [
  {
    shortcuts: shortcuts.undo,
    description: "Undo",
  },
  {
    shortcuts: shortcuts.redo,
    description: "Redo",
  },
  {
    shortcuts: shortcuts.selectNextPull,
    description: "Select next pull",
  },
  {
    shortcuts: shortcuts.selectPreviousPull,
    description: "Select previous pull",
  },
  {
    shortcuts: shortcuts.addPullAfterSelected,
    description: "Add pull after selected",
  },
  {
    shortcuts: shortcuts.addPullToEnd,
    description: "Add pull to end",
  },
  {
    shortcuts: shortcuts.addPullBeforeSelected,
    description: "Add pull before selected",
  },
  {
    shortcuts: shortcuts.clearSelectedPull,
    description: "Clear selected pull",
  },
  {
    shortcuts: shortcuts.deleteSelectedPull,
    description: "Delete selected pull",
  },
  {
    shortcuts: shortcuts.drawMode,
    description: "Toggle drawing mode",
  },
  {
    shortcuts: shortcuts.help,
    description: "Show help menu",
  },
];

export default function ShortcutsList() {
  if (isMobile) return;

  return Shortcuts.flatMap(({ shortcuts, description }, index) => (
    <div key={index} className="flex justify-between">
      <p className="text-white">{description}</p>
      <div className="flex gap-1">
        {shortcuts.map((shortcut, i) => (
          <p key={i} className="border border-gold rounded-md px-1 bg-primary">
            {typeof shortcut === "string" ? shortcut : keyText(shortcut)}
          </p>
        ))}
      </div>
    </div>
  ));
}
