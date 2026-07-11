"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";

type BlogProps = {
  defaultShowAll?: boolean;
};

export default function Blog({ defaultShowAll = false }: BlogProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showAll, setShowAll] = useState(defaultShowAll);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then(setBlogPosts);
  }, []);

  useEffect(() => {
    if (!showAll || defaultShowAll) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [showAll, defaultShowAll]);

  const displayed = showAll ? blogPosts : blogPosts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      id="blog"
      style={{ backgroundColor: "#161614" }}
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-eyebrow">Writing & Thoughts</p>
          <h2 className="section-title">Blog</h2>
        </div>

        {/* Grid */}
        <motion.div
          key={showAll ? "all" : "featured"}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {displayed.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    height: "100%",
                    background: "#1e1e1c",
                    border: "1px solid rgba(245,245,240,0.07)",
                    borderLeft: post.featured
                      ? "3px solid #f5f5f0"
                      : "3px solid rgba(245,245,240,0.12)",
                    borderRadius: 12,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement)
                      .closest("[data-blog-card]") as HTMLElement;
                    if (!el) return;
                    el.style.borderColor = "rgba(245,245,240,0.25)";
                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement)
                      .closest("[data-blog-card]") as HTMLElement;
                    if (!el) return;
                    el.style.borderColor = post.featured
                      ? "#f5f5f0"
                      : "rgba(245,245,240,0.12)";
                    el.style.boxShadow = "none";
                  }}
                  data-blog-card
                >
                  {/* Top row: date + featured badge */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}>
                    <span style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      color: "#6b6b65",
                    }}>
                      {post.date}
                    </span>
                    {post.featured && (
                      <span style={{
                        fontSize: 9,
                        fontFamily: "monospace",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#9a9a94",
                        padding: "2px 7px",
                        borderRadius: 4,
                        border: "1px solid rgba(245,245,240,0.12)",
                        background: "rgba(245,245,240,0.04)",
                      }}>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f5f5f0",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                    marginBottom: 10,
                    flex: 1,
                  }}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: 13,
                    color: "#6b6b65",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Bottom row: read time + tags */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 14,
                    borderTop: "1px solid rgba(245,245,240,0.06)",
                  }}>
                    <span style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      color: "#6b6b65",
                    }}>
                      {post.readTime}
                    </span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{
                          fontSize: 10,
                          fontFamily: "monospace",
                          color: "#6b6b65",
                          padding: "2px 6px",
                          borderRadius: 4,
                          border: "1px solid rgba(245,245,240,0.08)",
                          background: "rgba(245,245,240,0.03)",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Show all toggle */}
        {!defaultShowAll && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                fontSize: 13,
                fontFamily: "monospace",
                color: "#9a9a94",
                background: "transparent",
                border: "1px solid rgba(245,245,240,0.1)",
                padding: "8px 20px",
                borderRadius: 6,
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              {showAll ? "← Show Less" : "View All Posts →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
