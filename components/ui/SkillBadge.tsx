"use client";

interface SkillBadgeProps {
  name: string;
  color: string;
  delay: number;
  className?: string;
}

export default function SkillBadge({ name, color, delay, className }: SkillBadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 p-3 rounded-xl bg-black/80 border border-white/10 hover:border-amber-400/40 hover:glow-border transition-all ${className || ""}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-gray-400 font-mono">{name}</span>
    </div>
  );
}
