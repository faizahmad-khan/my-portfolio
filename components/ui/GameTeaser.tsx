"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";

type GameTeaserProps = {
  title: string;
  description: string;
  embedUrl: string;
  thumbnailColor: string;
};

export default function GameTeaser({ title, description, embedUrl, thumbnailColor }: GameTeaserProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {!isPlaying ? (
        <div
          onClick={() => setIsPlaying(true)}
          style={{
            position: "relative",
            height: 220,
            background: `linear-gradient(135deg, ${thumbnailColor}20, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,212,255,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={22} color="#050505" fill="#050505" />
          </motion.div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <iframe
            src={embedUrl}
            style={{ width: "100%", height: 320, border: "none", display: "block" }}
            title={title}
          />
          <button
            onClick={() => setIsPlaying(false)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.7)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <X size={14} color="white" />
          </button>
        </div>
      )}
      <div style={{ padding: 16 }}>
        <h3 style={{ color: "white", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
          {title}
        </h3>
        <p style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>
          {description}
        </p>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: "#67e8f9",
            fontFamily: "monospace",
            textDecoration: "none",
          }}
        >
          <ExternalLink size={11} />
          Open fullscreen
        </a>
      </div>
    </div>
  );
}
