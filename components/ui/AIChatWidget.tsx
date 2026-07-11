"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { findResponse } from "@/data/chatResponses";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED_QUESTIONS = [
  "What projects has Faiz built?",
  "What's Faiz's tech stack?",
  "Tell me about Project NETRA",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! Ask me about Faiz's projects, skills, or experience — I'll do my best to help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = findResponse(text);
      if (reply.trim()) {
        setMessages([...newMessages, { role: "assistant", content: reply }]);
      }
      setTyping(false);
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 90,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#f5f5f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(245,245,240,0.3)",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isOpen ? <X size={22} color="#161614" /> : <MessageCircle size={22} color="#161614" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              bottom: 90,
              right: 24,
              zIndex: 90,
              width: "min(380px, calc(100vw - 32px))",
              height: "min(520px, calc(100vh - 140px))",
              background: "rgba(10,10,10,0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Sparkles size={16} color="#9a9a94" />
              <div>
                <p style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Ask about Faiz</p>
                <p style={{ color: "#6b7280", fontSize: 11 }}>Quick answers about his work</p>
              </div>
            </div>

            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    background: msg.role === "user"
                      ? "#f5f5f0"
                      : "rgba(255,255,255,0.06)",
                    color: msg.role === "user" ? "#161614" : "#e5e7eb",
                    padding: "10px 14px",
                    borderRadius: 14,
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content}
                </div>
              ))}
              {typing && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    display: "flex",
                    gap: 4,
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 14,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#9ca3af",
                      }}
                    />
                  ))}
                </div>
              )}

              {messages.length === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{
                        textAlign: "left",
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid rgba(245,245,240,0.12)",
                        background: "rgba(245,245,240,0.04)",
                        color: "#9a9a94",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                padding: 12,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  color: "white",
                  fontSize: 16,
                  outline: "none",
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={typing}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#f5f5f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  opacity: typing ? 0.6 : 1,
                }}
              >
                <Send size={16} color="#161614" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
