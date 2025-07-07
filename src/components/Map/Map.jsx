import { CRS } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { mapBounds, mapCenter, tileSize } from "../../util/map.js";
import "leaflet/dist/leaflet.css";
import "../Leaflet/SmoothWheelZoom.js";
import Mobs from "./Mobs/Mobs.jsx";

export default function Map() {
  return (
    <MapContainer
      className="w-full h-full z-0"
      crs={CRS.Simple}
      center={mapCenter}
      minZoom={0}
      maxZoom={1}
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
      <Mobs />
    </MapContainer>
  );
}
