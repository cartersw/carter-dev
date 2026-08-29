import { COMMANDS } from "../constants/commands";

export function buildCdCommand(
  fromDirectory: string,
  baseDirectory: string,
  section: string
): string {
  if (fromDirectory === baseDirectory) {
    return `${COMMANDS.CD} ${section}`;
  }

  return `${COMMANDS.CD} ..\\${section}`;
}

export type CommandResult = {
  directory: string;
  clearHistory: boolean;
  output: string;
};

export function directoryAfterCommands(
  directory: string,
  commands: string[],
  baseDirectory: string
): string {
  return commands.reduce(
    (current, command) => applyCommand(command, current, baseDirectory).directory,
    directory
  );
}

export function applyCommand(
  command: string,
  directory: string,
  baseDirectory: string
): CommandResult {
  const trimmed = command.trim();
  const space = trimmed.indexOf(" ");
  const cmd = (space === -1 ? trimmed : trimmed.slice(0, space)).toLowerCase();
  const arg = space === -1 ? "" : trimmed.slice(space + 1).trim();

  if (cmd === COMMANDS.CD) {
    return {
      directory: resolveCd(directory, arg, baseDirectory),
      clearHistory: false,
      output: "",
    };
  }

  if (cmd === COMMANDS.CLS) {
    return { directory, clearHistory: true, output: "" };
  }

  return { directory, clearHistory: false, output: "" };
}

function resolveCd(
  currentDir: string,
  arg: string,
  baseDirectory: string
): string {
  if (!arg) {
    return currentDir;
  }

  const parts = currentDir.split("\\").filter((part) => part.length > 0);

  for (const segment of arg.split("\\")) {
    if (!segment || segment === ".") {
      continue;
    }

    if (segment === "..") {
      if (parts.length > 1) {
        parts.pop();
      }
      continue;
    }

    parts.push(segment);
  }

  const joined = parts.join("\\");
  const baseWithoutSlash = baseDirectory.replace(/\\+$/, "");

  if (joined === baseWithoutSlash) {
    return baseDirectory;
  }

  return joined;
}
