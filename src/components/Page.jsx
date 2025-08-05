import BackgroundVideo from "./Common/BackgroundVideo";
import Map from "./Map/Map";
import DungeonSelection from "./DungeonSelection/DungeonSelection";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";
import MobModal from "./Modals/MobModal/MobModal";
import SaveRoute from "../store/routes/SaveRoute";
import Header from "./Header";

// TODO: make it so only one side tab can be opened at a time if window width is
// less than two tabs (w-72 * 2)
export default function Page() {
  return (
    <div className="w-screen h-screen relative">
      <BackgroundVideo />
      <Map />
      <DungeonSelection />
      <Sidebar />
      <Footer />
      <MobModal />
      <SaveRoute />
      <Header />
    </div>
  );
}
