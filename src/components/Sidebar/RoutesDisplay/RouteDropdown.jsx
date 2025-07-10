import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Button from "../../Common/Button";

export default function RouteDropdown() {
  return (
    <Button className="w-full h-8 flex justify-between items-center px-3 py-5">
      <p className="font-bold group-hover:text-primary transition-color duration-300">
        Default route
      </p>
      <ChevronDownIcon className="w-8 h-8 group-hover:text-primary transition-color duration-300" />
    </Button>
  );
}
