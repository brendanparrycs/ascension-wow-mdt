import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import abilitiesData from "../../../data/DungeonData/abilities.json";
import { useEffect, useState } from "react";
import AbilityInfo from "./AbilityInfo";

// TODO: go through and get ability data for everything in-game
export default function Abilities({ mob }) {
  const [expandedAbilities, setExpandedAbilities] = useState({});

  useEffect(() => setExpandedAbilities({}), [mob]);

  const toggleInfo = (id) => {
    setExpandedAbilities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      {mob.abilities?.map((id) => {
        const ability = abilitiesData.find((a) => a.id === id);
        if (!ability) return null;

        const isExpanded = expandedAbilities[id];
        const Icon = isExpanded ? ChevronUpIcon : ChevronDownIcon;

        return (
          <div key={id} className="text-sm border border-gold rounded-md mt-1">
            <div
              className={`w-full rounded-md bg-primary flex justify-between items-center pr-1 border-gold ${
                isExpanded ? "border-b rounded-b-none" : "delay-300"
              }`}
            >
              <div className="flex gap-1 items-center">
                <img
                  className="w-8 rounded-l-md cursor-pointer"
                  src={`Abilities/${id}.jpg`}
                  onClick={() =>
                    window.open(
                      `https://db.ascension.gg/?spell=${id}`,
                      "_blank"
                    )
                  }
                />
                <p>{ability.name}</p>
              </div>
              <Icon
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleInfo(id)}
              />
            </div>
            <AbilityInfo ability={ability} isExpanded={isExpanded} />
          </div>
        );
      })}
    </div>
  );
}
