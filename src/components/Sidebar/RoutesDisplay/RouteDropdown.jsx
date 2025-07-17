import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Button from "../../Common/Button";
import { useDungeonRoutes, useRoute } from "../../../store/routes/routeHooks";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../store/storeUtil";
import { loadRoute } from "../../../store/reducers/routesReducer";

export default function RouteDropdown() {
  const dispatch = useAppDispatch();
  const selectedRoute = useRoute();
  const routes = useDungeonRoutes(selectedRoute.dungeonName);

  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

  const onHover = useCallback(async (route) => {
    // TODO: set preview of route
  });

  const onClick = useCallback(async (route) => {
    // TODO: set preview of route to null
    dispatch(loadRoute(route.id));
    setIsExpanded(false);
  });

  return (
    <div className="relative">
      <Button
        className={`w-full h-8 flex justify-between items-center px-3 py-5 hover:border-gold !border ${
          !isExpanded ? "border-primary text-white" : ""
        }`}
        onClick={() => {
          if (routes.length <= 1) return;
          setIsExpanded(!isExpanded);
        }}
      >
        <p className="font-bold group-hover:text-primary transition-color duration-300">
          {selectedRoute.name}
        </p>
        <Icon className="w-8 h-8 group-hover:text-primary transition-color duration-300" />
      </Button>
      <AnimatePresence initial={false}>
        {isExpanded && routes.length > 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 4 }}
            transition={{ duration: 0.3 }}
            className="bg-primary w-full absolute left-0 top-full -translate-y-1 rounded-b-md border border-gold flex flex-col max-h-[205px] overflow-y-auto"
          >
            {routes.map((route, index) => {
              if (route.name === selectedRoute.name) return;

              return (
                <button
                  key={index}
                  className="font-bold border-b border-gold last:border-none px-3 py-2 text-left hover:bg-gold hover:text-primary transition-colors duration-300"
                  onClick={() => onClick(route)}
                >
                  {route.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
