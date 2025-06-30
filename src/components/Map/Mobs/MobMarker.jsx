import { Icon } from "leaflet";
import { Marker, useMap } from "react-leaflet";

export function MobMarker({ npc, spawn }) {
  console.log(spawn);

  return (
    <Marker
      position={spawn}
      icon={
        new Icon({
          iconUrl: `/NPCPortraits/${npc.id}.png`,
          iconSize: [25, 25],
          iconAnchor: [25 / 2, 25 / 2],
        })
      }
    />
  );
}
