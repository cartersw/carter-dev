"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTypewriter } from "./hooks/useTypewriter";
const fullBinary = "01001010 01100101 01110010 01110010 01111001";
const binary =  "01001010011001010";
const name = "carter.wildenradt";
const baseDirectory = "C:\\Users\\carter.wilderadt\\";

type Section = "about" | "projects" | "contact";
const sections: Section[] = ["about", "projects", "contact"];

export default function Home() {
  const [text, setText] = useState(binary);
  const [terminalHistory, setTerminalHistory] = useState("");
  const [finished, setFinished] = useState(false);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [activeDirectory, setActiveDirectory] = useState(baseDirectory);
  const [command, setCommand] = useState<string | null>(null);
  const { displayText: promptLine, finished: commandFinished } = useTypewriter(command, 40);
  const promptOpen = activeSection !== null;
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [terminalHeight, setTerminalHeight] = useState(0);

  useLayoutEffect(() => {
    const content = terminalContentRef.current;

    if (!content || !promptOpen) {
      setTerminalHeight(0);
      return;
    }

    const updateHeight = () => setTerminalHeight(content.scrollHeight);

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);

    return () => observer.disconnect();
  }, [promptOpen, terminalHistory, activeDirectory, promptLine, activeSection]);

  useEffect(() => {
    if (!activeSection) {
      setActiveDirectory(baseDirectory);
      setTerminalHistory("");
      setCommand(null);
      return;
    }else if(activeDirectory === baseDirectory) {
      setCommand(`cd ${activeSection}`);
    }else {
      setCommand(`cd ..\\${activeSection}`);
    }
  }, [activeSection]);

  useEffect(() => {
    if (!commandFinished || !activeSection) return;
    setTerminalHistory(`${terminalHistory}${activeDirectory}>${command}\n`);
    setActiveDirectory(`${baseDirectory}${activeSection}`);

    setCommand(null);
  }, [commandFinished, activeSection]);

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
          className={`prompt-panel mt-6 w-full max-w-3xl px-4 ${
            promptOpen ? "prompt-panel-open" : ""
          }`}
          style={{ maxHeight: promptOpen ? terminalHeight : 0 }}
        >
          <div ref={terminalContentRef}>
            {activeSection && (
              <p className="whitespace-pre-wrap border border-neutral-700 bg-neutral-950 px-4 py-3 text-left text-sm md:text-base">
                <span className="text-neutral-500">
                  {terminalHistory}
                  {activeDirectory}
                  {">"}
                </span>
                {promptLine}
                <span className="cursor">|</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}