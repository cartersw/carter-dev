import { HOME_DIRECTORY } from "../constants/site";
import type { TerminalCommand } from "../lib/terminal";

export const SECTIONS = ["about", "projects", "contact"] as const;

export type Section = (typeof SECTIONS)[number];

const SECTION_TEXT: Record<Section, string> = {
  about: [
    "Software engineer who likes small tools, fast pages, and",
    "keeping things simpler than they need to be.",
  ].join("\n"),
  projects: [
    "carter-dev      this site. next.js, typescript, tailwind.",
    "more soon       ...",
  ].join("\n"),
  contact: [
    "email     you@example.com",
    "github    github.com/cartersw",
    "linkedin  linkedin.com/in/your-handle",
  ].join("\n"),
};

const directoryFor = (section: Section) => `${HOME_DIRECTORY}\\${section}`;

/**
 * Commands to type for a section. When `from` is set the session is already
 * showing another section, so it clears the screen and steps sideways into
 * the new one instead of starting from home.
 */
export function sectionScript(
  section: Section,
  from?: Section | null
): TerminalCommand[] {
  const enter: TerminalCommand[] = from
    ? [
        { directory: directoryFor(from), input: "cls", clears: true },
        { directory: directoryFor(from), input: `cd ..\\${section}` },
      ]
    : [{ directory: HOME_DIRECTORY, input: `cd ${section}` }];

  return [
    ...enter,
    {
      directory: directoryFor(section),
      input: `type ${section}.txt`,
      output: SECTION_TEXT[section],
    },
  ];
}
