import { HOME_DIRECTORY } from "../constants/site";
import type { TerminalCommand, TerminalLine } from "../lib/terminal";

export const SECTIONS = ["about", "projects", "contact"] as const;

export type Section = (typeof SECTIONS)[number];

const SECTION_CONTENT: Record<Section, TerminalLine[]> = {
  about: [
    { text: "Hello my name is Carter, I am a full-stack software developer." },
    {
      text: "I currently work at StarPlus Energy, a joint venture by Samsung SDI and Stellantis, supporting and debugging their MES applications.",
    },
    {
      text: "I enjoy building web apps and video games in my free time. I particularly enjoy designing backend architecture.",
    },
    {
      text: "Outside of development, I enjoy skateboarding, collecting Counter-Strike skins, and investing.",
    },
  ],
  projects: [
    {
      label: "carterwildenradt.dev",
      detail: "Next.js, Typescript, Tailwind",
      href: "https://carterwildenradt.dev",
    },
    { label: "Neural Chickens", 
      detail: "C#, ASP.NET, SQL, EF CORE, Next.js, TypeScript, Tailwind",
      href: "https://github.com/cartersw/neural-chickens" },
    { label: "Hotel Listing API", 
      detail: "C#, ASP.NET, SQL, EF CORE",
      href: "https://github.com/cartersw/hotel-listing-api" },
    { label: "Bloxdle", 
      detail: "Lua",
      href: "https://github.com/cartersw/bloxdle" },
    { label: "Amazondle", 
      detail: "Next.js, TypeScript, Tailwind",
      href: "https://github.com/cartersw/Amazondle" },
    { label: "CS Reinforcement Learning Tool", 
      detail: "Python",
      href: "https://github.com/cartersw/auto-farmer-cs" },
  ],
  contact: [
    {
      label: "email:",
      detail: "carterwildenradt@gmail.com",
      href: "mailto:carterwildenradt@gmail.com",
      link: "detail",
    },
    {
      label: "github:",
      detail: "github.com/cartersw",
      href: "https://github.com/cartersw",
      link: "detail",
    },
    {
      label: "linkedin:",
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
