import TabCollapser from "../../Common/TabCollapser";
import Tab from "../../Common/Tab";
import RouteUtilityButton from "./RouteUtilityButton";
import RouteDropdown from "./RouteDropdown";

export default function RoutesDisplay({ collapsed, setCollapsed }) {
  return (
    <Tab className="gap-2" side="right">
      <TabCollapser
        direction="left"
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      />
      <RouteDropdown />
      <div className="w-full flex justify-between items-center gap-2">
        <RouteUtilityButton role="rename" />
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
