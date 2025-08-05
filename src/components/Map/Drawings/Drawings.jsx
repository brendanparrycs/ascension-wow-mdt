import { useMemo } from "react";
import { useFloor, useRoute } from "../../../store/routes/routeHooks";
import { useAppDispatch, useRootSelector } from "../../../store/storeUtil";
import { setIsErasing } from "../../../store/reducers/mapReducer";
import { useMapEvents } from "react-leaflet";
import Drawing from "./Drawing";

export default function Drawings() {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const floor = useFloor();
  const { drawMode, isErasing } = useRootSelector((state) => state.map);

  const mapEvents = useMemo(
    () => ({
      mousedown: () => {
        if (drawMode === "erasing") dispatch(setIsErasing(true));
      },
      mouseup: () => {
        if (isErasing) dispatch(setIsErasing(false));
      },
    }),
    [dispatch, drawMode, isErasing]
  );

  useMapEvents(mapEvents);

  return route.drawings.map((drawing) =>
    drawing.floor === floor ? (
      <Drawing key={drawing.id} drawing={drawing} />
    ) : null
  );
}
