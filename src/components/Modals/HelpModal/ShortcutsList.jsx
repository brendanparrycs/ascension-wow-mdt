import { isMacOs, isMobile } from "react-device-detect";
import { keyText, shortcuts } from "../../../data/shortcuts";

const Shortcuts = [
  {
    shortcuts: [`${isMacOs ? "Cmd" : "Ctrl"} + Click`],
    description: "Select individual mobs",
  },
  {
    shortcuts: ["Shift + Click"],
    description: "Start a new pull before selecting mobs",
  },
  {
    shortcuts: ["Shift + Drag"],
    description: "Select multiple mobs at once",
  },
  {
    shortcuts: ["Hold Shift"],
    description: "Show total forces instead of percentages",
  },
  {
    shortcuts: ["Hold Ctrl"],
    description: "Display each mob's force count",
  },
  {
    shortcuts: ["Hold Alt"],
    description: "Highlight each mob's group",
  },
  {
    shortcuts: shortcuts.undo,
    description: "Undo",
  },
  {
    shortcuts: shortcuts.redo,
    description: "Redo",
  },
  {
    shortcuts: shortcuts.importRoute,
    description: "Import route",
  },
  {
    shortcuts: shortcuts.exportRoute,
    description: "Export route",
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
  if (isMobile) return null;

  return (
    <>
      {Shortcuts.flatMap(({ shortcuts, description }, index) => (
        <div key={index} className="flex justify-between">
          <p className="text-white">{description}</p>
          <div className="flex gap-1">
            {shortcuts.map((shortcut, i) => (
              <p
                key={i}
                className="border border-gold rounded-md px-1 bg-primary"
              >
                {typeof shortcut === "string" ? shortcut : keyText(shortcut)}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
