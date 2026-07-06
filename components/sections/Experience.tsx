"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-4 max-w-4xl mx-auto overflow-x-hidden" style={{ backgroundColor: "#0e0e0e" }}>
      {/* Eyebrow */}
      <p className="section-eyebrow">
        EDUCATION & WORK
      </p>

      {/* Title */}
      <h2 className="section-title">Experience</h2>

      {/* Timeline */}
      <div className="relative ml-4 mt-12 max-w-4xl mx-auto px-4">
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "rgba(245,166,35,0.2)" }} />

        {/* Timeline Items */}
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="relative pl-8 pb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Timeline Dot */}
            <div
              className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-1/2"
              style={{
                background: "#f5a623",
                boxShadow: "0 0 8px rgba(245,166,35,0.5)",
              }}
            />

            {/* Period Tag */}
            <p className="text-xs font-mono text-amber-400 mb-2">{exp.period}</p>

            {/* Card */}
            <div className="glass-card p-6 overflow-hidden" style={{ wordBreak: "break-word" }}>
              {/* Type Badge */}
              <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "rgba(245,166,35,0.7)" }}>
                {exp.type === "education" ? "Education" : "Work"}
              </p>

              {/* Title */}
              <h3 className="text-xl font-bold text-white">{exp.title}</h3>

              {/* Organization */}
              <p className="text-gray-400 text-sm mt-1">{exp.organization}</p>

              {/* Description */}
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {exp.description}
              </p>

              {/* Tech Stack */}
              {exp.techStack && exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: "rgba(245,166,35,0.08)",
                        color: "#f5a623",
                        border: "1px solid rgba(245,166,35,0.15)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* GPA Badge */}
              {exp.type === "education" && exp.gpa && (
                <div className="border border-amber-400/30 rounded-full px-3 py-1 text-amber-400 text-xs inline-block mt-4">
                  GPA: {exp.gpa}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
