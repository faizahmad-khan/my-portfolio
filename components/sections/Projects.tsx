"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [flipped, setFlipped] = useState<number | null>(null);
  const displayed = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-16 px-4 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header */}
      <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
        FEATURED WORK
      </p>
      <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-12">Projects</h2>

      {/* Grid */}
      <motion.div
        key={showAll ? "all" : "featured"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {displayed.map((project) => (
          <motion.div
            key={project.id}
            className="relative"
            style={{ height: "auto", minHeight: 300, perspective: 1000 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {/* Card wrapper — flips on click */}
            <div
              onClick={() => setFlipped(flipped === project.id ? null : project.id)}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: flipped === project.id ? "rotateY(180deg)" : "rotateY(0deg)",
                cursor: "pointer",
              }}
            >
              {/* ── FRONT FACE ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Project image — low opacity background */}
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="eager"
                    priority={project.id === 1}
                    style={{ objectFit: "cover", opacity: 0.75 }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}

                {/* Gradient overlay so text is readable */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(5,5,5,0.95) 40%, rgba(5,5,5,0.4) 100%)",
                }} />

                {/* Content */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  {/* Top row: year + status */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>
                      2026
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: "monospace" }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: "50%", display: "inline-block",
                        background: project.status === "Live" ? "#22c55e" : project.status === "WIP" ? "#f59e0b" : "#6b7280",
                        boxShadow: project.status === "Live" ? "0 0 6px #22c55e" : project.status === "WIP" ? "0 0 6px #f59e0b" : "none",
                      }} />
                      <span style={{ color: project.status === "Live" ? "#22c55e" : project.status === "WIP" ? "#f59e0b" : "#6b7280" }}>
                        {project.status}
                      </span>
                    </span>
                  </div>

                  {/* Bottom: title + tap hint */}
                  <div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 8 }}>
                      {project.title}
                    </h3>
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16,
                    }}>
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} style={{
                          background: "rgba(255,255,255,0.08)",
                          color: "#67e8f9",
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 9999,
                          fontFamily: "monospace",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "rgba(255,255,255,0.6)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}>
                      TAP TO KNOW MORE
                    </p>
                  </div>
                </div>
              </div>

              {/* ── BACK FACE ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Back top */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", maxWidth: "80%" }}>
                      {project.title}
                    </h3>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "rgba(0,212,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <X size={14} color="#00d4ff" />
                    </div>
                  </div>
                  <p style={{
                    fontSize: 13, color: "#9ca3af", marginTop: 12, lineHeight: 1.6,
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Tech stack — all tags */}
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {project.techStack.map((tech) => (
                      <span key={tech} style={{
                        background: "rgba(0,212,255,0.08)",
                        color: "#67e8f9",
                        fontSize: 10,
                        padding: "3px 10px",
                        borderRadius: 9999,
                        fontFamily: "monospace",
                        border: "1px solid rgba(0,212,255,0.15)",
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: 12 }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          fontSize: 12, color: "#9ca3af", fontFamily: "monospace",
                          textDecoration: "none",
                          padding: "6px 14px",
                          borderRadius: 9999,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                      >
                        <Code size={13} />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "flex", alignItems: "center", gap: 6,
                          fontSize: 12, color: "#050505", fontFamily: "monospace",
                          fontWeight: 600,
                          textDecoration: "none",
                          padding: "6px 14px",
                          borderRadius: 9999,
                          background: "#00d4ff",
                        }}
                      >
                        <ArrowUpRight size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Show more/less */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-mono 
            transition-colors flex items-center gap-2 mx-auto"
        >
          {showAll ? "← Show Less" : "View All Projects →"}
        </button>
      </div>
    </section>
  );
}
