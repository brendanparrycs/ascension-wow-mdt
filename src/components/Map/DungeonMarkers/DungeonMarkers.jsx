import {
  setSelectedFloor,
  useDungeon,
  useFloor,
} from "../../../store/reducers/dungeonReducer";
import DungeonMarker from "./DungeonMarker";
import { useAppDispatch } from "../../../store/storeUtil";
import { wowToLeafletCoords } from "../../../util/map";

export default function DungeonMarkers() {
  const dispatch = useAppDispatch();
  const dungeon = useDungeon();
  const floor = useFloor();

  const entranceVisible =
    dungeon.entrance?.floor === floor || !dungeon.entrance?.floor;

  const floorData = dungeon.floors?.find((f) => f.name === floor);

  return (
    <>
      {entranceVisible && dungeon.entrance?.position && (
        <DungeonMarker
          key="Entrance"
          tooltipText="Entrance"
          position={wowToLeafletCoords(dungeon.entrance.position)}
          src="images/dungeon_entrance.png"
        />
      )}
      {floorData?.entrances?.map((entrance, index) => (
        <DungeonMarker
          key={index}
          tooltipText={entrance.toFloor}
          position={wowToLeafletCoords(entrance.position)}
          src="images/floor_entrance.png"
          eventHandlers={{
            click: () => dispatch(setSelectedFloor(entrance.toFloor)),
          }}
        />
      ))}
    </>
  );
}
