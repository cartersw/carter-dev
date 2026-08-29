export type TerminalCommand = {
  directory: string;
  input: string;
  output?: string;
  /** Wipes everything above this command once it finishes typing. */
  clears?: boolean;
};

export type TerminalProgress = {
  index: number;
  typed: number;
};

export const START: TerminalProgress = { index: 0, typed: 0 };

export function isFinished(
  progress: TerminalProgress,
  commands: TerminalCommand[]
): boolean {
  return progress.index >= commands.length;
}

/** The finished commands still on screen, i.e. those after the last wipe. */
export function visibleCommands(
  progress: TerminalProgress,
  commands: TerminalCommand[]
): TerminalCommand[] {
  const completed = commands.slice(0, progress.index);

  for (let index = completed.length - 1; index >= 0; index--) {
    if (completed[index].clears) {
      return completed.slice(index + 1);
    }
  }

  return completed;
}

export function advance(
  progress: TerminalProgress,
  commands: TerminalCommand[]
): TerminalProgress {
  const command = commands[progress.index];

  if (!command) {
    return progress;
  }

  if (progress.typed < command.input.length) {
    return { index: progress.index, typed: progress.typed + 1 };
  }

  return { index: progress.index + 1, typed: 0 };
}
