import localforage from "localforage";
import createMigrate from "redux-persist/es/createMigrate";
import { initialState } from "../reducers/routesReducer";

export const routePersistVersion = 2;

const persistMigrations = {
  [routePersistVersion]: async (state) => {
    await localforage.clear();
    return { ...state, past: [], future: [], present: initialState };
  },
};

export const routeMigrate = createMigrate(persistMigrations);
