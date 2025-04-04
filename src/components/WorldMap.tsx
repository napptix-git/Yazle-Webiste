
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Location {
  name: string;
  x: number;
  y: number;
  color: string;
}

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  const locations: Location[] = [
    { name: "Singapore", x: 76.5, y: 58.5, color: "#F97316" },
    { name: "Mumbai", x: 70, y: 52, color: "#F97316" },
    { name: "Dubai", x: 65, y: 48, color: "#8B5CF6" },
    { name: "New York", x: 25, y: 42, color: "#0EA5E9" },
    { name: "London", x: 48, y: 35, color: "#8B5CF6" },
    { name: "Tokyo", x: 85, y: 42, color: "#0EA5E9" }
  ];
  
  // World map coordinates as a series of dots
  const worldMapDots = [
    // These are simplified coordinates for a dot-based world map
    // North America
    [15, 30], [16, 30], [17, 30], [18, 31], [19, 32], [20, 33], [21, 34], [22, 35], 
    [23, 36], [24, 37], [25, 38], [26, 39], [27, 40], [28, 40], [29, 40], [30, 40],
    [15, 31], [16, 31], [17, 31], [18, 32], [19, 33], [20, 34], [21, 35], [22, 36],
    [23, 37], [24, 38], [25, 39], [26, 40], [27, 41], [28, 41], [29, 41], [30, 41],
    [15, 32], [16, 32], [17, 32], [18, 33], [19, 34], [20, 35], [21, 36], [22, 37],
    // South America
    [25, 50], [26, 51], [27, 52], [28, 53], [29, 54], [30, 55], [31, 56], [32, 57],
    [25, 51], [26, 52], [27, 53], [28, 54], [29, 55], [30, 56], [31, 57], [32, 58],
    [25, 52], [26, 53], [27, 54], [28, 55], [29, 56], [30, 57], [31, 58], [32, 59],
    [25, 53], [26, 54], [27, 55], [28, 56], [29, 57], [30, 58],
    // Europe
    [45, 30], [46, 30], [47, 30], [48, 31], [49, 31], [50, 32], [51, 32], [52, 33],
    [45, 31], [46, 31], [47, 31], [48, 32], [49, 32], [50, 33], [51, 33], [52, 34],
    [45, 32], [46, 32], [47, 32], [48, 33], [49, 33], [50, 34], [51, 34], [52, 35],
    // Africa
    [48, 40], [49, 41], [50, 42], [51, 43], [52, 44], [53, 45], [54, 46], [55, 47],
    [48, 41], [49, 42], [50, 43], [51, 44], [52, 45], [53, 46], [54, 47], [55, 48],
    [48, 42], [49, 43], [50, 44], [51, 45], [52, 46], [53, 47], [54, 48], [55, 49],
    [56, 50], [57, 51], [58, 52], [59, 53], [60, 54],
    // Asia
    [65, 30], [66, 30], [67, 31], [68, 31], [69, 32], [70, 32], [71, 33], [72, 33],
    [65, 31], [66, 31], [67, 32], [68, 32], [69, 33], [70, 33], [71, 34], [72, 34],
    [73, 35], [74, 35], [75, 36], [76, 36], [77, 37], [78, 37], [79, 38], [80, 38],
    [60, 40], [61, 40], [62, 41], [63, 41], [64, 42], [65, 42], [66, 43], [67, 43],
    [68, 44], [69, 44], [70, 45], [71, 45], [72, 46], [73, 46], [74, 47], [75, 47],
    // Australia
    [80, 60], [81, 60], [82, 61], [83, 61], [84, 62], [85, 62], [86, 63], [87, 63],
    [80, 61], [81, 61], [82, 62], [83, 62], [84, 63], [85, 63], [86, 64], [87, 64]
  ];
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawMap();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    function drawMap() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');  // Purple
      gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.2)'); // Orange
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0.2)');   // Blue
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw world map dots
      worldMapDots.forEach(([x, y]) => {
        const canvasX = (x / 100) * canvas.width;
        const canvasY = (y / 100) * canvas.height;
        
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.7)';
        ctx.fill();
      });
      
      // Draw connection lines between locations with pulsing effect
      const time = Date.now() * 0.001;
      locations.forEach((location, i) => {
        if (i === locations.length - 1) return;
        
        const nextLocation = locations[(i + 1) % locations.length];
        const startX = (location.x / 100) * canvas.width;
        const startY = (location.y / 100) * canvas.height;
        const endX = (nextLocation.x / 100) * canvas.width;
        const endY = (nextLocation.y / 100) * canvas.height;
        
        // Pulsing effect
        const pulseRate = 0.5;
        const pulsePhase = (time * pulseRate + i * 0.2) % 1;
        
        if (pulsePhase < 0.5) {
          const alpha = Math.sin(pulsePhase * Math.PI) * 0.8;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `rgba(41, 221, 59, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw moving dot along the line
          const dotPosition = pulsePhase * 2; // 0 to 1
          const dotX = startX + (endX - startX) * dotPosition;
          const dotY = startY + (endY - startY) * dotPosition;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#29dd3b';
          ctx.fill();
        }
      });
    }
    
    function animate() {
      drawMap();
      requestRef.current = requestAnimationFrame(animate);
    }
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  
  return (
    <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
      
      {locations.map((location, index) => (
        <motion.div
          key={location.name}
          className="absolute flex items-center justify-center z-10"
          style={{
            left: `${location.x}%`,
            top: `${location.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <div 
            className="px-4 py-1 rounded-full text-sm font-medium shadow-lg"
            style={{ backgroundColor: location.color }}
          >
            {location.name}
          </div>
        </motion.div>
      ))}
      
      <motion.h2 
        className="absolute top-0 left-0 w-full text-center text-4xl md:text-5xl mb-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Catch us around the globe
      </motion.h2>
    </div>
  );
};

export default WorldMap;
