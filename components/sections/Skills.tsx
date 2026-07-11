"use client";

import { motion } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiHtml5, SiCss, SiTailwindcss, SiDjango,
  SiFastapi, SiFlask, SiPostgresql, SiMongodb, SiMysql,
  SiSqlite, SiRedis, SiDocker, SiGit, SiGithub,
  SiCloudflare, SiGooglecloud, SiKubernetes, SiLinux,
  SiSupabase, SiPytorch, SiNumpy, SiPandas, SiHuggingface,
  SiTestinglibrary, SiXcode, SiGooglecolab, SiEclipseide,
  SiSqlalchemy, SiMega, SiFigma, SiOpenai,
} from "react-icons/si";

const skillsWithIcons = [
  { name: "Python",        Icon: SiPython,            color: "#3776AB" },
  { name: "JavaScript",    Icon: SiJavascript,        color: "#F7DF1E" },
  { name: "TypeScript",    Icon: SiTypescript,        color: "#3178C6" },
  { name: "React",         Icon: SiReact,             color: "#61DAFB" },
  { name: "Next.js",       Icon: SiNextdotjs,         color: "#ffffff" },
  { name: "Node.js",       Icon: SiNodedotjs,         color: "#339933" },
  { name: "HTML",          Icon: SiHtml5,             color: "#E34F26" },
  { name: "CSS",           Icon: SiCss,              color: "#1572B6" },
  { name: "TailwindCSS",   Icon: SiTailwindcss,       color: "#06B6D4" },
  { name: "Django",        Icon: SiDjango,            color: "#44B78B" },
  { name: "FastAPI",       Icon: SiFastapi,           color: "#009688" },
  { name: "Flask",         Icon: SiFlask,             color: "#ffffff" },
  { name: "PostgreSQL",    Icon: SiPostgresql,        color: "#4169E1" },
  { name: "MongoDB",       Icon: SiMongodb,           color: "#47A248" },
  { name: "MySQL",         Icon: SiMysql,             color: "#4479A1" },
  { name: "SQLite",        Icon: SiSqlite,            color: "#003B57" },
  { name: "Redis",         Icon: SiRedis,             color: "#DC382D" },
  { name: "Docker",        Icon: SiDocker,            color: "#2496ED" },
  { name: "Git",           Icon: SiGit,               color: "#F05032" },
  { name: "GitHub",        Icon: SiGithub,            color: "#ffffff" },
  { name: "AWS",           Icon: SiCloudflare, color: "#FF9900" },
  { name: "Google Cloud",  Icon: SiGooglecloud,       color: "#4285F4" },
  { name: "Kubernetes",    Icon: SiKubernetes,        color: "#326CE5" },
  { name: "Linux",         Icon: SiLinux,             color: "#FCC624" },
  { name: "Supabase",      Icon: SiSupabase,          color: "#3ECF8E" },
  { name: "PyTorch",       Icon: SiPytorch,           color: "#EE4C2C" },
  { name: "NumPy",         Icon: SiNumpy,             color: "#4DABCF" },
  { name: "Pandas",        Icon: SiPandas,            color: "#150458" },
  { name: "Transformers",  Icon: SiHuggingface,       color: "#FFD21E" },
  { name: "Playwright",    Icon: SiTestinglibrary,        color: "#2EAD33" },
  { name: "VS Code",       Icon: SiXcode,  color: "#007ACC" },
  { name: "Google Colab",  Icon: SiGooglecolab,       color: "#F9AB00" },
  { name: "Java",          Icon: SiEclipseide,              color: "#ED8B00" },
  { name: "SQLAlchemy",    Icon: SiSqlalchemy,        color: "#D71F00" },
  { name: "MEGA",          Icon: SiMega,              color: "#D9272E" },
  { name: "Figma",         Icon: SiFigma,             color: "#F24E1E" },
  { name: "LangChain",     Icon: SiOpenai,            color: "#22c55e" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ backgroundColor: "#131311" }}
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">Technical Expertise</h2>
          <p style={{
            fontSize: 13,
            color: "#6b6b65",
            fontFamily: "monospace",
            marginTop: 8,
          }}>
            {skillsWithIcons.length} technologies
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: 12,
          }}
        >
          {skillsWithIcons.map((skill) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                scale: 1.06,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "20px 12px",
                borderRadius: 16,
                background: "#1e1e1c",
                border: "1px solid rgba(245,245,240,0.07)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onHoverStart={(e) => {
                const el = (e.target as HTMLElement).closest(
                  "[data-skill]"
                ) as HTMLElement;
                if (!el) return;
                el.style.border = `1px solid ${skill.color}50`;
                el.style.boxShadow = `0 0 20px ${skill.color}25, 
                  0 8px 24px rgba(0,0,0,0.4)`;
                el.style.background = "#252523";
              }}
              onHoverEnd={(e) => {
                const el = (e.target as HTMLElement).closest(
                  "[data-skill]"
                ) as HTMLElement;
                if (!el) return;
                el.style.border = "1px solid rgba(245,245,240,0.07)";
                el.style.boxShadow = "none";
                el.style.background = "#1a1a1a";
              }}
              data-skill
            >
              {/* Glow bloom behind icon */}
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `${skill.color}15`,
                  filter: "blur(12px)",
                  pointerEvents: "none",
                }}
              />

              {/* Icon */}
              <skill.Icon
                size={32}
                color={skill.color}
                style={{ position: "relative", zIndex: 1, flexShrink: 0 }}
              />

              {/* Name */}
              <span
                style={{
                  fontSize: 10,
                  color: "#6b6b65",
                  fontFamily: "monospace",
                  textAlign: "center",
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
