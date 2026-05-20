"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiFastapi,
  SiDjango,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiStreamlit,
  SiLangchain,
  SiTensorflow,
  SiOpencv,
  SiGoogle,
  SiSupabase,
  SiFigma,
  SiCoder,
} from "react-icons/si";

interface SpherePosition {
  x: number;
  y: number;
  z: number;
}

interface SkillItem {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

const radius = 300;

const skillsData: SkillItem[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Django", Icon: SiDjango, color: "#092E20" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Java", Icon: SiCoder, color: "#ED8B00" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "Vercel", Icon: SiVercel, color: "#000000" },
  { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
  { name: "Render", Icon: SiNetlify, color: "#46E3B7" },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF0000" },
  { name: "LangChain", Icon: SiLangchain, color: "#00d4ff" },
  { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
  { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
  { name: "MediaPipe", Icon: SiGoogle, color: "#0097A7" },
  { name: "YOLOv8", Icon: SiPython, color: "#013220" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Itch.io", Icon: SiCoder, color: "#FA5840" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getPositions(count: number, sphereRadius: number): SpherePosition[] {
  const positions: SpherePosition[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = (2 * Math.PI * i) / goldenRatio;

    positions.push({
      x: sphereRadius * Math.sin(theta) * Math.cos(phi),
      y: sphereRadius * Math.sin(theta) * Math.sin(phi),
      z: sphereRadius * Math.cos(theta),
    });
  }

  return positions;
}

export default function Skills() {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number | null>(null);
  const positionsRef = useRef<SpherePosition[]>(getPositions(skillsData.length, 280));
  const angleXRef = useRef(0);
  const angleYRef = useRef(0);
  const targetTiltXRef = useRef(0);
  const targetYawInfluenceRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 480) setScale(0.38);
      else if (window.innerWidth < 768) setScale(0.52);
      else if (window.innerWidth < 1024) setScale(0.72);
      else setScale(1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isDraggingRef.current) {
        angleXRef.current += (targetTiltXRef.current - angleXRef.current) * 0.08;
        angleYRef.current += 0.003 + targetYawInfluenceRef.current * 0.0015;
      }

      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;
      const renderRadius = 280 * scale;

      positionsRef.current.forEach((pos, index) => {
        const badge = badgeRefs.current[index];
        if (!badge) return;

        const cosY = Math.cos(angleYRef.current);
        const sinY = Math.sin(angleYRef.current);
        const x1 = pos.x * cosY + pos.z * sinY;
        const z1 = -pos.x * sinY + pos.z * cosY;

        const cosX = Math.cos(angleXRef.current);
        const sinX = Math.sin(angleXRef.current);
        const y2 = pos.y * cosX - z1 * sinX;
        const z2 = pos.y * sinX + z1 * cosX;

        const depth = (z2 + renderRadius) / (2 * renderRadius);
        const opacity = 0.3 + depth * 0.7;
        const scale = 0.6 + depth * 0.6;
        const zIndex = Math.round(depth * 100) + 1;

        badge.style.left = `${centerX + x1}px`;
        badge.style.top = `${centerY + y2}px`;
        badge.style.opacity = `${opacity}`;
        badge.style.zIndex = `${zIndex}`;
        badge.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scale]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    if (isDraggingRef.current) {
      const deltaX = event.clientX - lastMouseRef.current.x;
      const deltaY = event.clientY - lastMouseRef.current.y;

      angleYRef.current += deltaX * 0.005;
      angleXRef.current = clamp(angleXRef.current + deltaY * 0.005, -0.8, 0.8);

      lastMouseRef.current = { x: event.clientX, y: event.clientY };
      return;
    }

    const rect = container.getBoundingClientRect();
    const xOffset = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yOffset = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    targetTiltXRef.current = clamp(yOffset * 0.3, -0.3, 0.3);
    targetYawInfluenceRef.current = clamp(xOffset * 0.3, -0.3, 0.3);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    targetTiltXRef.current = 0;
    targetYawInfluenceRef.current = 0;
  };

  return (
    <motion.section
      id="skills"
      className="py-16 px-4 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3">
            FORGE
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Technical Expertise</h2>
        </div>

          <div
            ref={containerRef}
            className="relative mx-auto cursor-grab active:cursor-grabbing overflow-visible"
            style={{ width: "min(100vw, 750px)", height: "min(100vw, 750px)", marginTop: -80 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
          {/* Globe wireframe SVG */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <svg
              viewBox="0 0 560 560"
              width="560"
              height="560"
              style={{ opacity: 0.15 }}
            >
              {/* Outer circle */}
              <circle cx="280" cy="280" r="278"
                stroke="#00d4ff" strokeWidth="0.8" fill="none" />

              {/* Horizontal latitude lines */}
              <ellipse cx="280" cy="280" rx="278" ry="45"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="112"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="186"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="247"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />

              {/* Vertical longitude lines */}
              <ellipse cx="280" cy="280" rx="45" ry="278"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="112" ry="278"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="186" ry="278"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="247" ry="278"
                stroke="#00d4ff" strokeWidth="0.6" fill="none" />

              {/* Tilted diagonal lines for depth feel */}
              <ellipse cx="280" cy="280" rx="278" ry="101"
                stroke="#00d4ff" strokeWidth="0.4" fill="none"
                transform="rotate(45 280 280)" />
              <ellipse cx="280" cy="280" rx="278" ry="101"
                stroke="#00d4ff" strokeWidth="0.4" fill="none"
                transform="rotate(-45 280 280)" />

              {/* Center glow dot */}
              <circle cx="280" cy="280" r="4" fill="#00d4ff" opacity="0.8" />
              <circle cx="280" cy="280" r="13" fill="#00d4ff" opacity="0.1" />
            </svg>
          </div>

          {/* Ambient glow behind globe */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <div style={{
              width: 380,
              height: 380,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
            }} />
          </div>

          {skillsData.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => {
                badgeRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                transformOrigin: "center center",
              }}
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white transition-colors select-none"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  whiteSpace: "nowrap",
                  cursor: "default",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = `${skill.color}99`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <skill.Icon size={16} color={skill.color} />
                <span>{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
