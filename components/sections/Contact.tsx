"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Code,
  Loader,
  Mail,
  Send,
} from "lucide-react";
import { SiTelegram } from "react-icons/si";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
      name: "Telegram",
      icon: SiTelegram,
      color: "#2AABEE",
      handle: "@faiz_khan_10",
      url: "https://t.me/faiz_khan_10",
    },
    {
      name: "Email",
      icon: Mail,
      color: "#f5a623",
      handle: "amanfaiz92@gmail.com",
      url: "mailto:amanfaiz92@gmail.com",
    },
  ];

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setErrorMsg("Please fill in all fields");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:py-24 max-w-5xl mx-auto overflow-x-hidden">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-amber-400 tracking-widest uppercase">
        GET IN TOUCH
      </p>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Contact</h2>

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
              className="p-6 transition-all cursor-pointer"
              style={{
                minWidth: 0,
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={(event) => {
                (event.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,166,35,0.25)";
              }}
              onHoverEnd={(event) => {
                (event.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Icon size={20} style={{ color: social.color }} className="mb-3 md:size-8" />
              <p className="font-bold text-white text-sm">{social.name}</p>
              <p className="text-gray-500 text-xs mt-1">{social.handle}</p>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="p-8 max-w-2xl w-full mx-4 md:mx-auto"
        style={{
          background: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white text-center mb-8">
          Send a Message
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Faiz Ahmad Khan"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-400/50 focus:outline-none focus:bg-white/8 transition-all"
              style={{ fontSize: 16 }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="amanfaiz92@gmail.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-400/50 focus:outline-none focus:bg-white/8 transition-all"
              style={{ fontSize: 16 }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2 font-mono">
              Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-400/50 focus:outline-none focus:bg-white/8 transition-all resize-none"
              style={{ fontSize: 16 }}
            />
          </div>

          {status === "error" && errorMsg && (
            <p
              style={{
                color: "#ef4444",
                fontSize: 12,
                fontFamily: "monospace",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {errorMsg}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === "loading" || status === "success"}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: 12,
              background:
                status === "success"
                  ? "#22c55e"
                  : status === "error"
                  ? "rgba(239,68,68,0.2)"
                  : "#f5a623",
              color:
                status === "success"
                  ? "white"
                  : status === "error"
                  ? "#ef4444"
                  : "#111111",
              fontWeight: 700,
              fontSize: 14,
              border: status === "error" ? "1px solid #ef4444" : "none",
              cursor:
                status === "loading" || status === "success"
                  ? "not-allowed"
                  : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 16,
              opacity: status === "loading" ? 0.8 : 1,
              transition: "all 0.3s",
            }}
          >
            {status === "loading" && (
              <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
            )}
            {status === "success" && <CheckCircle size={16} />}
            {status === "error" && <AlertCircle size={16} />}
            {status === "idle" && <Send size={16} />}

            {status === "loading"
              ? "Sending..."
              : status === "success"
              ? "Message Sent!"
              : status === "error"
              ? errorMsg || "Failed to send"
              : "Send Message"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
