"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#161614" }}
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <p className="section-eyebrow">Who I Am</p>
          <h2 className="section-title">About Me</h2>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#f5f5f0",
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}>
                Hi, I&apos;m Faiz
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 15, color: "#9a9a94", lineHeight: 1.8 }}>
                  A passionate{" "}
                  <span style={{ color: "#f5f5f0", fontWeight: 500 }}>
                    Full-Stack Developer
                  </span>{" "}
                  based in Lucknow, India. I build modern web applications 
                  with clean architecture and great user experience.
                </p>
                <p style={{ fontSize: 15, color: "#9a9a94", lineHeight: 1.8 }}>
                  My focus is on creating{" "}
                  <span style={{ color: "#f5f5f0", fontWeight: 500 }}>
                    scalable systems
                  </span>{" "}
                  — from RESTful APIs to interactive frontends. I believe 
                  in writing code that is readable, maintainable, and 
                  performs well.
                </p>
              </div>
            </div>

            {/* Location tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "📍 Lucknow, India" },
                { label: "B.Tech • 2027" },
                { label: "Open to work" },
              ].map((tag) => (
                <span key={tag.label} style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#6b6b65",
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: "1px solid rgba(245,245,240,0.1)",
                  background: "rgba(245,245,240,0.03)",
                }}>
                  {tag.label}
                </span>
              ))}
            </div>

            {/* What I do — 3 focus areas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{
                fontSize: 11,
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                color: "#6b6b65",
                textTransform: "uppercase",
              }}>
                What I focus on
              </p>
              {[
                {
                  icon: "⬡",
                  title: "Full-Stack Development",
                  desc: "Next.js, Django, FastAPI — end to end",
                },
                {
                  icon: "⬡",
                  title: "Machine Learning",
                  desc: "YOLOv8, MediaPipe, PyTorch applied to real problems",
                },
                {
                  icon: "⬡",
                  title: "Systems & DevOps",
                  desc: "Docker, PostgreSQL, cloud deployment",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "#1e1e1c",
                    border: "1px solid rgba(245,245,240,0.07)",
                  }}
                >
                  <span style={{
                    color: "#f5f5f0",
                    fontSize: 14,
                    marginTop: 1,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>
                  <div>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#f5f5f0",
                      marginBottom: 2,
                    }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 12, color: "#6b6b65" }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Education + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >

            {/* Education card */}
            <div style={{
              background: "#1e1e1c",
              border: "1px solid rgba(245,245,240,0.07)",
              borderRadius: 14,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Subtle corner accent */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                background: "radial-gradient(circle at top right, rgba(245,245,240,0.04) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <p style={{
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.25em",
                color: "#6b6b65",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
                Education
              </p>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                {/* Institution initials */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(245,245,240,0.06)",
                  border: "1px solid rgba(245,245,240,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#f5f5f0",
                  flexShrink: 0,
                }}>
                  BBD
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    marginBottom: 3,
                  }}>
                    Bachelor of Technology
                  </p>
                  <p style={{ fontSize: 13, color: "#9a9a94", marginBottom: 6 }}>
                    Babu Banarasi Das University
                  </p>
                  <p style={{ fontSize: 12, color: "#6b6b65", fontFamily: "monospace" }}>
                    2023 — 2027
                  </p>
                </div>
              </div>

              {/* GPA + Year badge row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid rgba(245,245,240,0.07)",
              }}>
                <div>
                  <p style={{ fontSize: 10, color: "#6b6b65", fontFamily: "monospace", marginBottom: 4 }}>
                    CURRENT GPA
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#f5f5f0", letterSpacing: "-0.02em" }}>
                    7.0
                    <span style={{ fontSize: 13, color: "#6b6b65", fontWeight: 400 }}> / 10</span>
                  </p>
                </div>
                <span style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#9a9a94",
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid rgba(245,245,240,0.1)",
                  background: "rgba(245,245,240,0.04)",
                }}>
                  3rd Year
                </span>
              </div>
            </div>

            {/* Stats grid — 2x2 */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}>
              {[
                { number: "10+",  label: "Projects Built",    sub: "shipped" },
                { number: "5+",   label: "Technologies",      sub: "mastered" },
                { number: "500+", label: "GitHub Commits",    sub: "and counting" },
                { number: "3+",   label: "Open Source PRs",   sub: "merged" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "#1e1e1c",
                    border: "1px solid rgba(245,245,240,0.07)",
                    borderRadius: 12,
                    padding: "20px 16px",
                  }}
                >
                  <p style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#f5f5f0",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}>
                    {stat.number}
                  </p>
                  <p style={{ fontSize: 12, color: "#9a9a94", marginBottom: 2 }}>
                    {stat.label}
                  </p>
                  <p style={{
                    fontSize: 10,
                    color: "#6b6b65",
                    fontFamily: "monospace",
                  }}>
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* GitHub Contributions — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: 48,
            background: "#1e1e1c",
            border: "1px solid rgba(245,245,240,0.07)",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#39d353",
                boxShadow: "0 0 6px #39d353",
              }} />
              <span style={{
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.25em",
                color: "#6b6b65",
                textTransform: "uppercase",
              }}>
                GitHub Contributions
              </span>
            </div>
            <a
              href="https://github.com/faizahmad-khan"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: "#6b6b65",
                textDecoration: "none",
              }}
            >
              @faizahmad-khan ↗
            </a>
          </div>

          <div style={{ overflowX: "auto" }}>
            <img
              src="https://ghchart.rshah.org/39d353/faizahmad-khan"
              alt="GitHub Contributions"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 8,
                filter: "brightness(0.9)",
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
