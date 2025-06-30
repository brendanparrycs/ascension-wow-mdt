import { CRS, LatLngBounds } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { mapBounds, mapCenter } from "../../util/map.js";
import "leaflet/dist/leaflet.css";
import "../Leaflet/SmoothWheelZoom.js";
import Mobs from "./Mobs/Mobs.jsx";

// export default function Map() {
//   return (
//     <MapContainer
//       className="w-full h-full z-0"
//       crs={CRS.Simple}
//       center={mapCenter}
//       minZoom={0}
//       maxZoom={1}
//       zoom={0.5}
//       zoomSnap={0}
//       keyboard={false}
//       doubleClickZoom={false}
//       attributionControl={false}
//       zoomControl={false}
//       scrollWheelZoom={false}
//       boxZoom={false}
//       smoothWheelZoom={true}
//     >
//       <TileLayer
//         url="/Maps/RagefireChasm/{x}_{y}.png"
//         bounds={mapBounds}
//         tileSize={256}
//         minNativeZoom={0}
//         maxNativeZoom={0}
//         noWrap
//       />
//       <Mobs />
//     </MapContainer>
//   );
// }

function CustomTileLayer() {
  const map = useMap();
  const tileSize = 256;
  const southWest = map.unproject([0, tileSize], 0);
  const northEast = map.unproject([tileSize, 0], 0);

  return (
    <TileLayer
      url="/Maps/RagefireChasm/{x}_{y}.png"
      tileSize={tileSize}
      noWrap={true}
      bounds={LatLngBounds(southWest, northEast)}
    />
  );
}

export default function Map() {
  return (
    <MapContainer
      className="w-full h-full z-0"
      crs={CRS.Simple}
      center={[0, 0]}
    >
      <CustomTileLayer />
    </MapContainer>
  );
}
