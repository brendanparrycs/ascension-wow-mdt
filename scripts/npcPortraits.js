import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dungeon = "RagefireChasm"; // change this value to download portraits from different dungeons
const npcJsonPath = path.join(
  __dirname,
  `../src/data/DungeonData/${dungeon}/npcs.json`
);
const outputDir = path.join(__dirname, "../public/NPCPortraits");

const npcData = JSON.parse(await fs.readFile(npcJsonPath, "utf-8"));
const npcIds = npcData
  .map((npc) => npc.id)
  .filter((id) => typeof id === "number" && !isNaN(id));

async function downloadImage(id) {
  const fileName = `${id}.png`;
  const url = `https://raw.githubusercontent.com/RaiderIO/keystone.guru/refs/heads/master/resources/assets/images/enemyportraits/${fileName}`;
  const filePath = path.join(outputDir, fileName);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${fileName}: ${res.status}`);

    const buffer = await res.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));
    console.log(`Downloaded ${fileName}`);
  } catch (error) {
    console.error(`Error downloading ${fileName}: ${error.message}`);
  }
}

for (const id of npcIds) {
  await downloadImage(id);
}
