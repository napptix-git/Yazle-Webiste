import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Office {
  city: string;
  address: string;
  x: number;
  y: number;
}

const WorldMap: React.FC = () => {
  const offices: Office[] = [
    // Other cities can be added here in the future if needed
  ];
  
  const [activeRegion, setActiveRegion] = useState("Worldwide");
  
  const filterOfficesByRegion = (region: string) => {
    if (region === "Worldwide") return offices;
    
    const regionMap: {[key: string]: string[]} = {
      // Removed regions since we don't have any cities currently
    };
    
    return offices.filter(office => regionMap[region]?.includes(office.city));
  };
  
  const filteredOffices = filterOfficesByRegion(activeRegion);
  
  return (
    <div className="relative w-full max-w-5xl mx-auto mb-20">
      <h2 className="text-4xl md:text-5xl font-syne font-extrabold mb-10 text-center">Global Presence</h2>
      
      <div className="relative w-full">
        <div className="w-full aspect-[2/1] overflow-hidden relative">
          <img 
            src="/lovable-uploads/4cd66301-b585-4147-b394-e874eec88954.png" 
            alt="World Map" 
            className="w-full object-contain"
          />
          
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
                <div className="absolute w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-8 h-8 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                <div className="text-white font-medium text-sm absolute whitespace-nowrap translate-y-2">
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
      
      {/* Only show region selector if we have offices */}
      {offices.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          {["Worldwide", "APAC", "MEA", "Europe", "Americas"].map((region) => (
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
      )}
    </div>
  );
};

export default WorldMap;
