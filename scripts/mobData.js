import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Command line input
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Useage: node mobData.js <mobId> <dungeonName>");
  process.exit(1);
}

const mobId = parseInt(args[0]);
const dungeonName = args[1];

if (isNaN(mobId)) {
  console.error("Error: mobId must be a number.");
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const basePath = path.join(__dirname, "../src/data/DungeonData");
const mobsJsonPath = path.join(basePath, "mobs.json");
const dungeonMobsPath = path.join(basePath, dungeonName, "mobs.json");

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Normal mob url
const url = `https://db.ascension.gg/?npc=${mobId}`;
await page.goto(url, { waitUntil: "domcontentloaded" });

// Mob name and positions
await page.waitForSelector("h1");
const mobName = await page.$eval("h1", (el) => el.textContent.trim());

const pins = await page.$$eval(".pin", (pins) =>
  pins.map((pin) => {
    const style = pin.getAttribute("style");
    const left = parseFloat(style.match(/left:\s*([\d.]+)%/)[1]);
    const top = parseFloat(style.match(/top:\s*([\d.]+)%/)[1]);
    return [left, top];
  })
);

// Update DungeonData/mobs.json with mob info
try {
  const mobs = JSON.parse(await fs.readFile(mobsJsonPath, "utf-8"));
  const existing = mobs.find((m) => m.id === mobId);

  if (!existing) {
    mobs.push({ id: mobId, name: mobName });
    console.log(`Added ${mobId} to mobs.json`);
  } else {
    existing.name = mobName;
    console.log(`Updated ${mobId} in mobs.json`);
  }

  await fs.writeFile(mobsJsonPath, JSON.stringify(mobs, null, 2));
} catch {
  await fs.writeFile(
    mobsJsonPath,
    JSON.stringify([{ id: mobId, name: mobName }], null, 2)
  );
}

// Update mob positions in DungeonData/${dungeonName}/mobs.json
try {
  await fs.mkdir(path.dirname(dungeonMobsPath), { recursive: true });
  let dungeonMobs = [];

  try {
    dungeonMobs = JSON.parse(await fs.readFile(dungeonMobsPath, "utf-8"));
  } catch {
    // File might not exist; start fresh
  }

  dungeonMobs = dungeonMobs.filter((entry) => entry.id !== mobId);

  pins.forEach((pos) => {
    dungeonMobs.push({ id: mobId, position: pos });
  });

  await fs.writeFile(dungeonMobsPath, JSON.stringify(dungeonMobs, null, 2));
  console.log(`Wrote ${pins.length} pin(s) to ${dungeonName}/mobs.json`);
} catch (err) {
  console.error("Error updating dungeon mobs file:", err.message);
}

await browser.close();
