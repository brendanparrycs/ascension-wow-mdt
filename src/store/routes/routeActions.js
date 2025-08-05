import { dungeonsByName } from "../../util/dungeons";

const findSelectedPull = (route, mob) =>
  route.pulls.findIndex((pull) => pull.mobs.some((mob2) => mob === mob2));

export function toggleSpawnAction(state, payload) {
  const { selectedRoute } = state;
  const dungeon = dungeonsByName[selectedRoute.dungeonName];

  const origSelectedPull = findSelectedPull(selectedRoute, payload.mob);
  // TODO: do group spawns
}
