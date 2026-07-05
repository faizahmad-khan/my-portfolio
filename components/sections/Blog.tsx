"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type BlogProps = {
  defaultShowAll?: boolean;
};

export default function Blog({ defaultShowAll = false }: BlogProps) {
  const [showAll, setShowAll] = useState(defaultShowAll);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const displayed = showAll ? blogPosts : blogPosts.slice(0, 3);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json() as Promise<BlogPost[]>)
      .then(setBlogPosts);
  }, []);

  useEffect(() => {
    if (!showAll || defaultShowAll) {
      return;
    }

    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [showAll, defaultShowAll]);

  return (
    <section ref={sectionRef} id="blog" className="py-16 px-4 max-w-7xl mx-auto overflow-x-hidden">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-amber-400 tracking-widest uppercase">
        WRITING & THOUGHTS
      </p>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Blog</h2>

      {/* Grid */}
      <motion.div
        key={showAll ? "all" : "featured"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {displayed.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <motion.div
              className="glass-card p-6 hover:border-amber-400/30 transition-all duration-300 group cursor-pointer"
              variants={cardVariants}
            >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280" }}>
                {post.date}
              </span>
              {post.featured && (
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: "#f5a623",
                    border: "1px solid rgba(245,166,35,0.3)",
                    borderRadius: 9999,
                    padding: "2px 8px",
                    letterSpacing: "0.1em",
                  }}
                >
                  FEATURED
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-xs text-gray-600 font-mono">
                {post.readTime}
              </span>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 text-xs px-2 py-0.5 rounded text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {!defaultShowAll && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-8 text-amber-400 hover:text-amber-300 text-sm font-mono transition-colors flex items-center gap-2 mx-auto"
        >
          {showAll ? "← Show Less" : "View All Posts →"}
        </button>
      )}
    </section>
  );
}
