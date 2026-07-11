"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ backgroundColor: "#131311" }}
      className="py-24 px-4"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-eyebrow">Education & Work</p>
          <h2 className="section-title">Experience</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>

          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, rgba(245,245,240,0.15) 0%, rgba(245,245,240,0.03) 100%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                style={{
                  position: "relative",
                  paddingLeft: 40,
                  paddingBottom: 48,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute",
                  left: -5,
                  top: 6,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: index === 0 ? "#f5f5f0" : "#2e2e2c",
                  border: index === 0 
                    ? "2px solid #f5f5f0" 
                    : "1px solid rgba(245,245,240,0.25)",
                  boxShadow: index === 0 
                    ? "0 0 0 3px rgba(245,245,240,0.08)" 
                    : "none",
                  zIndex: 1,
                }} />

                {/* Period */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "#6b6b65",
                    letterSpacing: "0.05em",
                  }}>
                    {exp.period}
                  </span>
                  {exp.period.includes("Present") && (
                    <span style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#39d353",
                      padding: "2px 7px",
                      borderRadius: 4,
                      border: "1px solid rgba(57,211,83,0.25)",
                      background: "rgba(57,211,83,0.06)",
                    }}>
                      Current
                    </span>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: "#1e1e1c",
                    border: "1px solid rgba(245,245,240,0.07)",
                    borderRadius: 12,
                    padding: 24,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Card left accent */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: exp.type === "education"
                      ? "rgba(245,245,240,0.25)"
                      : "rgba(245,245,240,0.1)",
                    borderRadius: "2px 0 0 2px",
                  }} />

                  {/* Type badge */}
                  <span style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#6b6b65",
                    display: "block",
                    marginBottom: 8,
                  }}>
                    {exp.type === "education" ? "Education" : "Work"}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    letterSpacing: "-0.01em",
                    marginBottom: 4,
                  }}>
                    {exp.title}
                  </h3>

                  {/* Organization */}
                  <p style={{
                    fontSize: 13,
                    color: "#9a9a94",
                    marginBottom: 12,
                  }}>
                    {exp.organization}
                  </p>

                  {/* Description */}
                  {exp.description && (
                    <p style={{
                      fontSize: 13,
                      color: "#6b6b65",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}>
                      {exp.description}
                    </p>
                  )}

                  {/* GPA if education */}
                  {exp.gpa && (
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      borderRadius: 6,
                      border: "1px solid rgba(245,245,240,0.12)",
                      background: "rgba(245,245,240,0.04)",
                      marginBottom: exp.techStack?.length ? 12 : 0,
                    }}>
                      <span style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: "#9a9a94",
                        letterSpacing: "0.05em",
                      }}>
                        GPA: {exp.gpa}
                      </span>
                    </div>
                  )}

                  {/* Tech stack */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {exp.techStack.map((tech) => (
                        <span key={tech} style={{
                          fontSize: 10,
                          fontFamily: "monospace",
                          color: "#9a9a94",
                          padding: "3px 8px",
                          borderRadius: 4,
                          border: "1px solid rgba(245,245,240,0.1)",
                          background: "rgba(245,245,240,0.04)",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
