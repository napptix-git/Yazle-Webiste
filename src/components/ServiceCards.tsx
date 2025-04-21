import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';
import './ServiceCardsAnimation.css';
import { useIsMobile } from '@/hooks/use-mobile';

const serviceData = [
  {
    id: 'in-game',
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    id: 'on-game',
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    id: 'off-game',
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10 text-[#29dd3b]" />,
  },
  {
    id: 'pro-game',
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10 text-[#29dd3b]" />,
  },
];

const FloatingMobileCard = ({ card, active }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const controls = useAnimation();

  useEffect(() => {
    let anim: ReturnType<typeof setTimeout>;

    const loop = () => {
      controls.start({
        y: [0, -14, 0, 14, 0],
        rotate: [0, -2, 0, 2, 0],
        transition: { duration: 6, ease: "easeInOut", repeat: Infinity }
      });
    };
    loop();
    return () => {
      controls.stop();
      clearTimeout(anim);
    };
  }, [controls]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxTilt = 12;
    tiltX.set(-((y - midY) / midY) * maxTilt);
    tiltY.set(((x - midX) / midX) * maxTilt);
    setIsTouching(true);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsTouching(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-item bg-white text-black rounded-2xl p-8 flex flex-col w-[90vw] max-w-[360px] mx-auto shadow-2xl relative"
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        boxShadow: isTouching
          ? "0 20px 40px -10px rgba(0,0,0,0.20)"
          : "0 10px 20px -5px rgba(0,0,0,0.20)",
      }}
      animate={controls}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center">
          <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mb-6">
            {card.icon}
          </div>
          <h3 className="text-2xl font-bold text-black mb-4">{card.title}</h3>
          <p className="text-gray-600 text-center font-roboto-mono mb-8">
            {card.description}
          </p>
        </div>
        <button 
          className="mt-auto px-6 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors font-roboto-mono"
        >
          Learn more
        </button>
      </div>
    </motion.div>
  );
};

const CardStack = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setInView(true);
        controls.start("visible");
      } else {
        setInView(false);
      }
    }, { threshold: 0.3 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  const handleNext = () => {
    setDirection(1);
    setActiveCard((prev) => (prev + 1) % serviceData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveCard((prev) => (prev - 1 + serviceData.length) % serviceData.length);
  };

  const cardVariants = {
    initial: (custom: number) => ({
      x: custom > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: custom > 0 ? 45 : -45
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    exit: (custom: number) => ({
      x: custom > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotateY: custom > 0 ? -45 : 45,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const currentCard = serviceData[activeCard];

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="w-full flex flex-col items-center justify-center"
      >
        <FloatingMobileCard card={currentCard} active={true} />
        <div className="flex justify-center gap-3 mt-8">
          <button 
            className="rounded-full bg-black/20 p-3 text-black hover:bg-black/30 transition-colors"
            onClick={() => {
              setDirection(-1);
              setActiveCard((prev) => (prev - 1 + serviceData.length) % serviceData.length);
            }}
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {serviceData.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${activeCard === idx ? 'bg-[#29dd3b]' : 'bg-black/10'}`}
              onClick={() => { setDirection(idx > activeCard ? 1 : -1); setActiveCard(idx); }}
              aria-label={`Select card ${idx + 1}`}
            />
          ))}
          <button 
            className="rounded-full bg-black/20 p-3 text-black hover:bg-black/30 transition-colors"
            onClick={() => {
              setDirection(1);
              setActiveCard((prev) => (prev + 1) % serviceData.length);
            }}
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      className="card-stack-container relative"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
          }
        }
      }}
      initial="hidden"
      animate={controls}
    >
      <div className="card-viewport relative w-full h-[500px] flex items-center justify-center">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentCard.id}
            className="card-item bg-white text-black rounded-2xl p-8 flex flex-col absolute w-[300px] md:w-[400px] shadow-2xl"
            custom={direction}
            variants={{
              initial: (custom) => ({
                x: custom > 0 ? 1000 : -1000,
                opacity: 0,
                scale: 0.5,
                rotateY: custom > 0 ? 45 : -45
              }),
              animate: {
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              },
              exit: (custom) => ({
                x: custom > 0 ? -1000 : 1000,
                opacity: 0,
                scale: 0.5,
                rotateY: custom > 0 ? -45 : 45,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }),
              hover: {
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
          >
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex flex-col items-center">
                <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {currentCard.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{currentCard.title}</h3>
                <p className="text-gray-600 text-center font-roboto-mono mb-8">
                  {currentCard.description}
                </p>
              </div>
              <button 
                className="mt-auto px-6 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors font-roboto-mono"
              >
                Learn more
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button 
          className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all"
          onClick={handlePrev}
          aria-label="Previous card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        <button 
          className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all"
          onClick={handleNext}
          aria-label="Next card"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      
      <div className="flex justify-center mt-8 space-x-2">
        {serviceData.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${activeCard === index ? 'bg-[#29dd3b]' : 'bg-white/30'}`}
            onClick={() => {
              setDirection(index > activeCard ? 1 : -1);
              setActiveCard(index);
            }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  return (
    <section 
      id="solutions" 
      className="py-32 bg-black relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto text-center mb-16 z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
        <CardStack />
      </div>
    </section>
  );
};

export default ServiceCards;
