import { useEffect, useState } from "react";
import { createAppSlice, useRootSelector } from "../storeUtil";

const drawColorKey = "drawColorKey";
const drawStrokeKey = "drawStrokeKey";

const initialState = {
  objectsHidden: true,
  mapMode: "editing",
  drawMode: "drawing",
  isErasing: false,
  drawColor: localStorage.getItem(drawColorKey) || "red",
  drawStroke: Number(localStorage.getItem(drawStrokeKey)) || 4,
  hoveredDrawing: null,
};

const mapSlice = createAppSlice({
  name: "map",
  initialState,
  reducers: {
    setMapObjectsHidden(state, { payload: hidden }) {
      state.objectsHidden = hidden;
    },
    setMapMode(state, { payload: mapMode }) {
      state.mapMode = mapMode;
      if (mapMode !== "drawing") return;
      state.drawMode = "drawing";
      state.isErasing = false;
    },
    setDrawColor(state, { payload: drawColor }) {
      state.drawColor = drawColor;
      localStorage.setItem(drawColorKey, drawColor);
    },
    setStroke(state, { payload: newStroke }) {
      state.drawStroke = newStroke;
      localStorage.setItem(drawStrokeKey, newStroke.toString());
    },
    setDrawMode(state, { payload: drawMode }) {
      state.drawMode = drawMode;
      state.isErasing = false;
    },
    setIsErasing(state, { payload: isErasing }) {
      state.isErasing = isErasing;
    },
    setHoveredDrawing(state, { payload: drawing }) {
      state.hoveredDrawing = drawing;
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
export const {
  setMapObjectsHidden,
  setMapMode,
  setDrawColor,
  setStroke,
  setDrawMode,
  setIsErasing,
  setHoveredDrawing,
} = mapSlice.actions;
