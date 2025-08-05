import { PaintBrushIcon } from "@heroicons/react/20/solid";
import Button from "../../../Common/Button";
import { useCallback, useState } from "react";
import { useAppDispatch, useRootSelector } from "../../../../store/storeUtil";
import { setMapMode } from "../../../../store/reducers/mapReducer";
import useShortcut from "../../../../util/hooks/useShortcut";
import { shortcuts } from "../../../../data/shortcuts";
import ColorChooser from "./ColorChooser";
import StrokeChooser from "./StrokeChooser";
import EraseButtons from "./EraseButtons";

export default function DrawToolbar() {
  const dispatch = useAppDispatch();
  const { mapMode } = useRootSelector((state) => state.map);
  const [openChooser, setOpenChooser] = useState(null);

  const isDrawing = mapMode === "drawing";
  const toggleDraw = useCallback(() => {
    dispatch(setMapMode(isDrawing ? "editing" : "drawing"));
    setOpenChooser(null);
  }, [dispatch, isDrawing]);

  useShortcut(shortcuts.drawMode, toggleDraw);

  return (
    <div className="flex gap-1">
      <Button
        className={`font-bold w-12 h-12 p-2 ${
          isDrawing ? "text-primary !bg-gold" : "hover:text-primary"
        }`}
        onClick={toggleDraw}
      >
        <PaintBrushIcon className="w-full h-full" />
      </Button>
      {isDrawing && (
        <div className="flex gap-4">
          <div className="flex gap-1">
            <ColorChooser
              openChooser={openChooser}
              setOpenChooser={setOpenChooser}
            />
            <StrokeChooser
              openChooser={openChooser}
              setOpenChooser={setOpenChooser}
            />
          </div>
          <EraseButtons />
        </div>
      )}
    </div>
  );
}
