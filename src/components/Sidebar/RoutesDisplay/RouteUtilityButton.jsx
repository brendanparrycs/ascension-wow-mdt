import { useMemo } from "react";
import Button from "../../Common/Button";
import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export default function RouteUtilityButton({ role, children }) {
  const Icon = useMemo(() => {
    switch (role) {
      case "rename":
        return PencilIcon;
      case "new":
        return PlusCircleIcon;
      case "duplicate":
        return DocumentDuplicateIcon;
      case "delete":
        return TrashIcon;
      case "share":
        return ShareIcon;
    }
  }, [role]);

  return (
    <Button
      className={`w-full h-8 flex justify-center items-center ${children ? "flex justify-center items-center gap-1" : ""}`}
      onClick={() => console.log(role)}
    >
      <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
      {children}
    </Button>
  );
}
