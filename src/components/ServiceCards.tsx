
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Gamepad, 
  MonitorPlay, 
  Globe, 
  Trophy,
} from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const serviceData = [
  {
    title: "In-Game",
    description: "Native ad placements within the gaming environment that feel like a natural part of the experience.",
    icon: <Gamepad className="h-10 w-10" />,
    color: "bg-napptix-purple",
  },
  {
    title: "On-Game",
    description: "Strategic ad placements around the game interface, loading screens, and menus.",
    icon: <MonitorPlay className="h-10 w-10" />,
    color: "bg-napptix-orange",
  },
  {
    title: "Off-Game",
    description: "Extend your reach beyond gameplay through our network of gaming content platforms.",
    icon: <Globe className="h-10 w-10" />,
    color: "bg-napptix-blue",
  },
  {
    title: "Pro Game",
    description: "Specialized solutions for esports events, tournaments, and professional gaming streams.",
    icon: <Trophy className="h-10 w-10" />,
    color: "bg-green-500",
  },
];

const ServiceCard: React.FC<ServiceProps> = ({ 
  title, 
  description, 
  icon, 
  color,
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  
  return (
    <motion.div
      ref={cardRef}
      className="flex-1 min-w-[250px] max-w-xs rounded-xl overflow-hidden"
      initial={{ opacity: 0, x: 50, rotateY: 180 }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { 
          delay: index * 0.2,
          duration: 0.7,
          type: "spring"
        }
      } : {}}
    >
      <div className="bg-white shadow-lg rounded-xl h-full transform transition-all duration-500 preserve-3d">
        <div className="p-6 flex flex-col h-full">
          <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
          <button className="mt-4 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">
            Learn more
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServiceCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 0.3], ["0%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  
  return (
    <section id="solutions" className="py-24 bg-white" ref={containerRef}>
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-napptix-dark">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive advertising solutions across the gaming ecosystem
        </p>
      </div>
      
      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="flex flex-nowrap gap-6 justify-center overflow-x-auto pb-8 px-4"
          style={{ x }}
        >
          {serviceData.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServiceCards;
