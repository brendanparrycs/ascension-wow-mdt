import BackgroundVideo from "./Common/BackgroundVideo";
import Map from "./Map/Map";
import DungeonSelection from "./DungeonSelection/DungeonSelection";

export default function Page() {
  return (
    <div className="w-screen h-screen relative">
      <BackgroundVideo />
      <Map />
      <DungeonSelection />
    </div>
  );
}
