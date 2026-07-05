"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ backgroundColor: "#111111" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse at top left, rgba(245,166,35,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "#f5a623",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#f5a623",
                }}
              >
                Hello, I&apos;m
              </span>
            </div>

            <div>
              <h1
                style={{
                  fontSize: "clamp(42px, 6vw, 80px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Faiz Ahmad
                <br />
                <span style={{ color: "#f5a623" }}>Khan</span>
              </h1>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 6,
                background: "rgba(245,166,35,0.08)",
                border: "1px solid rgba(245,166,35,0.2)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#f5a623",
                  boxShadow: "0 0 8px #f5a623",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#f5a623",
                  letterSpacing: "0.1em",
                }}
              >
                Full-Stack &amp; ML Developer
              </span>
            </div>

            <p
              style={{
                fontSize: 16,
                color: "#9ca3af",
                lineHeight: 1.8,
                maxWidth: 480,
                margin: 0,
              }}
            >
              Building intelligent systems at the intersection of{" "}
              <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
                full-stack development
              </span>{" "}
              and{" "}
              <span style={{ color: "#e5e7eb", fontWeight: 500 }}>
                machine learning
              </span>
              . CS student turning ideas into shipped products.
            </p>

            <div
              style={{
                display: "flex",
                gap: 32,
                paddingTop: 8,
              }}
            >
              {[
                { number: "6+", label: "Projects" },
                { number: "19", label: "Games Built" },
                { number: "10+", label: "Technologies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#f5a623",
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b7280",
                      fontFamily: "monospace",
                      marginTop: 4,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.06)",
                width: "100%",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/resume.pdf"
                download="Faiz_Ahmad_Khan_Resume.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 8,
                  background: "#f5a623",
                  color: "#111111",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <FileText size={15} />
                Resume
              </a>

              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 8,
                  background: "transparent",
                  color: "#9ca3af",
                  fontWeight: 500,
                  fontSize: 14,
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
              >
                <ArrowDown size={15} />
                View Work
              </button>
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              <a
                href="https://github.com/faizahmad-khan"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#6b7280",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                <ExternalLink size={14} />
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "#6b7280",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                <ExternalLink size={14} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f5a623 0%, transparent 60%)",
                  zIndex: 0,
                }}
              />

              <div
                style={{
                  position: "relative",
                  width: 380,
                  height: 380,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid rgba(245,166,35,0.3)",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/faiz.jpg"
                  alt="Faiz Ahmad Khan"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="380px"
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: -12,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#f5a623",
                  boxShadow: "0 0 20px rgba(245,166,35,0.6)",
                  zIndex: 2,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "1px solid rgba(245,166,35,0.15)",
                  zIndex: 0,
                }}
              />

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: -30,
                  background: "#1a1a1a",
                  border: "1px solid rgba(245,166,35,0.2)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "#e5e7eb",
                    whiteSpace: "nowrap",
                  }}
                >
                  Open to opportunities
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}