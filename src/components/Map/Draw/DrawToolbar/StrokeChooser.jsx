import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../Common/Button";
import WeightIcon from "../../../Common/Icons/WeightIcon";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../store/storeUtil";
import { setStroke } from "../../../../store/reducers/mapReducer";

const strokes = [1, 2, 4, 8, 12, 24];

export default function StrokeChooser({ openChooser, setOpenChooser }) {
  const dispatch = useAppDispatch();
  const isOpen = openChooser === "stroke";

  const onSelectStroke = useCallback(
    (newStroke) => {
      setOpenChooser(null);
      dispatch(setStroke(newStroke));
    },
    [dispatch, setOpenChooser]
  );

  return (
    <div className="w-12">
      <Button
        className={`font-bold h-12 p-2 hover:text-primary ${
          isOpen ? "text-primary !bg-gold rounded-b-none" : "hover:text-primary"
        }`}
        onClick={() => setOpenChooser(isOpen ? null : "stroke")}
      >
        <WeightIcon className="w-full h-full" />
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary rounded-b-md overflow-hidden border-2 border-gold border-t-0"
          >
            {strokes.map((stroke) => (
              <p
                key={stroke}
                className="text-center border-b-2 border-gold p-1 last:border-0 cursor-pointer hover:bg-gold hover:text-primary transition-colors duration-300 font-bold"
                onClick={() => onSelectStroke(stroke)}
              >
                {stroke}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
