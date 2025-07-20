import {
  ArrowPathIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  defaultDungeonName,
  deleteRoute,
  newRoute,
} from "../../store/reducers/routesReducer";
import { useAppDispatch, useRootSelector } from "../../store/storeUtil";
import { isDev } from "../../util/dev";
import Button from "./Button";

export default function ErrorPage({ errors }) {
  const dispatch = useAppDispatch();
  const rootState = useRootSelector((state) => state);
  const route = rootState?.routes?.present?.route;

  const reloadPage = () => {
    setTimeout(() => window.location.reload(), 500);
  };

  const createEmptyRoute = () => {
    dispatch(newRoute(route?.dungeonName ?? defaultDungeonName));
    reloadPage();
  };

  const deleteRouteClick = () => {
    dispatch(deleteRoute());
    reloadPage();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-primary bg-[url(AscensionAssets/ascension_background_2.webp)] bg-fill">
      <div className="flex flex-col justify-center items-center gap-4 w-[700px] bg-primary h-fit rounded-md border border-primary p-8">
        <p className="text-5xl text-center w-full">Whoops! Something broke.</p>
        <section className="flex flex-col gap-2 text-xl text-white border-y border-primary py-4">
          <p>Sorry, there was an error loading the page.</p>
          <p>There could be something wrong with the currently loaded route.</p>
          <p>
            Try reloading the page, creating a new empty route, or permanently
            deleting the route.
          </p>
          <p>
            If that doesn't work, you may have to purge your local site data
            completely.
          </p>
        </section>
        <section className="flex flex-col gap-4 text-white">
          <p className="text-center text-gold text-2xl">
            Current route name: {route?.name ?? "Unknown"}
          </p>
          {isDev && errors[0] && (
            <div className="text-sm">
              {errors[0].error.name}: {errors[0].error.message}
              {errors[0].info.componentStack &&
                errors[0].info.componentStack
                  .split("\n")
                  .map((text, index) => <p key={index}>{text}</p>)}
            </div>
          )}
          <div className="flex flex-row justify-center gap-4 text-base text-gold">
            <Button
              className="p-2 hover:text-primary flex gap-1 items-center"
              onClick={reloadPage}
            >
              <ArrowPathIcon className="w-5 h-5" />
              <p>Reload page</p>
            </Button>
            <Button
              className="p-2 hover:text-primary flex gap-1 items-center"
              onClick={createEmptyRoute}
            >
              <PlusCircleIcon className="w-5 h-5" />
              <p>Create empty route</p>
            </Button>
            <Button
              className="p-2 hover:text-primary flex gap-1 items-center"
              onClick={deleteRouteClick}
            >
              <TrashIcon className="w-5 h-5" />
              <p>Delete route</p>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
