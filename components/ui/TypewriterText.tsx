"use client";

import { TypeAnimation } from "react-type-animation";

interface TypewriterTextProps {
  sequences: string[];
  className?: string;
}

export default function TypewriterText({ sequences, className }: TypewriterTextProps) {
  const defaultClassName =
    "text-7xl font-bold uppercase tracking-widest opacity-10 text-white select-none pointer-events-none absolute";

  return (
    <TypeAnimation
      sequence={sequences.flatMap((seq) => [seq, 2000])}
      repeat={Infinity}
      className={className || defaultClassName}
    />
  );
}
