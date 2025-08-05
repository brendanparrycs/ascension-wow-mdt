import { useMemo } from "react";
import { useAppDispatch, useRootSelector } from "../../../store/storeUtil";
import { latLngToPoint } from "../../../util/map";
import PathLayerComponent from "./PathLayerComponent";
import { addDrawing } from "../../../store/reducers/routesReducer";
import { useFloor } from "../../../store/routes/routeHooks";

export default function PatherComponent() {
  const dispatch = useAppDispatch();
  const floor = useFloor();
  const { mapMode, drawMode, drawColor, drawStroke } = useRootSelector(
    (state) => state.map
  );

  const eventHandlers = useMemo(
    () => ({
      created: (e) =>
        dispatch(
          addDrawing({
            floor,
            positions: [e.latLngs.map(latLngToPoint)],
            stroke: drawStroke,
            color: drawColor,
          })
        ),
    }),
    [dispatch, drawColor, drawStroke, floor]
  );

  if (mapMode !== "drawing") return null;

  return (
    <PathLayerComponent
      mode={drawMode}
      strokeWidth={drawStroke}
      strokeColor={drawColor}
      simplifyThreshold={5}
      eventHandlers={eventHandlers}
    />
  );
}
