import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Button from "./Common/Button";
import { ArrowUturnRightIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useRootSelector } from "../store/storeUtil";
import { useCallback } from "react";
import { ActionCreators } from "redux-undo";
import useShortcut from "../util/hooks/useShortcut";
import { shortcuts } from "../data/shortcuts";
import DrawToolbar from "./Map/Draw/DrawToolbar/DrawToolbar";

export default function Header() {
  const dispatch = useAppDispatch();
  const hasPast = useRootSelector((state) => state.routes.past.length > 0);
  const hasFuture = useRootSelector((state) => state.routes.future.length > 0);

  const undo = useCallback(() => dispatch(ActionCreators.undo()), [dispatch]);
  const redo = useCallback(() => dispatch(ActionCreators.redo()), [dispatch]);

  useShortcut(shortcuts.undo, undo, { allowRepeat: true });
  useShortcut(shortcuts.redo, redo, { allowRepeat: true });

  return (
    <div className="p-2 fixed top-0 flex gap-4">
      <div className="flex gap-1">
        <Button
          className={`font-bold w-12 h-12 p-2 ${
            !hasPast
              ? "opacity-50 hover:bg-primary cursor-default"
              : "hover:text-primary"
          }`}
          disabled={!hasPast}
          onClick={undo}
        >
          <ArrowUturnLeftIcon className="w-full h-full" />
        </Button>
        <Button
          className={`font-bold w-12 h-12 p-2 ${
            !hasFuture
              ? "opacity-50 hover:bg-primary cursor-default"
              : "hover:text-primary"
          }`}
          disabled={!hasFuture}
          onClick={redo}
        >
          <ArrowUturnRightIcon className="w-full h-full" />
        </Button>
      </div>
      <DrawToolbar />
    </div>
  );
}
