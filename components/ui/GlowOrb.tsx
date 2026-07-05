export default function GlowOrb() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Outer ring 1 */}
      <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-spin-slow" />

      {/* Outer ring 2 */}
      <div
        className="absolute inset-4 rounded-full border border-amber-400/10"
        style={{ animation: "spin-reverse 25s linear infinite" }}
      />

      {/* Inner glow */}
      <div
        className="w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.2) 0%, rgba(245,166,35,0.05) 50%, transparent 100%)",
        }}
      />

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-amber-400 glow-text shadow-lg shadow-amber-400/80" />

      {/* Outer ambient glow */}
      <div className="absolute -inset-8 rounded-full bg-amber-400/5 blur-2xl" />
    </div>
  );
}
