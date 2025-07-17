import { useMemo } from "react";
import Button from "../../Common/Button";
import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  DocumentDuplicateIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../store/storeUtil";
import { newRoute } from "../../../store/reducers/routesReducer";

export default function RouteUtilityButton({ role, children }) {
  const dispatch = useAppDispatch();

  const { Icon, onClick } = useMemo(() => {
    switch (role) {
      case "rename":
        return { Icon: PencilIcon };
      case "new":
        return { Icon: PlusCircleIcon, onClick: () => dispatch(newRoute()) };
      case "duplicate":
        return { Icon: DocumentDuplicateIcon };
      case "delete":
        return { Icon: TrashIcon };
      case "share":
        return { Icon: ShareIcon };
    }
  }, [role, dispatch]);

  return (
    <Button
      className={`w-full h-8 flex justify-center items-center ${
        children ? "flex justify-center items-center gap-1" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
      {children}
    </Button>
  );
}
