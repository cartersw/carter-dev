"use client";

import { SECTIONS, type Section } from "../content/sections";

type SectionNavProps = {
  activeSection: Section | null;
  panelId: string;
  onSelect: (section: Section) => void;
  className?: string;
};

export function SectionNav({
  activeSection,
  panelId,
  onSelect,
  className = "",
}: SectionNavProps) {
  return (
    <nav className={`flex gap-12 ${className}`}>
      {SECTIONS.map((section) => (
        <button
          key={section}
          type="button"
          aria-controls={panelId}
          aria-expanded={activeSection === section}
          onClick={() => onSelect(section)}
          className="cursor-pointer transition-opacity hover:opacity-70"
        >
          [{section}]
        </button>
      ))}
    </nav>
  );
}
