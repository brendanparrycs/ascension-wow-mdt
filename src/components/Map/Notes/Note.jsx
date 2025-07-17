import { divIcon } from "leaflet";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { useMapObjectsHidden } from "../../../store/reducers/mapReducer";
import { defaultIconSize, latLngToPoint } from "../../../util/map";
import { useAppDispatch } from "../../../store/storeUtil";
import {
  deleteNote,
  editNote,
  moveNote,
} from "../../../store/reducers/routesReducer";
import useContextMenu from "../../../util/hooks/useContextMenu";
import NoteButton from "./NoteButton";

const minWidth = 180;
const minHeight = 96;
const iconSize = defaultIconSize * 0.75;

function NoteComponent({ index, note }) {
  const dispatch = useAppDispatch();
  const hidden = useMapObjectsHidden(0, 100);
  const { contextMenuPosition, onRightClick, onClose } = useContextMenu({
    minWidth,
    minHeight,
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [input, setInput] = useState(note.text);
  const markerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (input !== note.text && !popupOpen) setInput(note.text);
  }, [input, note.text, popupOpen]);

  useEffect(() => {
    if (!note.justAdded) return;
    setTimeout(() => markerRef.current?.openPopup(), 0);
    dispatch(editNote({ index, changes: { justAdded: false } }));
  }, [dispatch, index, note.justAdded]);

  const markerEventHandlers = useMemo(
    () => ({
      click: () => inputRef.current?.focus(),
      dragend: (e) =>
        dispatch(
          editNote({
            index,
            changes: {
              position: latLngToPoint(e.target.getLatLng()),
            },
          })
        ),
      contextmenu: (e) => {
        onRightClick(e.originalEvent);
        e.originalEvent.stopPropagation();
      },
    }),
    [dispatch, index, onRightClick]
  );

  const popupEventHandlers = useMemo(
    () => ({
      add: () => setPopupOpen(true),
      remove: () => {
        setPopupOpen(false);
        dispatch(editNote({ index, changes: { text: input } }));
      },
    }),
    [dispatch, input, index]
  );

  const icon = useMemo(() => {
    return divIcon({
      className: "bg-transparent",
      tooltipAnchor: [iconSize / 2, 0],
      iconSize: [iconSize, iconSize],
      html: renderToString(
        <div
          className={`w-full h-full bg-gradient-to-br from-[#ffd416] to-[#8f7100] shadow-2xl text-black border border-black rounded-full flex items-center justify-center text-xs font-serif ${
            hidden ? "opacity-0" : "opacity-100"
          }`}
          style={{
            boxShadow: "black 0px 0px 10px 0px",
            textShadow: "-2px 2px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          {index + 1}
        </div>
      ),
    });
  }, [hidden]);

  return (
    <>
      <Marker
        ref={markerRef}
        position={note.position}
        zIndexOffset={9999}
        icon={icon}
        eventHandlers={markerEventHandlers}
        draggable={true}
      >
        {!popupOpen && note.text && (
          <Tooltip key={index} className="map-tooltip" direction="right">
            {note.text}
          </Tooltip>
        )}
        <Popup
          minWidth={256}
          closeButton={false}
          eventHandlers={popupEventHandlers}
        >
          <textarea
            ref={inputRef}
            className="w-full min-h-24 text-xs resize-none bg-primary rounded-md border border-primary text-white p-2 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") markerRef.current?.closePopup();
            }}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoFocus
          />
        </Popup>
      </Marker>
      {contextMenuPosition && (
        <div
          className="bg-primary bg-[url(AscensionAssets/ascension_background_1.webp)] bg-cover rounded-md border border-primary p-2 fixed z-[9999] flex flex-col gap-2"
          style={{ minWidth, minHeight, ...contextMenuPosition }}
        >
          <NoteButton
            text="Delete note"
            onClick={() => dispatch(deleteNote(index))}
            onClose={onClose}
          />
          <NoteButton
            text="Move up"
            onClick={() => dispatch(moveNote({ index, indexChange: -1 }))}
            onClose={onClose}
          />
          <NoteButton
            text="Move down"
            onClick={() => dispatch(moveNote({ index, indexChange: 1 }))}
            onClose={onClose}
          />
        </div>
      )}
    </>
  );
}

const Note = memo(NoteComponent);
export default Note;
