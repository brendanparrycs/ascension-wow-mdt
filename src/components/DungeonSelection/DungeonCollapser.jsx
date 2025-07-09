import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export default function DungeonCollapser({ collapsed, setCollapsed }) {
  return (
    <div
      className="bg-primary border-2 border-gold rounded-md absolute -right-8 z-[-1] cursor-pointer group hover:bg-gold transition-color duration-300"
      onClick={setCollapsed}
    >
      <ChevronLeftIcon
        className={`w-8 h-12 transition-all duration-300 group-hover:text-primary ${collapsed ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );
}
