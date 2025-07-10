import dungeons from "../data/DungeonData/dungeons.json";

export const dungeonsByKey = dungeons.reduce((acc, dungeon) => {
  acc[dungeon.name] = dungeon;
  return acc;
}, {});

export const dungeonFileName = (name) => name.replace(/[^a-zA-Z0-9]/g, "");
