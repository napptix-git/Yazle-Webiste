
import React, { useState, useEffect } from 'react';
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
      address: "123 Marine Drive, Mumbai, Maharashtra 400001, India",
      x: 65.2,
      y: 51.5
    },
    {
      city: "Dubai",
      address: "456 Sheikh Zayed Road, Dubai, UAE",
      x: 58.5,
      y: 48
    },
    {
      city: "Delhi",
      address: "789 Connaught Place, New Delhi 110001, India",
      x: 67,
      y: 48
    },
    {
      city: "Singapore",
      address: "10 Marina Boulevard, Singapore 018983",
      x: 72,
      y: 57.5
    }
  ];
  
  const [activeRegion, setActiveRegion] = useState("Worldwide");
  const [lineProgress, setLineProgress] = useState<{ [key: string]: number }>({});
  
  useEffect(() => {
    // Animate the connection lines between cities
    const timer = setTimeout(() => {
      offices.forEach((office, i) => {
        if (i < offices.length - 1) {
          setTimeout(() => {
            setLineProgress(prev => ({ 
              ...prev, 
              [`${office.city}-${offices[i+1].city}`]: 1 
            }));
          }, i * 1000);
        }
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filterOfficesByRegion = (region: string) => {
    if (region === "Worldwide") return offices;
    
    const regionMap: {[key: string]: string[]} = {
      "Asia": ["Mumbai", "Delhi", "Singapore"],
      "Middle East": ["Dubai"]
    };
    
    return offices.filter(office => regionMap[region]?.includes(office.city));
  };
  
  const filteredOffices = filterOfficesByRegion(activeRegion);
  
  const drawLine = (start: Office, end: Office, progress: number) => {
    const lineKey = `${start.city}-${end.city}`;
    
    return (
      <motion.path
        key={lineKey}
        d={`M${start.x}% ${start.y}% L${end.x}% ${end.y}%`}
        fill="none"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: lineProgress[lineKey] || 0 }}
        transition={{ duration: 1 }}
      />
    );
  };
  
  return (
    <div className="relative w-full max-w-6xl mx-auto mb-20">
      <div className="relative w-full">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <img 
            src="/lovable-uploads/4cd66301-b585-4147-b394-e874eec88954.png" 
            alt="World Map" 
            className="w-full object-contain brightness-150" 
          />
          
          <svg 
            className="absolute top-0 left-0 w-full h-full" 
            style={{ pointerEvents: 'none' }}
          >
            {offices.map((start, i) => 
              offices.slice(i + 1).map(end => 
                drawLine(start, end, lineProgress[`${start.city}-${end.city}`] || 0)
              )
            )}
          </svg>
          
          {filteredOffices.map((office, index) => (
            <motion.div
              key={office.city}
              className="absolute z-20"
              style={{
                left: `${office.x}%`,
                top: `${office.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="relative">
                <MapPin 
                  className="w-8 h-8 text-white -translate-x-1/2 -translate-y-1/2" 
                  fill="rgba(255,255,255,0.2)"
                />
                <div className="absolute w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" 
                     style={{ top: '50%', left: '50%' }}
                />
                <div className="absolute w-8 h-8 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"
                     style={{ top: '50%', left: '50%' }}
                />
                <div className="text-white font-medium text-sm absolute -translate-x-1/2 translate-y-2">
                  {office.city}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 space-y-8">
        {filteredOffices.map((office) => (
          <div key={office.city} className="border-b border-white/20 pb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <h3 className="text-4xl md:text-5xl font-syne font-extrabold mb-4 md:mb-0">{office.city}</h3>
              <p className="text-xl max-w-md">{office.address}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        {["Worldwide", "Asia", "Middle East"].map((region) => (
          <button
            key={region}
            className={`px-6 py-2 rounded-full text-lg transition-all ${
              region === activeRegion 
                ? "bg-white text-black" 
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setActiveRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;
