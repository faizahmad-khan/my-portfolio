"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Code, Briefcase } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Code,
      color: "#ffffff",
      handle: "@faizahmad-khan",
      url: "https://github.com/faizahmad-khan",
    },
    {
      name: "LinkedIn",
      icon: Briefcase,
      color: "#0A66C2",
      handle: "faiz-khan",
      url: "https://linkedin.com/in/faiz-khan-aa384a23b",
    },
    {
      name: "Twitter",
      icon: Mail,
      color: "#1DA1F2",
      handle: "@yourusername",
      url: "https://twitter.com",
    },
    {
      name: "Email",
      icon: Mail,
      color: "#00d4ff",
      handle: "amanfaiz92@gmail.com",
      url: "mailto:faiz@example.com",
    },
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
        GET IN TOUCH
      </p>

      {/* Title */}
      <h2 className="text-5xl font-bold text-white mt-2">Contact</h2>

      {/* Find me on section */}
      <h3 className="text-xl font-semibold text-gray-300 mt-12 mb-6">
        Find me on
      </h3>

      {/* Social Cards Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {socialLinks.map((social, idx) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              className="glass-card p-6 hover:border-cyan-400/30 hover:glow-border transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Icon
                size={32}
                style={{ color: social.color }}
                className="mb-3"
              />
              <p className="font-bold text-white text-sm">{social.name}</p>
              <p className="text-gray-500 text-xs mt-1">{social.handle}</p>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="glass-card p-8 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Send a Message
        </h3>

        {!submitted ? (
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Faiz Ahmad Khan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400/50 focus:outline-none focus:bg-white/8 transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="amanfaiz92@gmail.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400/50 focus:outline-none focus:bg-white/8 transition-all"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">
                Message
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400/50 focus:outline-none focus:bg-white/8 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-cyan-400 text-black font-bold py-4 rounded-xl mt-6 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-cyan-400 text-lg font-semibold">
              ✓ Message sent! I'll get back to you soon.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
