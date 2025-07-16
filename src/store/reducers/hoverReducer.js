import { createAppSlice, useRootSelector } from "../storeUtil";

const initialState = {
  hoveredMob: null,
  selectedMob: null,
};

export const hoverSlice = createAppSlice({
  name: "hover",
  initialState,
  reducers: {
    hoverMob(state, { payload: mobKey }) {
      state.hoveredMob = mobKey;
    },
    selectMob(state, { payload: mob }) {
      state.selectedMob =
        mob === null || mob !== state.selectedMob ? mob : null;
    },
  },
  selectors: {
    selectHoveredMob: (state) => state.hoveredMob,
    selectedSelectedMob: (state) => state.selectedMob,
  },
});

export function useHoveredMob() {
  const hoveredMob = useRootSelector(selectHoveredMob);
  return hoveredMob;
}

export const hoverReducer = hoverSlice.reducer;
export const { hoverMob, selectMob } = hoverSlice.actions;
export const { selectHoveredMob, selectedSelectedMob } = hoverSlice.selectors;
