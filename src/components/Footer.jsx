import { useCallback, useState } from "react";
import Button from "./Common/Button";
import GithubIcon from "./Common/Icons/GithubIcon";
import TwitchIcon from "./Common/Icons/TwitchIcon";
import HelpModal from "./Modals/HelpModal/HelpModal";
import useShortcut from "../util/hooks/useShortcut";
import { shortcuts } from "../data/shortcuts";
import DiscordIcon from "./Common/Icons/DiscordIcon";

export default function Footer() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const onHelp = useCallback(() => setHelpModalOpen(true), []);
  useShortcut(shortcuts.help, onHelp);

  return (
    <>
      <div className="p-2 fixed bottom-0 flex gap-2">
        <Button
          className="font-bold w-12 h-12 hover:text-primary p-2"
          onClick={() => window.open("https://discord.gg/m7mXnZfEWa", "_blank")}
        >
          <DiscordIcon className="w-full h-full" />
        </Button>
        <Button
          className="font-bold w-12 h-12 hover:text-primary p-2"
          onClick={() =>
            window.open("https://www.twitch.tv/poahbrew", "_blank")
          }
        >
          <TwitchIcon className="w-full h-full" />
        </Button>
        <Button
          className="font-bold w-12 h-12 hover:text-primary p-2"
          onClick={() =>
            window.open(
              "https://github.com/brendanparrycs/ascension-wow-mdt",
              "_blank"
            )
          }
        >
          <GithubIcon className="w-full h-full" />
        </Button>
        <Button
          className="font-bold h-12 hover:text-primary px-3"
          onClick={() => setHelpModalOpen(true)}
        >
          Help
        </Button>
      </div>
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}
    </>
  );
}
