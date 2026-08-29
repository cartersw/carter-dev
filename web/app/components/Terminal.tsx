"use client";

import { useTerminalScript } from "../hooks/useTerminalScript";
import type { TerminalCommand, TerminalLine } from "../lib/terminal";

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
            <TerminalOutput lines={command.output} />
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

function TerminalOutput({ lines }: { lines: TerminalLine[] }) {
  return (
    <div className="text-neutral-300">
      {lines.map((line, index) => (
        <div key={index}>
          {"text" in line ? line.text : <EntryLine {...line} />}
        </div>
      ))}
    </div>
  );
}

function EntryLine({
  label,
  detail,
  href,
  link = "label",
}: {
  label: string;
  detail?: string;
  href?: string;
  link?: "label" | "detail";
}) {
  const linkClass = "underline hover:opacity-70";
  const external = href && !href.startsWith("mailto:");

  if (href && link === "detail" && detail) {
    return (
      <>
        {label}
        {"     "}
        <a
          href={href}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className={linkClass}
        >
          {detail}
        </a>
      </>
    );
  }

  if (href) {
    return detail ? (
      <>
        <a
          href={href}
          {...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
          className={linkClass}
        >
          {label}
        </a>
        {`  -  ${detail}`}
      </>
    ) : (
      <a
        href={href}
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className={linkClass}
      >
        {label}
      </a>
    );
  }

  return (
    <>
      {label}
      {detail && `     ${detail}`}
    </>
  );
}
