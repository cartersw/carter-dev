"use client";

import { useEffect, useState } from "react";
import { useTypewriter } from "./hooks/useTypewriter";
const fullBinary = "01001010 01100101 01110010 01110010 01111001";
const binary =  "01001010011001010";
const name = "carter.wildenradt";
const baseDirectory = "C:\\Users\\carter.wilderadt\\";

type Section = "about" | "projects" | "contact";
const sections: Section[] = ["about", "projects", "contact"];

export default function Home() {
  const [text, setText] = useState(binary);
  const [finished, setFinished] = useState(false);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [activeDirectory, setActiveDirectory] = useState(baseDirectory);
  const { displayText: promptLine } = useTypewriter(activeSection, 80);
  const { displayText: changeDirectory } = useTypewriter("cd " + activeSection, 30);
  const promptOpen = activeSection !== null;

  useEffect(() => {
    let progress = 0;

    const interval = setInterval(() => {
      progress++;

      const decoded = name.slice(0, progress);
      const remainingBinary = binary.slice(
        Math.floor((binary.length * progress) / name.length)
      );

      setText(decoded + remainingBinary);

      if (progress >= name.length) {
        clearInterval(interval);
        setText(name);
        setFinished(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
   <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-xl md:text-2xl">
          {text}
        </p>

        <div className="mt-12 flex gap-12">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() =>
                setActiveSection((current) =>
                  current === section ? null : section
                )
              }
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              [{section}]
            </button>
          ))}
        </div>

        <div
          className={`prompt-panel mt-6 w-full max-w-md px-4 ${
            promptOpen ? "prompt-panel-open" : ""
          }`}
        >
          {activeSection && (
            <p className="border border-neutral-700 bg-neutral-950 px-4 py-3 text-left text-sm md:text-base">
              <span className="text-neutral-500">{baseDirectory}{activeSection}{'>'}</span>
              
              <span className="cursor">|</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}