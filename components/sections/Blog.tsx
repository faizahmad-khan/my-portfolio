"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";

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

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-4 max-w-7xl mx-auto">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
        WRITING & THOUGHTS
      </p>

      {/* Title */}
      <h2 className="text-5xl font-bold text-white mt-2">Blog</h2>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {blogPosts.map((post) => (
          <motion.a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card p-6 hover:border-cyan-400/30 transition-all duration-300 group cursor-pointer"
            variants={cardVariants}
          >
            {/* Date */}
            <p className="text-xs font-mono text-gray-600 mb-3">{post.date}</p>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
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
          </motion.a>
        ))}
      </motion.div>

      {/* All Posts Link */}
      <div className="mt-12 text-center">
        <a
          href="/blog"
          className="text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors"
        >
          All Posts →
        </a>
      </div>
    </section>
  );
}
