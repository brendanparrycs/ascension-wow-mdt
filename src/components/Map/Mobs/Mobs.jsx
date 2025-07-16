import Delayed from "../../Common/Delayed";
import baseMobData from "../../../data/DungeonData/mobs.json";
import MobMarker from "./MobMarker";
import { useDungeon } from "../../../store/reducers/dungeonReducer";
import { dungeonFileName } from "../../../util/dungeons";
import MobModal from "../../Modals/MobModal/MobModal";

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
  const dungeon = useDungeon();
  const dungeonMobs = dungeonMobDataMap[dungeonFileName(dungeon.name)] || [];

  const baseMobMap = {};
  const mobCounts = {};

  for (const mob of baseMobData) {
    baseMobMap[mob.id] = mob;
  }

  return (
    <Delayed delay={50}>
      {dungeonMobs.map((mob) => {
        const mobInfo = baseMobMap[mob.id];
        if (!mobInfo) return null;

        mobCounts[mob.id] = (mobCounts[mob.id] || 0) + 1;
        let mobKey = `${mobInfo.name} ${mobCounts[mob.id]}`;
        mobKey = mobInfo.classification !== "Boss" ? mobKey : mobInfo.name;

        return (
          <MobMarker key={mobKey} mob={mob} mobInfo={mobInfo} mobKey={mobKey} />
        );
      })}
    </Delayed>
  );
}
