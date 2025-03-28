
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    setMounted(true);
    
    // Function to update mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Hide the default cursor
    document.body.style.cursor = 'none';
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  // Don't render on server-side
  if (!mounted) return null;
  
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
        restDelta: 0.001
      }}
    >
      {/* Main cursor circle with gradient border */}
      <div className="relative w-8 h-8 rounded-full">
        {/* Background with transparency */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
        
        {/* Gradient border ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background: 'linear-gradient(45deg, #8B5CF6, #F97316, #0EA5E9) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </motion.div>
  );
};

export default CustomCursor;
