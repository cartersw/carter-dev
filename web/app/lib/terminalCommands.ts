import { COMMANDS, parseCommand } from "../constants/commands";

export type TerminalState = {
  terminalHistory: string;
  activeDirectory: string;
  activeSection: string | null;
};

export type CommandExecution = {
  state: Partial<TerminalState>;
  nextCommand: string | null;
};

function appendCommandLine(
  history: string,
  directory: string,
  command: string
): string {
  return `${history}${directory}>${command}\n`;
}

export function executeFinishedCommand(
  command: string,
  state: TerminalState,
  baseDirectory: string
): CommandExecution {
  const parsed = parseCommand(command);

  switch (parsed.type) {
    case COMMANDS.CD: {
      if (!state.activeSection) {
        return {
          state: {
            terminalHistory: appendCommandLine(
              state.terminalHistory,
              state.activeDirectory,
              command
            ),
          },
          nextCommand: null,
        };
      }

      return {
        state: {
          terminalHistory: appendCommandLine(
            state.terminalHistory,
            state.activeDirectory,
            command
          ),
          activeDirectory: `${baseDirectory}${state.activeSection}`,
        },
        nextCommand: COMMANDS.CLS,
      };
    }

    case COMMANDS.CLS:
      return {
        state: { terminalHistory: "" },
        nextCommand: null,
      };

    default:
      return {
        state: {
          terminalHistory: appendCommandLine(
            state.terminalHistory,
            state.activeDirectory,
            command
          ),
        },
        nextCommand: null,
      };
  }
}
