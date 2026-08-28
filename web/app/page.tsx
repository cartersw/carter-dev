"use client";

import { useEffect, useState } from "react";
const fullBinary = "01001010 01100101 01110010 01110010 01111001";
const binary =  "01001010011001010";
const name = "carter.wildenradt";

export default function Home() {
  const [text, setText] = useState(binary);

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
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <p className="font-mono text-xl text-white md:text-2xl">
        {text}
      </p>
    </main>
  );
}