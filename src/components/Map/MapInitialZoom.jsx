import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { mapBounds } from "../../util/map";

// TODO: fix issue where changing floor breaks the zoom
export default function MapInitialZoom() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(mapBounds, { animate: false });
  }, [map]);

  return null;
}
