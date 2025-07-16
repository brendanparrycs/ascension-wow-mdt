import { useCallback } from "react";
import useShortcut from "../../../util/hooks/useShortcut";
import ShortcutsList from "./ShortcutsList";
import TextSection from "./TextSection";
import { shortcuts } from "../../../data/shortcuts";
import Button from "../../Common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const basicsText = `Click on mobs to add them one group at a time to your current pull.
Your selected pulls will appear in the right sidebar.
Right-click (or tap and hold on mobile) to insert or remove pulls.
Use the dropdowns at the top to choose a dungeon and route.
All changes are saved automatically in your browser.
`;

const notesText = `Right-click on the map to place a note.
Once placed, left-click to edit the note or drag it to reposition.`;

export default function HelpModal({ onClose }) {
  const onEscape = useCallback(() => onClose(), [onClose]);
  useShortcut(shortcuts.cancel, onEscape);

  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-primary bg-opacity-80 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[775px] max-h-full relative bg-[url(AscensionAssets/ascension_background_1.webp)] bg-cover border border-primary rounded-md bg-primary p-4 flex flex-col gap-4 max-[800px]:w-full max-[800px]:border-none max-[800px]:rounded-none max-[800px]:overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute top-3 right-4 w-10 h-10 hover:text-primary p-1 hidden max-[800px]:block"
          onClick={onClose}
        >
          <XMarkIcon />
        </Button>
        <p className="text-center font-bold text-2xl pb-4 border-b border-primary">
          Help
        </p>
        <div className="flex gap-4 max-[800px]:flex-col">
          <section className="w-full flex flex-col gap-4">
            <TextSection title="Basics" text={basicsText} />
            <TextSection title="Notes" text={notesText} />
          </section>
          <section className="w-full flex flex-col gap-4">
            <TextSection
              className="flex flex-col gap-1"
              title="Shortcuts"
              text={<ShortcutsList />}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
