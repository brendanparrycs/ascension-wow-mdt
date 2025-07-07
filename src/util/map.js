import { point } from "leaflet";

export const tileSize = point(250, 223);

const mapHeight = tileSize.y * 3;
const mapWidth = tileSize.x * 4;
const maxCoords = [-mapHeight, mapWidth];

export const mapCenter = [maxCoords[0] / 2, maxCoords[1] / 2];
export const mapBounds = [[0, 0], maxCoords];
