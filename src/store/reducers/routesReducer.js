import { nanoid } from "nanoid";
import { createAppSlice, useAppDispatch, useRootSelector } from "../storeUtil";
import { dungeonsByName } from "../../util/dungeons";
import { useEffect } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import localforage from "localforage";
import persistReducer from "redux-persist/es/persistReducer";
import indexedDbStorage from "../storage";
import { routeMigrate, routePersistVersion } from "../routes/routeMigrations";
import undoable, {
  combineFilters,
  excludeAction,
  includeAction,
} from "redux-undo";

const emptyPull = { id: 0, mobs: [] };

function newRouteName(routeName, dungeonName, savedRoutes) {
  const match = routeName.match(/(.*\s)(\d+)$/);
  const baseName = match?.[1] ?? routeName;
  const defaultNamesRoutes = savedRoutes.filter(
    (route) =>
      route.dungeonName === dungeonName && route.name.startsWith(baseName)
  );

  if (!defaultNamesRoutes.length) return routeName;

  const numbers = defaultNamesRoutes
    .map((route) => route.name.split(baseName)[1])
    .map(Number);

  const maxNumber = numbers.reduce((acc, cur) => (cur > acc ? cur : acc), 0);
  return baseName + " " + (maxNumber + 1).toString();
}

const makeEmptyRoute = (dungeonName, savedRoutes) => ({
  id: nanoid(),
  name: newRouteName("Default route", dungeonName, savedRoutes),
  dungeonName,
  selectedFloor: dungeonsByName[dungeonName].defaultFloor,
  pulls: [emptyPull],
  notes: [],
  drawings: [],
});

const savedRouteKey = "savedRoute";
const getSavedRouteKey = (routeId) => [savedRouteKey, routeId].join("-");
async function loadRouteFromStorage(routeId, dispatch) {
  const route = await localforage.getItem(getSavedRouteKey(routeId));
  if (route !== null) return route;

  const errorMessage =
    "Could not find route to load, removing from saved routes list.";
  console.error(errorMessage);
  dispatch(deleteSavedRoute(routeId));
  // TODO: send toast error message
  throw new Error(`Failed to load route ${routeId}`);
}

export const saveRoute = (route) =>
  localforage.setItem(getSavedRouteKey(route.id), route);

export const loadRoute = createAsyncThunk(
  "route/loadRoute",
  (routeId, thunkAPI) => {
    return loadRouteFromStorage(routeId, thunkAPI.dispatch);
  }
);

async function getLastDungeonRoute(dungeonName, savedRoutes, dispatch) {
  const dungeonRoutes = savedRoutes.filter((route) =>
    dungeonName ? route.dungeonName === dungeonName : true
  );

  if (dungeonRoutes.length) {
    return await loadRouteFromStorage(
      dungeonRoutes[dungeonRoutes.length - 1].id,
      dispatch
    );
  }

  return makeEmptyRoute(dungeonName, savedRoutes);
}

export const setDungeon = createAsyncThunk(
  "routes/setDungeon",
  async (dungeonName, thunkAPI) => {
    const state = thunkAPI.getState();

    return await getLastDungeonRoute(
      dungeonName,
      state.routes.present.savedRoutes,
      thunkAPI.dispatch
    );
  }
);

const defaultDungeon = "Ragefire Chasm";
export const initialState = {
  selectedRoute: makeEmptyRoute(defaultDungeon, []),
  savedRoutes: [],
};

const baseReducer = createAppSlice({
  name: "routes",
  initialState,
  reducers: {
    setFloor(state, { payload }) {
      state.selectedRoute.selectedFloor = payload;
    },
    newRoute(state, { payload: dungeonName }) {
      state.selectedRoute = makeEmptyRoute(
        dungeonName ?? state.selectedRoute.dungeonName,
        state.savedRoutes
      );
    },
    duplicateRoute(state) {
      state.selectedRoute.id = nanoid();
      state.selectedRoute.name = newRouteName(
        state.selectedRoute.name,
        state.selectedRoute.dungeonName,
        state.savedRoutes
      );
    },
    updateSavedRoutes(state) {
      const savedRoute = state.savedRoutes.find(
        (route) => route.id === state.selectedRoute.id
      );

      if (!savedRoute) {
        state.savedRoutes.push({
          id: state.selectedRoute.id,
          name: state.selectedRoute.name,
          dungeonName: state.selectedRoute.dungeonName,
        });
      } else if (savedRoute.name !== state.selectedRoute.name) {
        savedRoute.name = state.selectedRoute.name;
      }
    },
    removeInvalidMobs(state, { payload: invalidMobIds }) {
      state.selectedRoute.pulls = state.selectedRoute.pulls.map((pull) => ({
        ...pull,
        mobs: pull.mobs.filter((mobId) => !invalidMobIds.includes(mobId)),
      }));
    },
    deleteSavedRoute(state, { payload: routeId }) {
      state.savedRoutes = state.savedRoutes.filter(
        (route) => route.id !== routeId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDungeon.fulfilled, (state, { payload: route }) => {
      state.selectedRoute = route;
    });

    builder.addCase(loadRoute.fulfilled, (state, { payload: route }) => {
      state.selectedRoute = route;
    });
  },
});

const undoableReducer = undoable(baseReducer.reducer, {
  limit: 100,
  filter: combineFilters(
    includeAction([baseReducer.actions.newRoute.type]),
    excludeAction(["persist/PERSIST", "persist/REHYDRATE"])
  ),
});

export const routesReducer = persistReducer(
  {
    key: "routes",
    storage: indexedDbStorage,
    version: routePersistVersion,
    migrate: routeMigrate,
    serialize: false,
    deserialize: false,
  },
  undoableReducer
);

export const {
  setFloor,
  newRoute,
  duplicateRoute,
  updateSavedRoutes,
  removeInvalidMobs,
  deleteSavedRoute,
} = baseReducer.actions;
