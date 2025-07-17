import { useLayoutEffect, useState } from "react";

const noOp = () => {};

export default function makeUseExclusiveState(defaultValue) {
  let setLastUsedState = noOp;

  return () => {
    const [state, setState] = useState(defaultValue);

    useLayoutEffect(() => {
      if (state && setLastUsedState !== setState) {
        setLastUsedState(defaultValue);
        setLastUsedState = setState;
      }

      return () => {
        if (setLastUsedState === setState) {
          setLastUsedState = noOp;
        }
      };
    }, [state, setState]);

    return [state, setState];
  };
}
