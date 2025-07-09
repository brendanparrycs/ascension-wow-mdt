import { useMemo, useState } from "react";
import DungeonButton from "./DungeonButton";
import DungeonCollapser from "./DungeonCollapser";
import { useAppDispatch } from "../../store/storeUtil";
import {
  setSelectedDungeon,
  useDungeon,
} from "../../store/reducers/dungeonReducer";
import dungeons from "../../data/DungeonData/dungeons.json";

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
      className={`fixed ${collapsed ? "-left-72" : "left-0"} top-0 h-screen py-4 transition-all duration-500`}
    >
      <div
        className="w-72 max-h-full bg-primary rounded-r-md border-2 border-l-0 border-primary p-4 flex flex-col gap-4 overflow-y-auto"
        style={{ direction: "rtl" }}
      >
        <DungeonCollapser
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
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
      </div>
    </div>
  );
}
