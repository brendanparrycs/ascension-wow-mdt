import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-leaflet";

export default function BossMarker({ position, iconSize, zIndexOffset }) {
  return (
    <Marker
      position={position}
      interactive={false}
      zIndexOffset={zIndexOffset}
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
