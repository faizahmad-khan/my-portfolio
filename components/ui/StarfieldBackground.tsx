"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const stars: Star[] = [];
    const starCount = 150;

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      opacity: number;
      active: boolean;
      life: number;
      maxLife: number;
    }

    const shootingStars: ShootingStar[] = [];
    let frameCount = 0;

    let animationFrameId: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = Math.sin(star.twinklePhase);
        const opacity = star.opacity + twinkleFactor * 0.4;

        ctx.fillStyle = `rgba(245, 166, 35, ${Math.max(0, opacity)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn new shooting stars
      if (frameCount % 180 === 0 && Math.random() < 0.4) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.3,
          vx: 8 + Math.random() * 6,
          vy: 4 + Math.random() * 3,
          length: 80 + Math.random() * 120,
          opacity: 1,
          active: true,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }

      // Draw and update shooting stars
      shootingStars.forEach((star) => {
        if (!star.active) return;

        star.life++;
        const progress = star.life / star.maxLife;
        star.opacity =
          progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        if (star.opacity <= 0 || star.life >= star.maxLife) {
          star.active = false;
          return;
        }

        const tailX = star.x - star.vx * (star.length / 12);
        const tailY = star.y - star.vy * (star.length / 12);

        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(
          0.7,
          `rgba(180, 240, 255, ${star.opacity * 0.6})`
        );
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Move the star
        star.x += star.vx;
        star.y += star.vy;
      });

      // Clean up inactive shooting stars
      shootingStars.splice(
        0,
        shootingStars.length,
        ...shootingStars.filter((s) => s.active)
      );

      frameCount++;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050505" }}
    />
  );
}
