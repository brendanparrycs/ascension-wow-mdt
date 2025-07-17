import { useRoute } from "../../../store/routes/routeHooks";
import Note from "./Note";

export default function Notes() {
  const route = useRoute();

  return route.notes.map((note, index) => (
    <Note key={index} index={index} note={note} />
  ));
}
