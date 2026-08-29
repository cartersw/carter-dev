import { useCallback, useEffect, useRef, useState } from "react";
import { COMMANDS } from "../constants/commands";
import {
  applyCommand,
  directoryAfterCommands,
} from "../lib/terminalCommands";
import { useTypewriter } from "./useTypewriter";

const DEFAULT_INTERVAL_MS = 40;
const CLS_INTERVAL_MS = 40;
const CLS_HOLD_MS = 50;

function isCls(command: string) {
  return command.trim().toLowerCase() === COMMANDS.CLS;
}

export function useCommandQueue(baseDirectory: string, intervalMs = DEFAULT_INTERVAL_MS) {
  const [queue, setQueue] = useState<string[]>([]);
  const [command, setCommand] = useState<string | null>(null);
  const [history, setHistory] = useState("");
  const [directory, setDirectory] = useState(baseDirectory);
  const typingInterval =
    command && isCls(command) ? CLS_INTERVAL_MS : intervalMs;
  const { displayText, finished: commandFinished } = useTypewriter(
    command,
    typingInterval
  );
  const snapshotRef = useRef({ command, queue, directory });
  snapshotRef.current = { command, queue, directory };

  const enqueue = useCallback((...commands: string[]) => {
    if (commands.length === 0) {
      return;
    }

    snapshotRef.current.queue = [...snapshotRef.current.queue, ...commands];
    setQueue((current) => [...current, ...commands]);
  }, []);

  const projectedDirectory = useCallback(() => {
    const snapshot = snapshotRef.current;
    const pending = snapshot.command
      ? [snapshot.command, ...snapshot.queue]
      : snapshot.queue;

    return directoryAfterCommands(
      snapshot.directory,
      pending,
      baseDirectory
    );
  }, [baseDirectory]);

  const reset = useCallback(() => {
    snapshotRef.current = {
      command: null,
      queue: [],
      directory: baseDirectory,
    };
    setQueue([]);
    setCommand(null);
    setHistory("");
    setDirectory(baseDirectory);
  }, [baseDirectory]);

  useEffect(() => {
    if (command !== null || queue.length === 0) {
      return;
    }

    const [next, ...rest] = queue;
    setCommand(next);
    setQueue(rest);
  }, [command, queue]);

  useEffect(() => {
    if (!commandFinished || !command) {
      return;
    }

    const finishedCommand = command;
    const holdMs = isCls(finishedCommand) ? CLS_HOLD_MS : 0;

    const timeout = setTimeout(() => {
      const result = applyCommand(finishedCommand, directory, baseDirectory);

      if (result.clearHistory) {
        setHistory("");
      } else {
        setHistory(
          (current) =>
            `${current}${directory}>${finishedCommand}\n${result.output}`
        );
      }

      setDirectory(result.directory);
      setCommand(null);
    }, holdMs);

    return () => clearTimeout(timeout);
  }, [commandFinished, command, directory, baseDirectory]);

  return {
    command,
    promptLine: displayText,
    history,
    directory,
    enqueue,
    projectedDirectory,
    reset,
  };
}
