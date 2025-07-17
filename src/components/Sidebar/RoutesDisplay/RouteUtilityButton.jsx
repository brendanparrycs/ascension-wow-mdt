import { useEffect, useMemo } from "react";
import Button from "../../Common/Button";
import {
  TrashIcon,
  PencilIcon,
  PlusCircleIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../../store/storeUtil";
import {
  deleteRoute,
  duplicateRoute,
  newRoute,
} from "../../../store/reducers/routesReducer";

export default function RouteUtilityButton({
  role,
  children,
  isRenaming,
  onClickRename,
}) {
  const dispatch = useAppDispatch();

  const { Icon, onClick } = useMemo(() => {
    switch (role) {
      case "rename":
        return {
          Icon: isRenaming ? CheckIcon : PencilIcon,
          onClick: onClickRename,
        };
      case "new":
        return { Icon: PlusCircleIcon, onClick: () => dispatch(newRoute()) };
      case "duplicate":
        return {
          Icon: DocumentDuplicateIcon,
          onClick: () => dispatch(duplicateRoute()),
        };
      case "delete":
        return { Icon: TrashIcon, onClick: () => dispatch(deleteRoute()) };
      case "share":
        return { Icon: ShareIcon }; // TODO: make this work along with firestore
    }
  }, [role, dispatch, isRenaming, onClickRename]);

  return (
    <Button
      className={`w-full h-8 flex justify-center items-center border-primary text-white hover:border-gold !border ${
        children ? "flex justify-center items-center gap-1" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-primary" />
      {children}
    </Button>
  );
}
