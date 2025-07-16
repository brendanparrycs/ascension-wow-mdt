import { memo, useMemo } from "react";
import { divIcon } from "leaflet";
import { defaultIconSize } from "../../../util/map";
import { renderToString } from "react-dom/server";
import { Marker, Tooltip } from "react-leaflet";
import Delayed from "../../Common/Delayed";
import { useMapObjectsHidden } from "../../../store/reducers/mapReducer";

function DungeonMarkerComponent({ position, tooltipText, src, eventHandlers }) {
  const hidden = useMapObjectsHidden(0, 100);

  const icon = useMemo(() => {
    return divIcon({
      className: "bg-transparent",
      tooltipAnchor: [defaultIconSize / 2, 0],
      iconUrl: src,
      iconSize: [defaultIconSize, defaultIconSize],
      html: renderToString(
        <img className={`${hidden ? "opacity-0" : "opacity-100"}`} src={src} />
      ),
    });
  }, [src, hidden]);

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers}>
      <Delayed delay={300}>
        <Tooltip className="mob-tooltip" direction="right">
          {tooltipText}
        </Tooltip>
      </Delayed>
    </Marker>
  );
}

export const DungeonMarker = memo(DungeonMarkerComponent);
export default DungeonMarker;
