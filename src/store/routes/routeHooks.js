import { createSelector } from "@reduxjs/toolkit";
import { dungeonsByName } from "../../util/dungeons";
import { useRootSelector } from "../storeUtil";

const selectRoute = (state) => state.routes.present.selectedRoute;
const selectSavedRoutes = (state) => state.routes.present.savedRoutes;

const selectDungeonRoutes = createSelector(
  [selectSavedRoutes, (_, dungeonName) => dungeonName],
  (allRoutes, dungeonName) =>
    allRoutes.filter((route) => route.dungeonName === dungeonName)
);

const selectDungeonName = createSelector(
  [selectRoute],
  (route) => route.dungeonName
);

const selectFloor = createSelector(
  [selectRoute],
  (route) => route.selectedFloor
);

export const useRoute = () => useRootSelector(selectRoute);
export const useDungeonRoutes = (dungeonName) =>
  useRootSelector((state) => selectDungeonRoutes(state, dungeonName));

export function useDungeon() {
  const dungeonName = useRootSelector(selectDungeonName);
  return dungeonsByName[dungeonName];
}

export function useFloor() {
  return useRootSelector(selectFloor);
}
