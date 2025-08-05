import EraseIcon from "../../../Common/Icons/EraseIcon";
import { TrashIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../../../Common/Button";
import { useAppDispatch, useRootSelector } from "../../../../store/storeUtil";
import { setDrawMode } from "../../../../store/reducers/mapReducer";
import { clearDrawings } from "../../../../store/reducers/routesReducer";

export default function EraseButtons() {
  const dispatch = useAppDispatch();
  const { drawMode } = useRootSelector((state) => state.map);

  const isErasing = drawMode === "erasing";
  const isDeleting = drawMode === "deleting";

  return (
    <div className="flex gap-1">
      <Button
        className={`font-bold w-12 h-12 p-2 ${
          isErasing ? "text-primary !bg-gold" : "hover:text-primary"
        }`}
        onClick={() => dispatch(setDrawMode(isErasing ? "drawing" : "erasing"))}
      >
        <EraseIcon className="w-full h-full" />
      </Button>
      <Button
        className={`font-bold w-12 h-12 p-2 ${
          isDeleting ? "text-primary !bg-gold" : "hover:text-primary"
        }`}
        onClick={() =>
          dispatch(setDrawMode(isDeleting ? "drawing" : "deleting"))
        }
      >
        <XMarkIcon className="w-full h-full" />
      </Button>
      <Button
        className="font-bold w-12 h-12 p-2 hover:text-primary"
        onClick={() => dispatch(clearDrawings())}
      >
        <TrashIcon className="w-full h-full" />
      </Button>
    </div>
  );
}
