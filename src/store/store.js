import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { mapReducer } from "./reducers/mapReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { dungeonReducer } from "./reducers/dungeonReducer";

export const store = configureStore({
  reducer: {
    map: persistReducer({ key: "map", storage }, mapReducer),
    dungeon: persistReducer({ key: "dungeon", storage }, dungeonReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: { warnAfter: 200 },
    }),
});

export const persistor = persistStore(store);
