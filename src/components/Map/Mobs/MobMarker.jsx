import { divIcon } from "leaflet";
import { mobScale, wowToLeafletCoords, getMobForces } from "../../../util/mobs";
import { memo, useMemo } from "react";
import { Marker } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { defaultIconSize } from "../../../util/map";
import BossMarker from "./BossMarker";
import Delayed from "../../Common/Delayed";
import MobTooltip from "./MobTooltip";
import { useMapObjectsHidden } from "../../../store/reducers/mapReducer";
import { useDispatch } from "react-redux";

// TODO: add packs (G...)
// TODO: add more customization to mob markers (selecting, etc)
// TODO: add scaling to mob markers (selecting, etc)
// TODO: space mobs out a little to make it look better on map
function MobMarkerComponent({ mob, mobInfo, mobKey, hidden }) {
  // const iconSize = defaultIconSize * mobScale(mobInfo) * (isHovered ? 1.15 : 1);
  const iconSize = defaultIconSize * mobScale(mobInfo);
  const position = wowToLeafletCoords(mob.position);

  // const eventHandlers = useMemo(
  //   () => ({
  //     mouseover: () => dispatch(hoverMob(mobKey || mobInfo.name)),
  //     mouseout: (e) => {
  //       const target = e.originalEvent.target;
  //       target.blur();
  //       dispatch(hoverMob(null));
  //     },
  //   }),
  //   [dispatch, mobKey, mobInfo.name]
  // );

  const mobIcon = useMemo(
    () => (
      <div className="w-full h-full p-[1px] rounded-full bg-gradient-to-b from-[#dfdfe3] to-[#373738] mob-shadow">
        <img
          className="w-full h-full rounded-full"
          src={`/NPCPortraits/${mob.id}.png`}
        />
        {/* {mobInfo.classification !== "Boss" && isHovered && (
          <p className="w-full h-full flex items-center justify-center absolute top-0 left-0 text-white font-bold text-outline">
            {getMobForces(mobInfo)}
          </p>
        )} */}
      </div>
    ),
    // [mob.id, isHovered, mobInfo]
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
      <Marker
        position={position}
        icon={icon}
        // eventHandlers={eventHandlers}
        // zIndexOffset={isHovered ? 1000 : 0}
        opacity={hidden ? 0 : 1}
      >
        <Delayed delay={300}>
          <MobTooltip mobInfo={mobInfo} mobKey={mobKey} />
        </Delayed>
      </Marker>
      {mobInfo.classification === "Boss" && (
        <BossMarker
          position={position}
          iconSize={iconSize}
          // zIndexOffset={isHovered ? 1000 : 0}
          hidden={hidden}
        />
      )}
    </>
  );
}

const MobMarkerMemo = memo(MobMarkerComponent);

export default function MobMarker({ mob, mobInfo, mobKey }) {
  const hidden = useMapObjectsHidden(0, 100);

  return (
    <MobMarkerMemo
      mob={mob}
      mobInfo={mobInfo}
      mobKey={mobKey}
      hidden={hidden}
    />
  );
}
