const wowMin = 0;
const wowMax = 100;

export const mobScale = (mobInfo) =>
  mobInfo.classification === "Boss" ? 1.5 : 1;

export function wowToLeafletCoords(coords) {
  const x = coords[0];
  const y = coords[1];

  const percentX = (x - wowMin) / (wowMax - wowMin);
  const leafletX = percentX * 1000;

  const percentY = (y - wowMin) / (wowMax - wowMin);
  const leafletY = -(percentY * 669);

  return [leafletY, leafletX];
}

export function getMobForces(mobInfo) {
  if (mobInfo.level >= 63) {
    return mobInfo.classification === "Elite" ? 4 : 2;
  }

  return mobInfo.classification === "Elite" ? 2 : 1;
}
