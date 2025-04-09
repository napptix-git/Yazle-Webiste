
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Office {
  city: string;
  address: string;
  x: number;
  y: number;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    { 
      city: "Mumbai", 
      address: "102, Firdos Apartments, Waroda Road Bandra West, Mumbai, Maharashtra 400050",
      x: 70, 
      y: 58
    },
    { 
      city: "Dubai", 
      address: "302, Building 08, Media City, Dubai",
      x: 62, 
      y: 52
    },
    { 
      city: "Delhi", 
      address: "42-B, Connaught Place, New Delhi, 110001",
      x: 72, 
      y: 48
    },
    { 
      city: "Singapore", 
      address: "8 Marina Gardens Drive, Singapore 018953",
      x: 78, 
      y: 65
    }
  ];
  
  return (
    <div className="relative w-full max-w-4xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-10 text-center">Global Presence</h2>
      
      <div className="relative w-full">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <img 
            src="/lovable-uploads/de1f01a3-c2a1-49bf-89d7-0f5535044663.png" 
            alt="World Map" 
            className="w-full h-full object-cover filter brightness-150 contrast-125 saturate-50 opacity-90"
          />
          
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              className="absolute z-20 flex flex-col items-center"
              style={{
                left: `${office.x}%`,
                top: `${office.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <MapPin size={24} className="text-white filter drop-shadow-lg" />
              <div className="w-2 h-2 bg-white rounded-full mt-1 shadow-white shadow-lg"></div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 space-y-8">
        {offices.map((office) => (
          <div key={office.city} className="border-b border-white/20 pb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <h3 className="text-4xl md:text-5xl font-syne font-extrabold mb-4 md:mb-0">{office.city}</h3>
              <p className="text-xl max-w-md">{office.address}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {["Worldwide", "APAC", "MEA", "Europe", "Americas"].map((region, index) => (
          <button
            key={region}
            className={`px-6 py-2 rounded-full text-lg transition-all ${
              index === 0 
                ? "bg-white text-black" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
