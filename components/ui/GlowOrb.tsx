export default function GlowOrb() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer ring 1 */}
      <div className="absolute inset-0 rounded-full border border-[rgba(245,245,240,0.15)] animate-spin-slow" />

      {/* Outer ring 2 */}
      <div
        className="absolute inset-4 rounded-full border border-[rgba(245,245,240,0.08)]"
        style={{ animation: "spin-reverse 25s linear infinite" }}
      />

      {/* Inner glow */}
      <div
        className="w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,245,240,0.15) 0%, rgba(245,245,240,0.05) 50%, transparent 100%)",
        }}
      />

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-[#f5f5f0] glow-text shadow-lg shadow-[rgba(245,245,240,0.6)]" />

      {/* Outer ambient glow */}
      <div className="absolute -inset-8 rounded-full bg-[rgba(245,245,240,0.04)] blur-2xl" />
    </div>
  );
}
