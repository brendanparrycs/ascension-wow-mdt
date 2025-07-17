import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { mapReducer } from "./reducers/mapReducer";
import { hoverReducer } from "./reducers/hoverReducer";
import { routesReducer } from "./reducers/routesReducer";
import { listenerMiddleware } from "./listener";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    hover: hoverReducer,
    routes: routesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 200 },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
