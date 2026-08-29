import { useEffect, useState } from "react";

const CHARACTER_MS = 75;

/**
 * Reveals `text` one character at a time, padding the tail with `mask` so the
 * string keeps its original width while it decodes.
 */
export function useDecodeText(
  text: string,
  mask: string,
  intervalMs = CHARACTER_MS
) {
  const [revealed, setRevealed] = useState(0);
  const finished = revealed >= text.length;

  useEffect(() => {
    if (finished) {
      return;
    }

    const interval = setInterval(
      () => setRevealed((value) => value + 1),
      intervalMs
    );

    return () => clearInterval(interval);
  }, [finished, intervalMs]);

  const value = finished
    ? text
    : text.slice(0, revealed) +
      mask.slice(Math.floor((mask.length * revealed) / text.length));

  return { value, finished };
}
