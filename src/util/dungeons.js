import dungeons from "../data/DungeonData/dungeons.json";

export const dungeonsByKey = dungeons.reduce((acc, dungeon) => {
  acc[dungeon.name] = dungeon;
  return acc;
}, {});
