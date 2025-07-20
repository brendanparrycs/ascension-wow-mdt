import { isMacOs, isMobile } from "react-device-detect";

const tips = [
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
];

export default function TipsList() {
  if (isMobile) return;

  return tips.flatMap(({ shortcuts, description }, index) => (
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
