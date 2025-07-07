import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mobJsonPath = path.join(__dirname, "../src/data/DungeonData/mobs.json");
const outputDir = path.join(__dirname, "../public/NPCPortraits");

const mobData = JSON.parse(await fs.readFile(mobJsonPath, "utf-8"));
const mobIds = mobData
  .map((mob) => mob.id)
  .filter((id) => typeof id === "number" && !isNaN(id));

// TODO: get access to assets.keystone.guru to extract portraits from there
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

for (const id of mobIds) {
  await downloadImage(id);
}
