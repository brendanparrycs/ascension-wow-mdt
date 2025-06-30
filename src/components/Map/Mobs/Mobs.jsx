import { latLng } from "leaflet";
import Delayed from "../../Common/Delayed";
import { MobMarker } from "./MobMarker";

const enemyDataFiles = import.meta.glob(
  "../../../data/DungeonData/*/enemies.json",
  { eager: true }
);

const npcDataFiles = import.meta.glob("../../../data/DungeonData/*/npcs.json", {
  eager: true,
});

const enemyDataMap = {};
const npcDataMap = {};

for (const path in enemyDataFiles) {
  const match = path.match(/DungeonData\/([^/]+)\/enemies\.json$/);

  if (match) {
    const dungeonName = match[1];
    const file = enemyDataFiles[path];
    enemyDataMap[dungeonName] = file.default || file;
  }
}

for (const path in npcDataFiles) {
  const match = path.match(/DungeonData\/([^/]+)\/npcs\.json$/);

  if (match) {
    const dungeonName = match[1];
    const file = npcDataFiles[path];
    npcDataMap[dungeonName] = file.default || file;
  }
}

export default function Mobs() {
  const dungeon = "RagefireChasm"; // TODO: make this work with all dungeons
  const enemyData = enemyDataMap[dungeon];
  const npcData = npcDataMap[dungeon];

  const npcMap = {};
  for (const npc of npcData) {
    npcMap[npc.id] = npc;
  }

  // Delay all mobs by 50ms for performance
  return (
    <Delayed delay={50}>
      {enemyData.map((enemy) => {
        const npc = npcMap[enemy.npc_id];

        if (npc.id === 11321) {
          return (
            <MobMarker
              key={enemy.id}
              npc={npc}
              spawn={[enemy.lat, enemy.lng]}
            />
          );
        }
      })}
    </Delayed>
  );
}
