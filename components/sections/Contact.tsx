"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    platform: "GitHub",
    handle: "@faizahmad-khan",
    href: "https://github.com/faizahmad-khan",
    Icon: SiGithub,
    desc: "Code & projects",
  },
  {
    platform: "LinkedIn",
    handle: "faiz-khan",
    href: "https://www.linkedin.com/in/faiz-ahmad-khan-xyz123abc",
    Icon: FaLinkedin,
    desc: "Professional",
  },
  {
    platform: "Email",
    handle: "amanfaiz92@gmail.com",
    href: "mailto:amanfaiz92@gmail.com",
    Icon: Mail,
    desc: "Direct contact",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const inputStyle = {
    width: "100%",
    background: "rgba(245,245,240,0.04)",
    border: "1px solid rgba(245,245,240,0.1)",
    borderRadius: 8,
    padding: "12px 14px",
    color: "#f5f5f0",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#6b6b65",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 8,
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#131311" }}
      className="py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="section-eyebrow">Get in Touch</p>
          <h2 className="section-title">Contact</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: Social links + intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p style={{ fontSize: 15, color: "#9a9a94", lineHeight: 1.8, marginBottom: 6 }}>
                I&apos;m currently open to{" "}
                <span style={{ color: "#f5f5f0", fontWeight: 500 }}>
                  full-time roles, internships, and freelance projects
                </span>
                . If you have something in mind, let&apos;s talk.
              </p>
              <p style={{ fontSize: 13, color: "#6b6b65", lineHeight: 1.7 }}>
                I typically respond within 24 hours.
              </p>
            </div>

            {/* Social cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.2em",
                color: "#6b6b65",
                textTransform: "uppercase",
                marginBottom: 4,
              }}>
                Find me on
              </p>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: "#1e1e1c",
                    border: "1px solid rgba(245,245,240,0.07)",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                    cursor: "pointer",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement)
                      .closest("a") as HTMLElement;
                    if (el) el.style.borderColor = "rgba(245,245,240,0.2)";
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement)
                      .closest("a") as HTMLElement;
                    if (el) el.style.borderColor = "rgba(245,245,240,0.07)";
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(245,245,240,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <social.Icon size={16} color="#9a9a94" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#f5f5f0",
                      marginBottom: 2,
                    }}>
                      {social.platform}
                    </p>
                    <p style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      color: "#6b6b65",
                    }}>
                      {social.handle}
                    </p>
                  </div>
                  <span style={{
                    fontSize: 11,
                    color: "#6b6b65",
                    fontFamily: "monospace",
                  }}>
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              background: "#1e1e1c",
              border: "1px solid rgba(245,245,240,0.07)",
              borderRadius: 14,
              padding: 28,
            }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#f5f5f0",
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}>
                Send a Message
              </h3>
              <p style={{
                fontSize: 12,
                color: "#6b6b65",
                fontFamily: "monospace",
                marginBottom: 24,
              }}>
                I&apos;ll reply to your email directly.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Faiz Ahmad Khan"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.1)";
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.1)";
                    }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 120,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(245,245,240,0.1)";
                    }}
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p style={{
                    fontSize: 12,
                    color: "#ef4444",
                    fontFamily: "monospace",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}>
                    <AlertCircle size={12} />
                    {errorMsg}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || status === "success"}
                  style={{
                    width: "100%",
                    padding: "13px 24px",
                    borderRadius: 8,
                    background: status === "success"
                      ? "#22c55e"
                      : status === "error"
                      ? "rgba(239,68,68,0.15)"
                      : "#f5f5f0",
                    color: status === "success"
                      ? "white"
                      : status === "error"
                      ? "#ef4444"
                      : "#161614",
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "monospace",
                    letterSpacing: "0.05em",
                    border: status === "error"
                      ? "1px solid #ef4444"
                      : "none",
                    cursor: status === "loading" || status === "success"
                      ? "not-allowed"
                      : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: status === "loading" ? 0.8 : 1,
                    transition: "all 0.2s",
                  }}
                >
                  {status === "loading" && (
                    <Loader size={14} style={{ animation: "spin 1s linear infinite" }} />
                  )}
                  {status === "success" && <CheckCircle size={14} />}
                  {status === "idle" && <Send size={14} />}
                  {status === "idle" && "Send Message"}
                  {status === "loading" && "Sending..."}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && (errorMsg || "Try Again")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
