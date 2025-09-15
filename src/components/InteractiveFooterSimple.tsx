// Simplified InteractiveFooter component that should work without React types
// This version removes some TypeScript strictness to avoid type errors

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  acc: { x: number; y: number };
  rotation: number;
  rotationVel: number;
  imgIndex: number;
  active: boolean;
  lastUpdate: number;
}

interface SpatialGrid {
  cellSize: number;
  grid: Record<string, number[]>;
  clear(): void;
  addParticle(particle: Particle, index: number): void;
  getNeighbors(particle: Particle): number[];
}

class SpatialGridClass implements SpatialGrid {
  cellSize: number;
  grid: Record<string, number[]>;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
    this.grid = {};
  }

  clear() {
    this.grid = {};
  }

  addParticle(particle: Particle, index: number) {
    const gridX = Math.floor(particle.pos.x / this.cellSize);
    const gridY = Math.floor(particle.pos.y / this.cellSize);
    const key = `${gridX},${gridY}`;

    if (!this.grid[key]) {
      this.grid[key] = [];
    }
    this.grid[key].push(index);
  }

  getNeighbors(particle: Particle): number[] {
    const gridX = Math.floor(particle.pos.x / this.cellSize);
    const gridY = Math.floor(particle.pos.y / this.cellSize);
    const neighbors: number[] = [];

    // Check current and adjacent cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${gridX + dx},${gridY + dy}`;
        if (this.grid[key]) {
          neighbors.push(...this.grid[key]);
        }
      }
    }
    return neighbors;
  }
}

interface PerformanceMonitor {
  frameRates: number[];
  maxFrameRateHistory: number;
  qualityLevel: number;
  targetFPS: number;
  minFPS: number;
  lastFrameTime: number;
  frameCount: number;
  lastQualityCheck: number;
  qualityCheckInterval: number;
  update(): void;
  getAverageFPS(): number;
  adjustQuality(): void;
  applyQualitySettings(): void;
  getQualityLevel(): number;
  getFPS(): number;
}

class PerformanceMonitorClass implements PerformanceMonitor {
  frameRates: number[] = [];
  maxFrameRateHistory = 60;
  qualityLevel = 1;
  targetFPS = 60;
  minFPS = 30;
  lastFrameTime = 0;
  frameCount = 0;
  lastQualityCheck = 0;
  qualityCheckInterval = 300;

  update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    if (deltaTime > 0) {
      const fps = 1000 / deltaTime;
      this.frameRates.push(fps);
      
      if (this.frameRates.length > this.maxFrameRateHistory) {
        this.frameRates.shift();
      }
    }

    this.frameCount++;
    
    if (this.frameCount - this.lastQualityCheck > this.qualityCheckInterval) {
      this.adjustQuality();
      this.lastQualityCheck = this.frameCount;
    }
  }

  getAverageFPS(): number {
    if (this.frameRates.length === 0) return 60;
    return this.frameRates.reduce((a, b) => a + b, 0) / this.frameRates.length;
  }

  adjustQuality() {
    const avgFPS = this.getAverageFPS();
    
    if (avgFPS < this.minFPS && this.qualityLevel > 0) {
      this.qualityLevel--;
      this.applyQualitySettings();
      console.log(`Performance: Lowering quality to level ${this.qualityLevel} (FPS: ${avgFPS.toFixed(1)})`);
    } else if (avgFPS > this.targetFPS * 0.9 && this.qualityLevel < 2) {
      this.qualityLevel++;
      this.applyQualitySettings();
      console.log(`Performance: Increasing quality to level ${this.qualityLevel} (FPS: ${avgFPS.toFixed(1)})`);
    }
  }

  applyQualitySettings() {
    console.log(`Quality level changed to: ${this.qualityLevel}`);
  }

  getQualityLevel(): number {
    return this.qualityLevel;
  }

  getFPS(): number {
    return this.getAverageFPS();
  }
}

const InteractiveFooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCount, setParticleCount] = useState(300);
  const [particleSize, setParticleSize] = useState(25);
  const [spacing, setSpacing] = useState(0);
  const [gravity] = useState({ x: 0, y: 1.5 });
  const [deltaTime] = useState(1/60);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [particleImages, setParticleImages] = useState<HTMLImageElement[]>([]);
  const [spatialGrid, setSpatialGrid] = useState<SpatialGridClass | null>(null);
  const [performanceMonitor, setPerformanceMonitor] = useState<PerformanceMonitorClass | null>(null);

  // Load particle images
  useEffect(() => {
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      for (let i = 1; i <= 5; i++) {
        const img = new Image();
        img.src = `/assets/${i}.png`;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        images.push(img);
      }
      setParticleImages(images);
    };
    loadImages();
  }, []);

  // Initialize performance monitor
  useEffect(() => {
    const monitor = new PerformanceMonitorClass();
    setPerformanceMonitor(monitor);
  }, []);

  // Initialize spatial grid
  useEffect(() => {
    if (particleSize > 0) {
      const grid = new SpatialGridClass(particleSize * 1.8);
      setSpatialGrid(grid);
      setSpacing(particleSize * 1.8);
    }
  }, [particleSize]);

  // Setup particles
  const setupParticles = () => {
    if (!canvasSize.width || !canvasSize.height) return;

    const newParticles: Particle[] = [];
    const availableWidth = canvasSize.width * 0.9;
    const cols = Math.floor(availableWidth / spacing);
    const startX = (canvasSize.width - cols * spacing) / 2;
    const startY = canvasSize.height * 0.1;

    let count = 0;
    let row = 0;

    while (count < particleCount) {
      for (let col = 0; col < cols && count < particleCount; col++) {
        const x = startX + col * spacing + (Math.random() - 0.5) * 6;
        const y = startY + row * spacing + (Math.random() - 0.5) * 6;
        
        newParticles.push({
          pos: { x, y },
          vel: { 
            x: (Math.random() - 0.5) * 30, 
            y: (Math.random() - 0.5) * 30 
          },
          acc: { x: 0, y: 0 },
          rotation: Math.random() * Math.PI * 2,
          rotationVel: (Math.random() - 0.5) * 0.1,
          imgIndex: Math.floor(Math.random() * 5),
          active: true,
          lastUpdate: 0
        });
        count++;
      }
      row++;
    }
    setParticles(newParticles);
  };

  // Update particles
  const updateParticles = () => {
    if (!spatialGrid) return;

    setParticles((prevParticles: Particle[]) => {
      const updatedParticles = prevParticles.map((particle: Particle) => {
        if (!particle.active) return particle;

        // Update rotation
        const newRotation = particle.rotation + particle.rotationVel;

        // Apply gravity
        const newAcc = {
          x: particle.acc.x,
          y: particle.acc.y + gravity.y * 3
        };

        // Update velocity with damping
        const newVel = {
          x: (particle.vel.x + newAcc.x * deltaTime * 10) * 0.98,
          y: (particle.vel.y + newAcc.y * deltaTime * 10) * 0.98
        };

        // Update position
        const newPos = {
          x: particle.pos.x + newVel.x * deltaTime * 10,
          y: particle.pos.y + newVel.y * deltaTime * 10
        };

        // Boundary collision
        const bounce = 0.6;
        const buffer = particleSize * 0.8;

        if (newPos.x < buffer) {
          newPos.x = buffer;
          newVel.x = Math.abs(newVel.x) * bounce;
        }
        if (newPos.x > canvasSize.width - buffer) {
          newPos.x = canvasSize.width - buffer;
          newVel.x = -Math.abs(newVel.x) * bounce;
        }
        if (newPos.y < buffer) {
          newPos.y = buffer;
          newVel.y = Math.abs(newVel.y) * bounce;
        }
        if (newPos.y > canvasSize.height - buffer) {
          newPos.y = canvasSize.height - buffer;
          newVel.y = -Math.abs(newVel.y) * bounce;
        }

        return {
          ...particle,
          pos: newPos,
          vel: newVel,
          acc: { x: 0, y: 0 },
          rotation: newRotation
        };
      });

      return updatedParticles;
    });
  };

  // Handle collisions
  const handleCollisions = () => {
    if (!spatialGrid) return;

    spatialGrid.clear();
    particles.forEach((particle: Particle, index: number) => {
      spatialGrid.addParticle(particle, index);
    });

    const checkedPairs = new Set<string>();
    particles.forEach((particle: Particle, i: number) => {
      const neighbors = spatialGrid.getNeighbors(particle);
      neighbors.forEach((j: number) => {
        if (i < j) {
          const pairKey = `${i},${j}`;
          if (!checkedPairs.has(pairKey)) {
            checkedPairs.add(pairKey);
          }
        }
      });
    });
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Update performance monitor
    if (performanceMonitor) {
      performanceMonitor.update();
    }

    // Update and draw particles
    updateParticles();
    handleCollisions();

    // Draw particles
    particles.forEach((particle: Particle) => {
      if (!particle.active || particleImages.length === 0) return;

      ctx.save();
      ctx.translate(particle.pos.x, particle.pos.y);
      ctx.rotate(particle.rotation);

      const img = particleImages[particle.imgIndex];
      if (img) {
        ctx.drawImage(
          img, 
          -particleSize / 2, 
          -particleSize / 2, 
          particleSize, 
          particleSize
        );
      }

      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Start animation
  useEffect(() => {
    if (particles.length > 0 && particleImages.length > 0) {
      animate();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, particleImages, canvasSize]);

  // Setup particles when dependencies change
  useEffect(() => {
    if (canvasSize.width > 0 && spacing > 0) {
      setupParticles();
    }
  }, [canvasSize, particleCount, spacing]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force particle count function
  const forceParticleCount = (count: number) => {
    setParticleCount(count);
    console.log(`Forced particle count to: ${count}`);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Logo */}
      <div className="absolute top-0 left-0 z-10 p-2">
        <img 
          src="/assets/napptix_logo.png" 
          alt="Napptix Logo" 
          className="h-20 w-auto max-w-[250px] brightness-0 invert transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Header Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white pointer-events-none">
        <p className="text-white uppercase font-normal mb-6 tracking-wider">
          360 Gaming
        </p>
        <h1 className="text-white text-center text-7xl md:text-8xl lg:text-9xl font-normal leading-tight mb-6 tracking-tight">
          Reach Every Gamer
        </h1>
        <button className="border-none outline-none px-12 py-6 uppercase font-medium bg-white text-black rounded-full transition-all duration-200 hover:bg-gray-200 hover:scale-105 focus:outline-2 focus:outline-black pointer-events-auto">
          Let's Talk
        </button>
      </div>

      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0 w-full h-full"
      />

      {/* Debug Controls */}
      <div className="absolute top-4 right-4 z-20 text-white text-sm bg-black/50 p-2 rounded">
        <div>Particles: {particles.length}</div>
        <div>Quality: {performanceMonitor?.getQualityLevel()}</div>
        <div>FPS: {performanceMonitor?.getFPS().toFixed(1)}</div>
        <button 
          onClick={() => forceParticleCount(500)}
          className="mt-2 px-2 py-1 bg-white text-black text-xs rounded hover:bg-gray-200"
        >
          Force 500 Particles
        </button>
      </div>
    </div>
  );
};

export default InteractiveFooter;
