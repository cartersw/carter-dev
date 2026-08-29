import { useEffect, useState } from "react";
import {
  advance,
  isFinished,
  START,
  visibleCommands,
  type TerminalCommand,
  type TerminalProgress,
} from "../lib/terminal";

const CHARACTER_MS = 40;
const COMMAND_PAUSE_MS = 350;

/**
 * Types out a list of commands one character at a time. Appending commands
 * keeps the session going; a new `key` on the consumer restarts it.
 */
export function useTerminalScript(commands: TerminalCommand[]) {
  const [progress, setProgress] = useState<TerminalProgress>(START);
  const finished = isFinished(progress, commands);
  const current = commands[progress.index];

  useEffect(() => {
    if (!current) {
      return;
    }

    const delay =
      progress.typed >= current.input.length ? COMMAND_PAUSE_MS : CHARACTER_MS;

    const timer = setTimeout(
      () => setProgress((value) => advance(value, commands)),
      delay
    );

    return () => clearTimeout(timer);
  }, [commands, current, progress.typed]);

  return {
    completed: visibleCommands(progress, commands),
    directory: (current ?? commands[commands.length - 1])?.directory ?? "",
    typed: current ? current.input.slice(0, progress.typed) : "",
    finished,
  };
}
