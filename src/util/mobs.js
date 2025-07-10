export const mobScale = (mobInfo) =>
  mobInfo.classification === "Boss" ? 1.5 : 1;

export function getMobForces(mobInfo) {
  if (mobInfo.level >= 63) {
    return mobInfo.classification === "Elite" ? 4 : 2;
  }

  return mobInfo.classification === "Elite" ? 2 : 1;
}
