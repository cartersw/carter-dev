"use client";

import { useState } from "react";
import { SectionNav } from "./components/SectionNav";
import { Terminal } from "./components/Terminal";
import { NAME, NAME_MASK } from "./constants/site";
import { sectionScript, type Section } from "./content/sections";
import { useDecodeText } from "./hooks/useDecodeText";
import { useElementHeight } from "./hooks/useElementHeight";
import type { TerminalCommand } from "./lib/terminal";

const PANEL_ID = "terminal-panel";

type Session = {
  runId: number;
  section: Section;
  commands: TerminalCommand[];
};

export default function Home() {
  const { value: heading, finished: decoded } = useDecodeText(NAME, NAME_MASK);

  // The session outlives the panel closing so it can animate out. Switching
  // sections while open appends to the same transcript; reopening from closed
  // bumps runId, which remounts the terminal and replays it from the top.
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const { ref: contentRef, height: contentHeight } =
    useElementHeight<HTMLDivElement>();

  const handleSelect = (section: Section) => {
    if (open && session?.section === section) {
      setOpen(false);
      return;
    }

    setSession(
      open && session
        ? {
            runId: session.runId,
            section,
            commands: [
              ...session.commands,
              ...sectionScript(section, session.section),
            ],
          }
        : {
            runId: (session?.runId ?? 0) + 1,
            section,
            commands: sectionScript(section),
          }
    );

    setOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-xl md:text-2xl" aria-label={NAME}>
        {heading}
      </h1>

      {decoded && (
        <SectionNav
          className="fade-in mt-12"
          activeSection={open && session ? session.section : null}
          panelId={PANEL_ID}
          onSelect={handleSelect}
        />
      )}

      <div
        id={PANEL_ID}
        aria-hidden={!open}
        className={`collapsible w-full max-w-3xl ${open ? "collapsible-open" : ""}`}
        style={{ height: open ? contentHeight : 0 }}
      >
        {/* Spacing lives inside the measured box so it counts toward height. */}
        <div ref={contentRef} className="pt-6">
          {session && (
            <Terminal key={session.runId} commands={session.commands} />
          )}
        </div>
      </div>
    </main>
  );
}
