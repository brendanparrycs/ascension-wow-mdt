import { CRS, Icon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { mapBounds, mapCenter, tileSize } from "../../util/map.js";
import "leaflet/dist/leaflet.css";
import "../Leaflet/SmoothWheelZoom.js";
import Mobs from "./Mobs/Mobs.jsx";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/storeUtil.js";
import { setMapObjectsHidden } from "../../store/reducers/mapReducer.js";

export default function Map() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMapObjectsHidden(true));
    setTimeout(() => dispatch(setMapObjectsHidden(false)), 50);
  }, [dispatch]);

  return (
    <MapContainer
      className="w-full h-full z-0"
      crs={CRS.Simple}
      center={mapCenter}
      minZoom={0}
      maxZoom={2}
      zoom={0}
      zoomSnap={0}
      keyboard={false}
      doubleClickZoom={false}
      attributionControl={false}
      zoomControl={false}
      scrollWheelZoom={false}
      boxZoom={false}
      smoothWheelZoom={true}
    >
      <TileLayer
        url="/Maps/RagefireChasm/{x}_{y}.png"
        bounds={mapBounds}
        tileSize={tileSize}
        minNativeZoom={0}
        maxNativeZoom={0}
        noWrap
      />
      {/* <Mobs /> */}
    </MapContainer>
  );
}
