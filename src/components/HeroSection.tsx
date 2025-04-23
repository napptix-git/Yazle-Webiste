
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const colors = ['#8B5CF6', '#F97316', '#0EA5E9'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const initParticles = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    particles.current = [];
    const particleCount = Math.min(400, Math.floor(canvas.width * canvas.height / 3000));
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = 0.2;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }

        particle.vx *= 0.95;
        particle.vy *= 0.95;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [mousePosition, mounted]);
  
  return (
    <div className="flex flex-col items-center justify-center w-full pt-32 pb-20 min-h-[80vh] relative select-none">
      {/* Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        {/* Giant heading */}
        <motion.h1
          className="font-dela-gothic text-white mb-4 hero-grad-heading tracking-tighter"
          style={{
            fontSize: "clamp(2.75rem,10vw,5.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.14,
            marginBottom: "0.75em",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-white mr-3" style={{fontWeight:900}}>Reach Every</span>
          <span
            className="ml-2"
            style={{
              color: "#29dd3b",
              fontWeight: 900,
              textShadow: "0 0 30px #29dd3b99, 0 0 8px #29dd3b44"
            }}
          >
            Gamer
          </span>
        </motion.h1>
        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-napptix-light-grey max-w-3xl mx-auto mb-10 font-roboto-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontWeight: 500,
            letterSpacing: "0.01em",
            textShadow: "none"
          }}
        >
          Innovative advertising solutions connecting brands with the gaming world
        </motion.p>
        {/* Big purple button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link to="/advertisers/wizora">
            <button
              className="px-12 py-4 rounded-full font-bold text-lg md:text-2xl bg-[#8B5CF6] hover:bg-[#a084fc] text-white transition-all duration-200 shadow-lg"
              style={{
                fontFamily: 'Roboto Mono, monospace',
                letterSpacing: "0.02em",
                boxShadow: "0 4px 36px 0 rgba(139,92,246,0.31)"
              }}
            >
              Discover Our Solutions
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

