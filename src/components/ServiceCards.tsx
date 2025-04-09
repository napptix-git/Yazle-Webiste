
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceData = [
  {
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10 text-[#29dd3b]" />,
  },
];

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceProps & { 
  progress: number;
  stacked: boolean;
}> = ({ 
  title, 
  description, 
  icon,
  index,
  progress,
  stacked
}) => {
  const flipThreshold = 0.5;
  const isFlipped = progress > flipThreshold;
  
  const stackOffset = stacked ? (3 - index) * 10 : 0;
  
  const cardVariants = {
    stacked: {
      x: stackOffset,
      y: stackOffset,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.5 }
    },
    flipping: {
      x: 0,
      y: 0,
      scale: 1,
      rotateY: progress * 180,
      transition: { duration: 0, ease: "linear" }
    }
  };
  
  return (
    <motion.div
      className="service-card absolute top-0 left-0 w-[280px] h-[400px]"
      style={{ 
        zIndex: stacked ? 4 - index : (isFlipped ? 10 : 4 - index),
        transformStyle: "preserve-3d",
        transformOrigin: "center center"
      }}
      variants={cardVariants}
      animate={stacked ? "stacked" : "flipping"}
    >
      <div 
        className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden 
          bg-white ${progress > flipThreshold ? 'invisible' : 'visible'}`}
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-col justify-center items-center h-full">
          <div className="text-black text-xl font-bold tracking-tight">
            {title}
          </div>
        </div>
      </div>
      
      <div 
        className={`absolute w-full h-full bg-white text-black rounded-xl overflow-hidden shadow-xl border border-white/10 backface-visibility-hidden
          ${progress > flipThreshold ? 'visible' : 'invisible'}`}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex flex-col items-center">
            <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-4">
              {icon}
            </div>
            
            <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
            
            <p className="text-gray-600 text-center font-roboto-mono">{description}</p>
          </div>
          
          <button 
            className="mt-4 px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors font-roboto-mono"
          >
            Learn more
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardProgress, setCardProgress] = useState<number[]>([0, 0, 0, 0]);
  const [isStacked, setIsStacked] = useState(true);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Clean up existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Create overall scroll progress tracker
    const mainTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        // Unstack cards when scroll reaches 15%
        setIsStacked(progress < 0.15);
        
        // Calculate individual card progress
        const newProgress = [...cardProgress];
        serviceData.forEach((_, i) => {
          // Normalize progress for each card - staggered flipping
          const cardStartPoint = 0.15 + (i * 0.15); // Start at 15%, then 30%, 45%, 60%
          const cardEndPoint = cardStartPoint + 0.15;
          const normalizedProgress = gsap.utils.clamp(0, 1, 
            gsap.utils.mapRange(cardStartPoint, cardEndPoint, 0, 1, progress)
          );
          newProgress[i] = normalizedProgress;
        });
        
        setCardProgress(newProgress);
      }
    });

    return () => {
      sectionTrigger.kill();
      mainTrigger.kill();
    };
  }, [cardProgress]);

  return (
    <section 
      id="solutions" 
      className="py-32 bg-black relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto text-center mb-16 z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-2xl mx-auto font-roboto-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Comprehensive advertising solutions across the gaming ecosystem
        </motion.p>
      </div>
      
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center z-10">
        <div 
          ref={cardsContainerRef}
          className="relative w-[280px] h-[400px]"
          style={{
            perspective: "1200px"
          }}
        >
          {serviceData.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              index={index}
              progress={cardProgress[index]}
              stacked={isStacked}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
