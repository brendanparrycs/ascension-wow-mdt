import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-leaflet";

export default function BossMarker({
  position,
  iconSize,
  // zIndexOffset,
  // hidden,
}) {
  return (
    <Marker
      position={position}
      interactive={false}
      // zIndexOffset={zIndexOffset}
      // opacity={hidden ? 0 : 1}
      icon={divIcon({
        className: "bg-transparent",
        iconSize: iconSize,
        html: renderToStaticMarkup(
          <img
            className="w-[165%] h-[165%] absolute -top-[35%] -left-[50%] bg-contain"
            src="/images/elite.png"
          />
        ),
      })}
    />
  );
}
