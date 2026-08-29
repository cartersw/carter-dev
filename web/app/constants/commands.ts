export const COMMANDS = {
  CD: "cd",
  CLS: "cls",
} as const;

export type ParsedCommand =
  | { type: typeof COMMANDS.CLS }
  | { type: typeof COMMANDS.CD; target: string }
  | { type: "unknown" };

export type CommandType = (typeof COMMANDS)[keyof typeof COMMANDS];

export function parseCommand(command: string): ParsedCommand {
  if (command === COMMANDS.CLS) {
    return { type: COMMANDS.CLS };
  }

  const cdPrefix = `${COMMANDS.CD} `;
  if (command.startsWith(cdPrefix)) {
    return { type: COMMANDS.CD, target: command.slice(cdPrefix.length) };
  }

  return { type: "unknown" };
}

export function buildCdCommand(target: string): string {
  return `${COMMANDS.CD} ${target}`;
}