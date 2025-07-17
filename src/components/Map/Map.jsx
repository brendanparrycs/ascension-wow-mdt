import { CRS } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { mapBounds, mapCenter, tileSize } from "../../util/map.js";
import "leaflet/dist/leaflet.css";
import "../Leaflet/SmoothWheelZoom.js";
import Mobs from "./Mobs/Mobs.jsx";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/storeUtil.js";
import { setMapObjectsHidden } from "../../store/reducers/mapReducer.js";
import { dungeonFileName } from "../../util/dungeons.js";
import DungeonMarkers from "./DungeonMarkers/DungeonMarkers.jsx";
import MapInitialZoom from "./MapInitialZoom.jsx";
import { isDev } from "../../util/dev.js";
import MousePosition from "../Leaflet/MousePosition.jsx";
import { useDungeon, useFloor } from "../../store/routes/routeHooks.js";
import Notes from "./Notes/Notes.jsx";
import MapContextMenu from "./MapContextMenu.jsx";

export default function Map() {
  const dispatch = useAppDispatch();
  const dungeon = useDungeon();
  const floor = useFloor();

  let dungFileName = dungeonFileName(dungeon.name);
  const floorFileName = floor ? dungeonFileName(floor) : "";

  // Handles Maraudon Orange Crystals and Maraudon Purple Crystals, since they share a map
  if (dungFileName.includes("Maraudon") && dungFileName.includes("Crystals")) {
    dungFileName = "MaraudonCrystals";
  }

  useEffect(() => {
    dispatch(setMapObjectsHidden(true));
    setTimeout(() => dispatch(setMapObjectsHidden(false)), 50);
  }, [dispatch]);

  return (
    <MapContainer
      key={dungeon.name}
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
        url={`/Maps/${dungFileName}/${floorFileName}/{x}_{y}.png`}
        bounds={mapBounds}
        tileSize={tileSize}
        minNativeZoom={0}
        maxNativeZoom={0}
        noWrap={true}
      />
      <MapInitialZoom />
      <DungeonMarkers />
      <Mobs />
      <Notes />
      <MapContextMenu />
      {/* {isDev && <MousePosition />} */}
    </MapContainer>
  );
}
