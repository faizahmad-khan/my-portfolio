"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, FileText } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFastapi,
  SiDocker,
  SiGit,
  SiPython,
} from "react-icons/si";
import { SiOpenai } from "react-icons/si";

const skillBadges = [
  { name: "React", Icon: SiReact, color: "#61DAFB", style: { top: "14%", left: "30%" } },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff", style: { top: "10%", left: "55%" } },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", style: { top: "26%", right: "8%" } },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", style: { top: "42%", left: "6%" } },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", style: { top: "62%", left: "16%" } },
  { name: "Python", Icon: SiPython, color: "#3776AB", style: { top: "20%", right: "16%" } },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688", style: { bottom: "18%", left: "28%" } },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", style: { bottom: "12%", right: "22%" } },
  { name: "Git", Icon: SiGit, color: "#F05032", style: { bottom: "24%", right: "8%" } },
  { name: "LangChain", Icon: SiOpenai, color: "#00d4ff", style: { top: "14%", left: "8%" } },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Skill Badges (fixed scatter, hidden on mobile) ── */}
      {skillBadges.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="absolute hidden lg:flex flex-col items-center gap-1.5"
          style={{
            ...skill.style,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "14px 16px",
            width: "88px",
            backdropFilter: "blur(8px)",
            animation: `float 6s ease-in-out ${i * 0.5}s infinite`,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
        >
          <skill.Icon size={26} color={skill.color} />
          <span
            style={{
              fontSize: "10px",
              color: "#9ca3af",
              fontFamily: "monospace",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {skill.name}
          </span>
        </motion.div>
      ))}

      {/* ── Center Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-3 px-4 max-w-4xl">

        {/* Typewriter watermark — very faint, sits behind */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          style={{ zIndex: -1 }}
        >
          <TypeAnimation
            sequence={[
              "DEVELOPER", 2500,
              "BUILDER",   2500,
              "CREATOR",   2500,
              "ENGINEER",  2500,
            ]}
            wrapper="span"
            speed={25}
            repeat={Infinity}
            cursor={false}
            style={{
              fontSize: "clamp(40px, 8vw, 90px)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "white",
              opacity: 0.12,
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          />
        </div>

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-gray-500 uppercase tracking-[0.4em]"
          style={{ fontSize: "11px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          HELLO! I'M
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-bold text-white leading-none"
          style={{ fontSize: "clamp(48px, 9vw, 96px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Faiz Ahmad Khan
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400"
          style={{ fontSize: "16px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A passionate{" "}
          <span className="text-cyan-400 font-semibold">Full-Stack</span>
          {" "}&{" "}
          <span className="text-cyan-400 font-semibold">ML</span>
          {" "}Developer
        </motion.p>

        {/* Glow Orb */}
        <motion.div
          className="relative flex items-center justify-center my-2"
          style={{ width: 160, height: 160 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Outer rings */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.12)",
            animation: "spin 22s linear infinite",
          }} />
          <div style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "50%",
            border: "1px solid rgba(0,212,255,0.18)",
            animation: "spin-reverse 16s linear infinite",
          }} />
          {/* Inner glow */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#00d4ff",
              boxShadow: "0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.5)",
            }} />
          </div>
        </motion.div>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === 1 ? 24 : 8,
              height: 8,
              borderRadius: 9999,
              background: i === 1 ? "#00d4ff" : "rgba(255,255,255,0.2)",
            }} />
          ))}
        </div>

        {/* Description */}
        <motion.p
          className="text-gray-500 max-w-md leading-relaxed"
          style={{ fontSize: "14px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Building intelligent systems at the intersection of{" "}
          <span className="text-white font-medium">full-stack development</span>
          {" "}and{" "}
          <span className="text-white font-medium">machine learning</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex items-center gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/projects"
            className="flex items-center gap-2 text-gray-300 text-sm hover:text-white transition-all"
            style={{
              padding: "12px 24px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
            }}
          >
            <ArrowDown size={15} />
            Explore Work
          </Link>
          <a
            href="/resume.pdf"
            download="Faiz_Ahmad_Khan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 text-black font-semibold text-sm hover:opacity-90 transition-all"
            style={{
              padding: "12px 24px",
              borderRadius: 9999,
              background: "#00d4ff",
              textDecoration: "none",
            }}
          >
            <span style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #050505",
            }} />
            <FileText size={15} />
            Resume & CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}