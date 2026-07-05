"use client";

import Image from "next/image";
import { useState } from "react";
import { Activity, Image as GalleryImage, Monitor, X } from "lucide-react";
import VisitorBadge from "@/components/ui/VisitorBadge";
import { projects } from "@/data/projects";

export default function Footer() {
  const [showGallery, setShowGallery] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);

  return (
    <>
      <footer className="bg-transparent border-t border-white/5 py-8 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left */}
          <p className="text-xs font-mono text-gray-600">
            • © 2026 FAIZ AHMAD KHAN
          </p>

          {/* Right */}
          <div className="flex flex-wrap justify-center gap-2">
            <VisitorBadge />
            <button
              onClick={() => setShowGallery(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#6b7280",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 9999,
                background: "transparent",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              <GalleryImage size={12} />
              Gallery
            </button>
            <button
              onClick={() => setShowMonitor(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#6b7280",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 9999,
                background: "transparent",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              <Monitor size={12} />
              Monitor
            </button>
          </div>
        </div>
      </footer>

      {showGallery && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setShowGallery(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: 32,
              maxWidth: 900,
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2 style={{ color: "white", fontWeight: 700, fontSize: 20 }}>
                Project Gallery
              </h2>
              <button
                onClick={() => setShowGallery(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {projects.filter((project) => project.image).map((project) => (
                <div
                  key={project.id}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    width={240}
                    height={160}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      opacity: 0.85,
                    }}
                  />
                  <div style={{ padding: "12px 14px" }}>
                    <p style={{ color: "white", fontSize: 13, fontWeight: 600 }}>
                      {project.title}
                    </p>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: 11,
                        fontFamily: "monospace",
                        marginTop: 4,
                      }}
                    >
                      {project.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMonitor && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={() => setShowMonitor(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: 32,
              maxWidth: 480,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Activity size={18} color="#f5a623" />
                Site Monitor
              </h2>
              <button
                onClick={() => setShowMonitor(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {[
              { label: "Status", value: "Online", color: "#22c55e" },
              {
                label: "Total Visitors",
                value: "See badge →",
                color: "#f5a623",
              },
              {
                label: "Projects",
                value: projects.length.toString(),
                color: "#f5a623",
              },
              {
                label: "Stack",
                value: "Next.js + Tailwind v4",
                color: "#9ca3af",
              },
              { label: "Deployed", value: "Vercel", color: "#9ca3af" },
              {
                label: "Last Updated",
                value: new Date().toLocaleDateString(),
                color: "#9ca3af",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    color: stat.color,
                    fontSize: 13,
                    fontFamily: "monospace",
                    fontWeight: 600,
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                background: "rgba(245,166,35,0.05)",
                border: "1px solid rgba(245,166,35,0.15)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <span
                style={{
                  color: "#9ca3af",
                  fontSize: 12,
                  fontFamily: "monospace",
                }}
              >
                All systems operational
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
