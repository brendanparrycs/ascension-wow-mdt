import dungeons from "../data/DungeonData/dungeons.json";

export const dungeonsByName = dungeons.reduce((acc, dungeon) => {
  acc[dungeon.name] = dungeon;
  return acc;
}, {});

export const dungeonFileName = (name) => name.replace(/[^a-zA-Z0-9]/g, "");
