"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const stats = [
    { number: "10+", label: "Projects Built" },
    { number: "5+", label: "Technologies" },
    { number: "500+", label: "GitHub Commits" },
    { number: "3+", label: "Open Source PRs" },
  ];

  return (
    <section id="about" className="py-16 px-4 max-w-7xl mx-auto overflow-x-hidden">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-amber-400 tracking-widest uppercase">
        WHO I AM
      </p>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">About Me</h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white">Hi, I&apos;m Faiz</h3>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4">
            A passionate Full-Stack Developer based in Lucknow, India. I build
            modern web applications with clean architecture and great user experience.
          </p>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-4">
            My focus is on creating scalable systems — from RESTful APIs to
            interactive frontends. I believe in writing code that is readable,
            maintainable, and performs well.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="border border-white/20 rounded-full px-3 py-1 text-sm text-gray-400">
              📍 Lucknow, India
            </span>
            <span className="border border-white/20 rounded-full px-3 py-1 text-sm text-gray-400">
              B.Tech • 2027
            </span>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Education Card */}
          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400 font-bold font-mono text-sm">
                  🎓
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white">
                  Bachelor of Technology
                </h4>
                <p className="text-amber-400 text-sm mt-1">
                  Babu Banarasi Das University
                </p>
                <p className="text-gray-500 text-sm mt-1">2023 — 2027</p>
                <div className="border border-amber-400/30 rounded-full px-3 py-1 text-amber-400 text-sm inline-block mt-3">
                  GPA: 7.0 / 10
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="glass-card p-6 text-center"
            style={{ minWidth: 0 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-amber-400">{stat.number}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub Contributions */}
      <motion.div
        className="glass-card p-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-gray-400 tracking-widest">
            • GITHUB CONTRIBUTIONS
          </span>
          <span className="text-xs text-gray-500">@faizahmad-khan ↗</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Image
            src="https://ghchart.rshah.org/00d4ff/faizahmad-khan"
            alt="GitHub Contributions"
            width={800}
            height={200}
            className="w-full mt-4 rounded opacity-90"
            unoptimized
            loading="eager"
            fetchPriority="high"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
