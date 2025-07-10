import { useCallback, useState } from "react";
import { useMapEvent } from "react-leaflet";
import { leafletToWoWCoords } from "../../util/map";

export default function MousePosition() {
  const [{ lat, lng }, setLatLng] = useState({ lat: 0, lng: 0 });

  const onMouseMove = useCallback((e) => {
    setLatLng(e.latlng);
  }, []);

  useMapEvent("mousemove", onMouseMove);
  const coords = leafletToWoWCoords([lat, lng]);

  return (
    <div className="fixed bottom-0 bg-white text-black text-xs z-[9999] flex gap-8">
      [{coords[0]?.toFixed(1)}, {coords[1]?.toFixed(1)}]
    </div>
  );
}
