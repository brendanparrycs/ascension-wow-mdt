import { useEffect, useState } from "react";

export default function Delayed({ children, delay }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isShown ? children : null;
}
