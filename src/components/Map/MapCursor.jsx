import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useRootSelector } from "../../store/storeUtil";
import { renderToStaticMarkup } from "react-dom/server";
import { PaintBrushIcon } from "@heroicons/react/24/outline";
import EraseIcon from "../Common/Icons/EraseIcon";
import { XMarkIcon } from "@heroicons/react/20/solid";

function iconToSvgString(icon) {
  return encodeURIComponent(renderToStaticMarkup(icon))
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
}

export default function MapCursor() {
  const map = useMap();
  const { hoveredDrawing } = useRootSelector((state) => state.map);
  const { mapMode, drawMode, drawColor } = useRootSelector(
    (state) => state.map
  );

  useEffect(() => {
    if (mapMode !== "drawing") return;

    if (drawMode === "drawing") {
      map.getContainer().style.cursor = `url("data:image/svg+xml,${iconToSvgString(
        <PaintBrushIcon
          stroke="black"
          fill={drawColor}
          width={24}
          height={24}
        />
      )}") 12 12, auto`;
    } else if (drawMode === "erasing") {
      map.getContainer().style.cursor = `url("data:image/svg+xml,${iconToSvgString(
        <EraseIcon fill="black" width={30} height={30} />
      )}") 12 12, auto`;
    } else if (drawMode === "deleting") {
      map.getContainer().style.cursor = `url("data:image/svg+xml,${iconToSvgString(
        <XMarkIcon
          stroke="black"
          fill={hoveredDrawing ? hoveredDrawing.color : "transparent"}
          width={36}
          height={36}
        />
      )}") 12 12, auto`;
    }

    return () => {
      map.getContainer().style.cursor = "";
    };
  }, [map, mapMode, drawMode, drawColor, hoveredDrawing]);

  return null;
}
