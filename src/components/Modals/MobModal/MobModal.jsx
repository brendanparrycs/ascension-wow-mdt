import {
  selectedSelectedMob,
  selectMob,
} from "../../../store/reducers/hoverReducer";
import { useAppDispatch, useRootSelector } from "../../../store/storeUtil";
import mobs from "../../../data/DungeonData/mobs.json";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { numberToString } from "../../../util/math";
import Abilities from "./Abilities";

export default function MobModal() {
  const dispatch = useAppDispatch();
  const selectedMob = useRootSelector(selectedSelectedMob);
  if (selectedMob === null) return;

  const mob = mobs.find((m) => m.id === selectedMob.id);

  return (
    <div className="w-80 bg-primary bg-[url(AscensionAssets/ascension_background_1.webp)] bg-cover border border-primary rounded-md fixed bottom-2 right-2 p-2 text-white max-h-[215px] overflow-y-auto rounded-r-scrollbar">
      <div className="flex justify-between items-center text-gold">
        <button
          className="text-xl font-bold"
          onClick={() =>
            window.open(`https://db.ascension.gg/?npc=2${mob.id}`, "_blank")
          }
        >
          {mob.name}
        </button>
        <XMarkIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => dispatch(selectMob(null))}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>{mob.type}</p>
        <p>ID: {mob.id}</p>
      </div>
      <p>Base HP: {numberToString(mob.baseHP)}</p>
      <Abilities mob={mob} />
    </div>
  );
}
