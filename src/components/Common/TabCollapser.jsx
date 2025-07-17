import { useMemo } from "react";
import Button from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export default function TabCollapser({ direction, collapsed, onClick }) {
  const Icon = useMemo(
    () => (direction === "left" ? ChevronRightIcon : ChevronLeftIcon),
    [direction]
  );

  return (
    <Button
      className={`absolute z-[-1] border-primary hover:border-gold ${
        direction === "left" ? "-left-8" : "-right-8"
      }`}
      onClick={onClick}
    >
      <Icon
        className={`w-8 h-12 transition-all duration-300 text-white group-hover:text-primary ${
          collapsed ? "rotate-180" : "rotate-0"
        }`}
      />
    </Button>
  );
}
