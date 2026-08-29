"use client";

import { useTerminalScript } from "../hooks/useTerminalScript";
import type { TerminalCommand } from "../lib/terminal";

type TerminalProps = {
  commands: TerminalCommand[];
};

export function Terminal({ commands }: TerminalProps) {
  const { completed, directory, typed } = useTerminalScript(commands);

  return (
    <div className="whitespace-pre-wrap border border-neutral-700 bg-neutral-950 px-4 py-3 text-left text-sm md:text-base">
      {completed.map((command, index) => (
        <div key={index}>
          <Prompt directory={command.directory} />
          {command.input}
          {command.output && (
            <div className="text-neutral-300">{command.output}</div>
          )}
        </div>
      ))}

      <div>
        <Prompt directory={directory} />
        {typed}
        <span className="cursor">|</span>
      </div>
    </div>
  );
}

function Prompt({ directory }: { directory: string }) {
  return <span className="text-neutral-500">{directory}&gt;</span>;
}
