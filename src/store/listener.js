import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import { ActionCreators } from "redux-undo";
import {
  duplicateRoute,
  loadRoute,
  newRoute,
  removeInvalidMobs,
  setDungeon,
  updateSavedRoutes,
} from "./reducers/routesReducer";
import { dungeonsByName } from "../util/dungeons";

export const listenerMiddleware = createListenerMiddleware();

// on rehydrate, clear history
listenerMiddleware.startListening({
  type: REHYDRATE,
  effect: async (_, listenerApi) =>
    listenerApi.dispatch(ActionCreators.clearHistory()),
});

// on new route, clear history and save saved routes
listenerMiddleware.startListening({
  matcher: isAnyOf(
    setDungeon.fulfilled,
    loadRoute.fulfilled,
    newRoute,
    duplicateRoute
  ),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(updateSavedRoutes());
    listenerApi.dispatch(ActionCreators.clearHistory());
  },
});

// on load route, verify mobs
listenerMiddleware.startListening({
  matcher: isAnyOf((action) => action.type === REHYDRATE, loadRoute.fulfilled),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const route = state.routes.present.selectedRoute;
    if (!route) return;

    const dungeon = dungeonsByName[route.dungeon];
    if (!dungeon) return;

    const missingIds = [];
    for (const pull of route.pulls) {
      for (const mobId of pull.mobs) {
        const mob = null; // find mob from .json
        if (mob) continue;

        missingIds.push(mobId);
      }
    }

    if (missingIds.length === 0) return;
    console.error(
      `Found invalid mobIds in current route: ${missingIds.join(",")}`
    );

    listenerApi.dispatch(removeInvalidMobs(missingIds));
    // TODO: send toast error message
    listenerApi.dispatch(ActionCreators.clearHistory());
  },
});
