import { point } from "leaflet";

export const tileSize = point(251, 223);

const mapHeight = tileSize.y * 3;
const mapWidth = tileSize.x * 4;

export const mapCenter = [-mapHeight / 2, mapWidth / 2];
export const mapBounds = [
  [0, 0],
  [-mapHeight, mapWidth],
];

export const defaultIconSize = [25, 25];

const wowMin = 0;
const wowMax = 100;

export function wowToLeafletCoords(coords) {
  const x = coords[0];
  const y = coords[1];

  const percentX = (x - wowMin) / (wowMax - wowMin);
  const leafletX = percentX * 1000;

  const percentY = (y - wowMin) / (wowMax - wowMin);
  const leafletY = -(percentY * 669);

  return [leafletY, leafletX];
}

export function leafletToWoWCoords(coords) {
  const leafletX = coords[1];
  const leafletY = coords[0];

  const percentX = leafletX / 1000;
  const x = percentX * (wowMax - wowMin) + wowMin;

  const percentY = -leafletY / 669;
  const y = percentY * (wowMax - wowMin) + wowMin;

  return [x, y];
}
