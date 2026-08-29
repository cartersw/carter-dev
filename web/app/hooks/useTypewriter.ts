import { useEffect, useState } from "react";

export function typeText(
  text: string,
  onUpdate: (value: string) => void,
  intervalMs: number,
  onComplete?: () => void
): () => void {
  if (text.length === 0) {
    onUpdate("");
    onComplete?.();
    return () => {};
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    onUpdate(text.slice(0, progress));

    if (progress >= text.length) {
      clearInterval(interval);
      onComplete?.();
    }
  }, intervalMs);

  return () => clearInterval(interval);
}

export function useTypewriter(
  text: string | null | undefined,
  intervalMs: number = 80
) {
  const [displayText, setDisplayText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      setFinished(false);
      return;
    }

    setDisplayText("");
    setFinished(false);

    return typeText(text, setDisplayText, intervalMs, () => setFinished(true));
  }, [text, intervalMs]);

  return { displayText, finished };
}
