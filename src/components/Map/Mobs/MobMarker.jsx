import { divIcon } from "leaflet";
import { mobScale, wowToLeafletCoords } from "../../../util/mobs";
import { memo, useMemo } from "react";
import { Marker } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { defaultIconSize } from "../../../util/map";
import BossMarker from "./BossMarker";

// TODO: add more customization to mob markers (hovering, selecting, etc)
// TODO: add scaling to mob markers (bosses, hovering, selecting, etc)
// TODO: space mobs out a little to make it look better on map
function MobSpawnComponent({ mob, mobInfo }) {
  const iconSize = defaultIconSize * mobScale(mobInfo);
  const position = wowToLeafletCoords(mob.position);

  const mobIcon = useMemo(
    () => (
      <div className="w-full h-full p-[1px] rounded-full bg-gradient-to-b from-[#dfdfe3] to-[#373738] mob-shadow">
        <img
          className="w-full h-full rounded-full"
          src={`/NPCPortraits/${mob.id}.png`}
        />
      </div>
    ),
    [mob.id]
  );

  const icon = useMemo(() => {
    return divIcon({
      className: "bg-transparent",
      iconSize: iconSize,
      html: renderToString(mobIcon),
    });
  }, [iconSize, mobIcon]);

  return (
    <>
      <Marker position={position} icon={icon} />
      {mobInfo.isBoss && <BossMarker position={position} iconSize={iconSize} />}
    </>
  );
}

const MobSpawnMemo = memo(MobSpawnComponent);

export default function MobMarker({ mob, mobInfo }) {
  return <MobSpawnMemo mob={mob} mobInfo={mobInfo} />;
}
