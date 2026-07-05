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

const skillsData: SkillItem[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#e8960f" },
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
  { name: "LangChain", Icon: SiLangchain, color: "#f5a623" },
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

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 212, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export default function Skills() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const skillsWithIcons = skillsData;
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

    const check = () => setIsMobile(window.innerWidth < 1024);

    updateScale();
    check();
    window.addEventListener("resize", updateScale);
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("resize", check);
    };
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
      className="py-16 md:py-24 px-4 overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-3">
            FORGE
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Technical Expertise</h2>
          <p className="text-gray-500 text-sm mt-3 font-mono">
            {skillsWithIcons.length} technologies & counting
          </p>
        </div>

        {isMobile ? (
          <motion.div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 },
              },
            }}
          >
            {skillsWithIcons.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                }}
                whileTap={{ scale: 0.92 }}
                whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.2 },
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "14px 8px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  minHeight: 80,
                  position: "relative",
                  overflow: "hidden",
                }}
                onHoverStart={(event) => {
                  const el = event.target as HTMLElement;
                  const card = el.closest("[data-skill-card]") as HTMLElement;
                  if (card) {
                    card.style.border = `1px solid ${skill.color}60`;
                    card.style.boxShadow = `0 0 20px ${skill.color}30, inset 0 0 20px ${skill.color}08`;
                    card.style.background = `rgba(${hexToRgb(skill.color)}, 0.08)`;
                  }
                }}
                onHoverEnd={(event) => {
                  const el = event.target as HTMLElement;
                  const card = el.closest("[data-skill-card]") as HTMLElement;
                  if (card) {
                    card.style.border = "1px solid rgba(255,255,255,0.08)";
                    card.style.boxShadow = "none";
                    card.style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                data-skill-card
              >
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "0%",
                    background: `linear-gradient(to top, ${skill.color}25 0%, ${skill.color}10 60%, transparent 100%)`,
                    borderRadius: 14,
                    pointerEvents: "none",
                  }}
                  whileHover={{
                    height: "100%",
                    transition: {
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                >
                </motion.div>

                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 14,
                    background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
                    pointerEvents: "none",
                    opacity: 0,
                  }}
                  whileTap={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.1, 1],
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                />

                <motion.div
                  style={{ position: "relative", zIndex: 1 }}
                  whileHover={{
                    y: -3,
                    scale: 1.15,
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{
                    scale: 1.2,
                    transition: { duration: 0.15 },
                  }}
                >
                  <skill.Icon size={26} color={skill.color} />
                </motion.div>

                <motion.span
                  style={{
                    fontSize: 9,
                    color: "#9ca3af",
                    fontFamily: "monospace",
                    textAlign: "center",
                    lineHeight: 1.3,
                    wordBreak: "break-word",
                    maxWidth: "100%",
                    padding: "0 2px",
                    position: "relative",
                    zIndex: 1,
                  }}
                  whileHover={{
                    color: skill.color,
                    transition: { duration: 0.2 },
                  }}
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            style={{
              overflow: "hidden",
              position: "relative",
              maxWidth: 750,
              margin: "0 auto",
              marginTop: -40,
            }}
          >
            <div
              ref={containerRef}
              className="relative mx-auto cursor-grab active:cursor-grabbing"
              style={{ width: 750, height: 750 }}
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
              style={{ opacity: 0.15 }}
            >
              {/* Outer circle */}
              <circle cx="280" cy="280" r="278"
                stroke="#f5a623" strokeWidth="0.8" fill="none" />

              {/* Horizontal latitude lines */}
              <ellipse cx="280" cy="280" rx="278" ry="45"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="112"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="186"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="278" ry="247"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />

              {/* Vertical longitude lines */}
              <ellipse cx="280" cy="280" rx="45" ry="278"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="112" ry="278"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="186" ry="278"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />
              <ellipse cx="280" cy="280" rx="247" ry="278"
                stroke="#f5a623" strokeWidth="0.6" fill="none" />

              {/* Tilted diagonal lines for depth feel */}
              <ellipse cx="280" cy="280" rx="278" ry="101"
                stroke="#f5a623" strokeWidth="0.4" fill="none"
                transform="rotate(45 280 280)" />
              <ellipse cx="280" cy="280" rx="278" ry="101"
                stroke="#f5a623" strokeWidth="0.4" fill="none"
                transform="rotate(-45 280 280)" />

              {/* Center glow dot */}
              <circle cx="280" cy="280" r="4" fill="#f5a623" opacity="0.8" />
              <circle cx="280" cy="280" r="13" fill="#f5a623" opacity="0.1" />
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
              background: "radial-gradient(circle, rgba(245,166,35,0.04) 0%, transparent 70%)",
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
        )}
      </div>
    </motion.section>
  );
}
