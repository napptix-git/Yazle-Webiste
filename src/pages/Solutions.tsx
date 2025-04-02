
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Solutions</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6">
          <p>
            Napptix offers cutting-edge advertising solutions specifically designed for the gaming ecosystem. 
            Our platform connects brands with gamers through non-intrusive, native advertising experiences that 
            enhance rather than detract from gameplay.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-2xl font-bold text-white mb-4">In-Game Advertising</h3>
              <p>Native ad placements within the gaming environment that feel like a natural part of the experience.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-2xl font-bold text-white mb-4">On-Game Advertising</h3>
              <p>Strategic ad placements around the game interface, loading screens, and menus.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-2xl font-bold text-white mb-4">Off-Game Advertising</h3>
              <p>Extend your reach beyond gameplay through our network of gaming content platforms.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-2xl font-bold text-white mb-4">Pro Game Advertising</h3>
              <p>Specialized solutions for esports events, tournaments, and professional gaming streams.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Solutions;
