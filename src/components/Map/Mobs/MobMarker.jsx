import { divIcon } from "leaflet";
import { getMobForces, mobScale } from "../../../util/mobs";
import { memo, useMemo } from "react";
import { Marker } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { defaultIconSize, wowToLeafletCoords } from "../../../util/map";
import BossMarker from "./BossMarker";
import Delayed from "../../Common/Delayed";
import MobTooltip from "./MobTooltip";
import { useMapObjectsHidden } from "../../../store/reducers/mapReducer";
import { useAppDispatch } from "../../../store/storeUtil";
import {
  hoverMob,
  selectMob,
  useHoveredMob,
} from "../../../store/reducers/hoverReducer";

// TODO: space mobs out a little to make it look better on map
// TODO: add mob pats
// TODO: add packs (G...)
function MobMarkerComponent({ mob, mobInfo, mobKey, hidden, isHovered }) {
  const dispatch = useAppDispatch();

  const iconSize = defaultIconSize * mobScale(mobInfo) * (isHovered ? 1.15 : 1);
  const position = wowToLeafletCoords(mob.position);

  const eventHandlers = useMemo(
    () => ({
      click: () => console.log("click"),
      contextmenu: () => dispatch(selectMob(mob)),
      mouseover: () => dispatch(hoverMob(mobKey)),
      mouseout: () => dispatch(hoverMob(null)),
    }),
    [dispatch, mobKey]
  );

  const mobIcon = useMemo(
    () => (
      <div className="w-full h-full p-[1px] rounded-full bg-gradient-to-b from-[#dfdfe3] to-[#373738] mob-shadow transition-all">
        <img
          className="w-full h-full rounded-full"
          src={`/NPCPortraits/${mob.id}.png`}
        />
        {mobInfo.classification !== "Boss" && isHovered && (
          <p className="w-full h-full flex items-center justify-center absolute top-0 left-0 text-white font-bold text-outline">
            {getMobForces(mobInfo)}
          </p>
        )}
      </div>
    ),
    [mob.id, isHovered, mobInfo]
  );

  const icon = useMemo(() => {
    return divIcon({
      className: "bg-transparent",
      tooltipAnchor: [iconSize / 2, 0],
      iconUrl: `/NPCPortraits/${mob.id}.png`,
      iconSize: [iconSize, iconSize],
      html: renderToString(mobIcon),
    });
  }, [mob.id, iconSize, mobIcon]);

  return (
    <>
      <Marker
        key={mobKey}
        position={position}
        icon={icon}
        eventHandlers={eventHandlers}
        zIndexOffset={isHovered ? 1000 : 0}
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
          zIndexOffset={isHovered ? 1000 : 0}
          hidden={hidden}
        />
      )}
    </>
  );
}

const MobMarkerMemo = memo(MobMarkerComponent);

export default function MobMarker({ mob, mobInfo, mobKey }) {
  const hidden = useMapObjectsHidden(0, 100);
  const hoveredMob = useHoveredMob();

  const isHovered = !!hoveredMob && hoveredMob === mobKey;

  return (
    <MobMarkerMemo
      mob={mob}
      mobInfo={mobInfo}
      mobKey={mobKey}
      hidden={hidden}
      isHovered={isHovered}
    />
  );
}
