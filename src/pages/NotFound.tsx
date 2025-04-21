
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Simple reusable floating console box
const FloatingConsole = () => {
  // Randomly animate floating
  const [pos, setPos] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const move = () => {
      setPos({
        x: Math.random() * (window.innerWidth - 220),
        y: Math.random() * (window.innerHeight - 180),
        rotation: Math.random() * 30 - 15,
      });
    };
    const interval = setInterval(move, 2600);
    move();
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        left: pos.x,
        top: pos.y,
        transform: `rotate(${pos.rotation}deg)`,
      }}
      className="fixed z-30 transition-all duration-1000 ease-in-out bg-black/90 border border-green-400 rounded-lg px-5 py-4 text-green-300 font-mono shadow-2xl pointer-events-none"
    >
      <span className="block text-xs opacity-70 mb-2 select-none">console</span>
      <span className="whitespace-nowrap select-none">404: Route not found</span>
    </div>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colors = ['#8B5CF6', '#F97316', '#0EA5E9'];
  const animationId = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    // Particle setup
    const particleCount = Math.min(150, Math.floor(canvas.width * canvas.height / 12000));
    let particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });
      animationId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId.current!);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "linear-gradient(135deg, #2a253a 0%, #1d2c38 100%)" }}
    />
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden" style={{background: "transparent"}}>
      <ParticleBackground />
      <FloatingConsole />
      <div className="z-10 text-center">
        <h1 className="text-7xl md:text-8xl font-bold mb-8 text-white drop-shadow-lg">404</h1>
        <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-roboto-mono">Oops! Page not found</p>
        <a
          href="/"
          className="inline-block mt-6 font-bold text-lg py-3 px-8 rounded-full transition-all bg-[#29dd3b] text-black border-2 border-[#29dd3b] font-manrope relative shimmer-glow-btn"
          style={{ fontWeight: 800, letterSpacing: 1.2 }}
        >
          <span className="relative z-10">Return to Home</span>
          <span className="absolute shimmer-effect inset-0 pointer-events-none rounded-full"></span>
        </a>
      </div>
      {/* Astronaut simulation: Could add an image/extra effect here */}
    </div>
  );
};

export default NotFound;

