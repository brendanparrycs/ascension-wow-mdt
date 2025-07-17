import { useEffect } from "react";
import { saveRoute, updateSavedRoutes } from "../reducers/routesReducer";
import { useRoute } from "./routeHooks";
import { useAppDispatch } from "../storeUtil";

export default function SaveRoute() {
  const dispatch = useAppDispatch();
  const route = useRoute();

  // import route from url
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeId = urlParams.get("id");
    if (!routeId) return;

    // TODO: implement firestore logic to allow sharing routes
    window.history.pushState(null, "", window.location.origin);
  }, [dispatch]);

  // whenver route id or name changes, update saved routes
  useEffect(() => {
    dispatch(updateSavedRoutes());
  }, [dispatch, route.id, route.name]);

  // whenever route changes, save it
  useEffect(() => {
    saveRoute(route);
  }, [route]);

  return null;
}
