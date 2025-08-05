import { AnimatePresence, motion } from "framer-motion";

export default function AbilityInfo({ ability, isExpanded }) {
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary rounded-b-md overflow-hidden"
        >
          <div className="p-1">
            <div className="flex items-center justify-between">
              <p>ID: {ability.id}</p>
              {ability.passive && <p>Passive</p>}
            </div>
            {ability.cost && <p>{ability.cost}</p>}
            <div className="flex items-center justify-between">
              <p>
                {!ability.castTime
                  ? "Instant cast"
                  : `${ability.castTime} cast`}
              </p>
              {ability.cooldown && <p>{ability.cooldown} cooldown</p>}
            </div>
            <p className="text-gold">{ability.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
