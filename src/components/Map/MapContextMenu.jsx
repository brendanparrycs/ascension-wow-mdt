import { useCallback, useEffect, useState } from "react";
import useContextMenu from "../../util/hooks/useContextMenu";
import { useMap } from "react-leaflet";
import Button from "../Common/Button";
import { useAppDispatch } from "../../store/storeUtil";
import { addNote } from "../../store/reducers/routesReducer";

const minWidth = 180;
const minHeight = 50;

export default function MapContextMenu() {
  const dispatch = useAppDispatch();
  const map = useMap();

  const { contextMenuPosition, onRightClick, onClose } = useContextMenu({
    minWidth,
    minHeight,
  });

  const [leafletPos, setLeafletPos] = useState(null);

  const onRightClickMap = useCallback(
    (e) => {
      onRightClick(e.originalEvent);
      setLeafletPos(e.latlng);
    },
    [onRightClick]
  );

  useEffect(() => {
    map.on({
      contextmenu: onRightClickMap,
      dragstart: onClose,
      zoomstart: onClose,
    });
  }, [map, onClose, onRightClickMap]);

  if (!contextMenuPosition || !leafletPos) return false;

  return (
    <div
      className="bg-primary bg-[url(AscensionAssets/ascension_background_1.webp)] bg-cover rounded-md border border-primary fixed z-[9999] p-2"
      onContextMenu={(e) => e.preventDefault()}
      style={{ minWidth, minHeight, ...contextMenuPosition }}
    >
      <Button
        className="w-full h-8 hover:text-primary font-bold"
        onClick={() =>
          dispatch(
            addNote({ position: [leafletPos.lat, leafletPos.lng], text: "" })
          )
        }
      >
        Add note
      </Button>
    </div>
  );
}
