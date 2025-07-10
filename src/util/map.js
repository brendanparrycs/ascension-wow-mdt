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
