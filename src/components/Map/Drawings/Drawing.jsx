import { memo, useCallback, useMemo } from "react";
import { useAppDispatch, useRootSelector } from "../../../store/storeUtil";
import { splitDrawingAtPoint } from "../../../util/drawing";
import { latLngToPoint } from "../../../util/map";
import { Polyline, useMap } from "react-leaflet";
import {
  deleteDrawing,
  updateDrawing,
} from "../../../store/reducers/routesReducer";
import {
  setHoveredDrawing,
  useMapObjectsHidden,
} from "../../../store/reducers/mapReducer";

const overDrawingClass = "over-drawing";

function DrawingComponent({ drawing }) {
  const dispatch = useAppDispatch();
  const map = useMap();
  const hidden = useMapObjectsHidden(0, 100);
  const { drawMode, isErasing } = useRootSelector((state) => state.map);

  const eraseAtPoint = useCallback(
    (latLng) => {
      const newDrawing = splitDrawingAtPoint(
        drawing,
        latLngToPoint(latLng),
        map.getZoom()
      );

      if (!newDrawing) return;
      if (newDrawing.positions.every((line) => line.length <= 0)) {
        dispatch(deleteDrawing(newDrawing));
      } else {
        dispatch(updateDrawing(newDrawing));
      }
    },
    [dispatch, drawing, map]
  );

  const eventHandlers = useMemo(() => {
    return {
      click: (e) => {
        if (drawMode === "deleting") {
          dispatch(deleteDrawing(drawing));
          dispatch(setHoveredDrawing(null));
          map.getContainer().classList.remove(overDrawingClass);
        } else if (drawMode === "editing") {
          eraseAtPoint(e.latlng);
        }
      },
      mouseover: () => {
        dispatch(setHoveredDrawing(drawing));
        map.getContainer().classList.add(overDrawingClass);
      },
      mouseout: () => {
        dispatch(setHoveredDrawing(null));
        map.getContainer().classList.remove(overDrawingClass);
      },
      mousemove: (e) => {
        if (isErasing) eraseAtPoint(e.latlng);
      },
    };
  }, [dispatch, drawMode, drawing, map, isErasing, eraseAtPoint]);

  if (
    drawing.positions.some((line) => line.some((point) => point.length !== 2))
  ) {
    console.error("Invalid drawing");
    return;
  }

  return (
    <Polyline
      key={String(hidden)}
      positions={drawing.positions}
      color={drawing.color}
      weight={drawing.stroke}
      opacity={hidden ? 0 : 1}
      fillOpacity={hidden ? 0 : 1}
      interactive={true}
      eventHandlers={eventHandlers}
    />
  );
}

const Drawing = memo(DrawingComponent);
export default Drawing;
