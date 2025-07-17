import { isMobile } from "react-device-detect";
import { Tooltip } from "react-leaflet";
import { getMobForces, mobScale } from "../../../util/mobs";
import { roundTwoDecimals } from "../../../util/math";

const requiredForces = 206; // TODO: make this change based on selected dungeon

export default function MobTooltip({ mobInfo, mobKey }) {
  if (isMobile) return null;
  const forces = getMobForces(mobInfo);
  const percentForces = (forces / requiredForces) * 100;

  return (
    <Tooltip key={mobKey} className="map-tooltip" direction="right">
      <p className="font-bold">{mobKey || mobInfo.name}</p>
      {mobInfo.classification !== "Boss" && (
        <p>
          Forces: {forces} | {roundTwoDecimals(percentForces)}%
        </p>
      )}
      <p className="text-xxs text-gold">[Right click for more info]</p>
    </Tooltip>
  );
}
