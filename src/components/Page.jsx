import BackgroundVideo from "./Common/BackgroundVideo";
import Map from "./Map/Map";

export default function Page() {
  return (
    <div className="relative w-screen h-screen">
      <BackgroundVideo />
      <Map />
      {/* <SelectDungeonButton />
      <RouteDetails /> */}
    </div>
  );
}
