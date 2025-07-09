import { useEffect, useState } from "react";
import { createAppSlice, useRootSelector } from "../storeUtil";

const initialState = {
  objectsHidden: true,
};

export const mapSlice = createAppSlice({
  name: "map",
  initialState,
  reducers: {
    setMapObjectsHidden(state, { payload: hidden }) {
      state.objectsHidden = hidden;
    },
  },
});

export function useMapObjectsHidden(minDelay, maxDelay) {
  const hidden = useRootSelector((state) => state.map.objectsHidden);
  const [delayedHidden, setDelayedHidden] = useState(true);

  useEffect(() => {
    if (!hidden) {
      setTimeout(
        () => setDelayedHidden(false),
        minDelay + Math.random() * maxDelay
      );
    } else {
      setDelayedHidden(true);
    }
  }, [hidden, minDelay, maxDelay]);

  return delayedHidden;
}

export const mapReducer = mapSlice.reducer;
export const { setMapObjectsHidden } = mapSlice.actions;
