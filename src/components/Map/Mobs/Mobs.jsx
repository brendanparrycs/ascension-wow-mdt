import Delayed from "../../Common/Delayed";
import baseMobData from "../../../data/DungeonData/mobs.json";
import MobMarker from "./MobMarker";

const dungeonMobDataFiles = import.meta.glob(
  "../../../data/DungeonData/*/mobs.json",
  { eager: true }
);

const dungeonMobDataMap = {};

for (const path in dungeonMobDataFiles) {
  const match = path.match(/DungeonData\/([^/]+)\/mobs\.json$/);

  if (match) {
    const dungeonName = match[1];
    const file = dungeonMobDataFiles[path];
    dungeonMobDataMap[dungeonName] = file.default || file;
  }
}

export default function Mobs() {
  const dungeon = "RagefireChasm"; // TODO: make this work with all dungeons
  const dungeonMobs = dungeonMobDataMap[dungeon] || [];

  const baseMobMap = {};
  for (const mob of baseMobData) {
    baseMobMap[mob.id] = mob;
  }

  // Delay all mobs by 50ms for performance
  return (
    <Delayed delay={50}>
      {dungeonMobs.map((mob, index) => {
        const mobInfo = baseMobMap[mob.id];
        if (!mobInfo) return null;

        return (
          <MobMarker key={`${mob.id}-${index}`} mob={mob} mobInfo={mobInfo} />
        );
      })}
    </Delayed>
  );
}
