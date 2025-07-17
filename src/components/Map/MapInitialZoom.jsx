import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { mapBounds } from "../../util/map";

export default function MapInitialZoom() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(mapBounds, { animate: false });
  }, [map]);

  return null;
}
