import { useEffect, useRef, useState } from "react";

/**
 * Tracks an element's rendered height so a collapsed parent can transition to
 * it. CSS cannot animate to `auto`, and the height changes as content is typed
 * in, so the measurement has to stay live.
 */
export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    // ResizeObserver reports the current size as soon as it starts observing,
    // so there is no need to measure up front.
    const observer = new ResizeObserver(() => setHeight(element.offsetHeight));
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
