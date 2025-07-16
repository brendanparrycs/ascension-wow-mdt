import { useMemo, useState } from "react";
import DungeonButton from "./DungeonButton";
import { useAppDispatch } from "../../store/storeUtil";
import {
  setSelectedDungeon,
  useDungeon,
} from "../../store/reducers/dungeonReducer";
import dungeons from "../../data/DungeonData/dungeons.json";
import TabCollapser from "../Common/TabCollapser";
import Tab from "../Common/Tab";

export default function DungeonSelection() {
  const dispatch = useAppDispatch();
  const dungeon = useDungeon();
  const [collapsed, setCollapsed] = useState(true);

  const selected = useMemo(
    () => dungeons.find(({ name }) => name === dungeon.name),
    [dungeon]
  );

  return (
    <div
      className={`fixed top-0 h-screen py-4 transition-all duration-500 ${
        collapsed ? "-left-72" : "left-0"
      }`}
    >
      <Tab
        className="max-h-[calc(100%-52px)] overflow-y-auto"
        side="left"
        style={{ direction: "rtl" }}
      >
        <TabCollapser
          direction="right"
          collapsed={collapsed}
          onClick={() => setCollapsed(!collapsed)}
        />
        <p className="font-bold text-2xl text-center pb-2 border-b border-primary">
          Select Dungeon
        </p>
        {dungeons.map((dungeon) => (
          <DungeonButton
            key={dungeon.name}
            selected={selected?.name === dungeon.name}
            dungeon={dungeon}
            onClick={() => dispatch(setSelectedDungeon(dungeon.name))}
          />
        ))}
      </Tab>
    </div>
  );
}
