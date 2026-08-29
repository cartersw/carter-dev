import { HOME_DIRECTORY } from "../constants/site";
import type { TerminalCommand, TerminalLine } from "../lib/terminal";

export const SECTIONS = ["about", "projects", "contact"] as const;

export type Section = (typeof SECTIONS)[number];

const SECTION_CONTENT: Record<Section, TerminalLine[]> = {
  about: [
    { text: "Hello my name is Carter, I am a full-stack software developer." },
    {
      text: "I am currently employed at StarPlus Energy, a joint venture by Samsung and Stellantis, supporting and debugging their MES application.",
    },
    {
      text: "I enjoy building web apps and video games in my free time. One of my favorite parts of development is designing backend architecture.",
    },
    {
      text: "Some hobbies of mine are skateboarding, collecting Counter-Strike skins, and investing.",
    },
  ],
  projects: [
    {
      label: "carterwildenradt.dev",
      detail: "next.js, typescript, tailwind",
      href: "https://carterwildenradt.dev",
    },
    { label: "Neural Chickens", 
      href: "https://github.com/cartersw/neural-chickens" },
    { label: "Hotel Listing API", 
      href: "https://github.com/cartersw/hotel-listing-api" },
    { label: "Bloxdle", 
      href: "https://github.com/cartersw/bloxdle" },
    { label: "Amazondle", 
      href: "https://github.com/cartersw/Amazondle" },
    { label: "CS Reinforcement Learning Tool", 
      href: "https://github.com/cartersw/auto-farmer-cs" },
  ],
  contact: [
    {
      label: "email",
      detail: "carterwildenradt@gmail.com",
      href: "mailto:carterwildenradt@gmail.com",
      link: "detail",
    },
    {
      label: "github",
      detail: "github.com/cartersw",
      href: "https://github.com/cartersw",
      link: "detail",
    },
    {
      label: "linkedin",
      detail: "linkedin.com/in/carterwildenradt",
      href: "https://linkedin.com/in/carterwildenradt",
      link: "detail",
    },
  ],
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
      output: SECTION_CONTENT[section],
    },
  ];
}
