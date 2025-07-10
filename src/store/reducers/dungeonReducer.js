// NOTE: This file is temporary. It will be deleted and everything will be moved into
// routesReducer.js in the future.

import { useDispatch } from "react-redux";
import { dungeonsByKey } from "../../util/dungeons";
import { createAppSlice, useRootSelector } from "../storeUtil";
import { useEffect } from "react";

const initialState = {
  selectedDungeon: "Ragefire Chasm",
  selectedFloor: null,
};

export const dungeonSlice = createAppSlice({
  name: "dungeon",
  initialState,
  reducers: {
    setSelectedDungeon(state, { payload: dungeonKey }) {
      if (state.selectedDungeon === dungeonKey) return;
      state.selectedDungeon = dungeonKey;
      state.selectedFloor = dungeonsByKey[dungeonKey].defaultFloor;
    },
    setSelectedFloor(state, { payload: floorKey }) {
      if (state.selectedFloor === floorKey) return;
      state.selectedFloor = floorKey;
    },
  },
});

export function useDungeon() {
  const dispatch = useDispatch();
  const dungeonKey = useRootSelector((state) => state.dungeon.selectedDungeon);
  const dungeon = dungeonsByKey[dungeonKey];

  useEffect(() => {
    if (!dungeon) dispatch(setSelectedDungeon(initialState.selectedDungeon));
  }, [dungeon, dispatch]);

  return dungeon ?? dungeonsByKey[initialState.selectedDungeon];
}

export function useFloor() {
  const floorKey = useRootSelector((state) => state.dungeon.selectedFloor);
  return floorKey;
}

export const dungeonReducer = dungeonSlice.reducer;
export const { setSelectedDungeon, setSelectedFloor } = dungeonSlice.actions;
