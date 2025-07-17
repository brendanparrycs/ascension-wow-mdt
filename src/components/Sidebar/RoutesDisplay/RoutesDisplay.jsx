import TabCollapser from "../../Common/TabCollapser";
import Tab from "../../Common/Tab";
import RouteUtilityButton from "./RouteUtilityButton";
import RouteDropdown from "./RouteDropdown";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../store/storeUtil";
import { setName } from "../../../store/reducers/routesReducer";
import { useRoute } from "../../../store/routes/routeHooks";

export default function RoutesDisplay({ collapsed, setCollapsed }) {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const [isRenaming, setIsRenaming] = useState(false);
  const [input, setInput] = useState("");

  const close = useCallback(() => {
    dispatch(setName(input));
    setIsRenaming(false);
  }, [dispatch, input, setIsRenaming]);

  const open = useCallback(() => {
    setInput(route.name);
    setIsRenaming(true);
  }, [route.name, setIsRenaming]);

  const onClickRename = useCallback(() => {
    if (isRenaming) close();
    else open();
  }, [isRenaming, close, open]);

  return (
    <Tab className="!gap-2" side="right">
      <TabCollapser
        direction="left"
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      />
      {isRenaming ? (
        <input
          type="text"
          className="bg-primary border border-primary rounded-md h-[42px] px-3 font-bold text-white transition-colors duration-300 placeholder-gold"
          placeholder="Route name"
          onKeyDown={(e) => e.key === "Enter" && close()}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          autoFocus
        />
      ) : (
        <RouteDropdown />
      )}
      <div className="w-full flex justify-between items-center gap-2">
        <RouteUtilityButton
          role="rename"
          isRenaming={isRenaming}
          onClickRename={onClickRename}
        />
        <RouteUtilityButton role="new" />
        <RouteUtilityButton role="duplicate" />
        <RouteUtilityButton role="delete" />
      </div>
      <RouteUtilityButton role="share">
        <p className="transition-colors duration-300 group-hover:text-primary">
          Share
        </p>
      </RouteUtilityButton>
    </Tab>
  );
}
