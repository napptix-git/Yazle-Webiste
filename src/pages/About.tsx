
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WorldMap from '@/components/WorldMap';
import { motion } from 'framer-motion';
import StaticParticleCanvas from '@/components/StaticParticle';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: "Innovation First",
      description: "We pioneer cutting-edge advertising solutions that push the boundaries of what's possible in gaming.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543&h=2365&fit=crop"
    },
    {
      title: "Player-Centric Approach",
      description: "Every solution we create enhances the gaming experience rather than interrupting it.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=7952&h=5304&fit=crop"
    },
    {
      title: "Global Mindset",
      description: "Our solutions are designed to work across cultures, markets, and gaming platforms worldwide.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=6000&h=4000&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <StaticParticleCanvas />
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-disket text-white mb-8 text-center">About Napptix</h1>
        <p className="text-xl text-gray-300 mb-12 text-center font-productSans max-w-3xl mx-auto">
          Revolutionizing the intersection of gaming and advertising through innovative, 
          non-intrusive solutions that enhance player experiences.
        </p>
        
        {/* Global Presence Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-disket text-white mb-8 text-center">Our Global Presence</h2>
          <p className="text-xl text-gray-300 mb-12 text-center font-productSans max-w-3xl mx-auto">
            With offices strategically located across key markets, we deliver localized solutions 
            that resonate with gaming communities worldwide.
          </p>
          
          <WorldMap />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 text-center">
              <h3 className="text-xl font-disket text-white mb-2">Mumbai</h3>
              <p className="text-gray-300 font-productSans">India</p>
            </div>
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 text-center">
              <h3 className="text-xl font-disket text-white mb-2">Dubai</h3>
              <p className="text-gray-300 font-productSans">United Arab Emirates</p>
            </div>
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 text-center">
              <h3 className="text-xl font-disket text-white mb-2">Delhi</h3>
              <p className="text-gray-300 font-productSans">India</p>
            </div>
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 text-center">
              <h3 className="text-xl font-disket text-white mb-2">Singapore</h3>
              <p className="text-gray-300 font-productSans">Singapore</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-disket text-white mb-8 text-center pt-16">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20 hover:border-[#29dd3b]/50 transition-all duration-300"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src={value.image} 
                  alt={value.title} 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl text-white font-disket mb-3">{value.title}</h3>
              <p className="text-gray-300 font-productSans">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-disket text-white mb-8">Ready to Transform Your Gaming Advertising?</h2>
          <p className="text-gray-300 mb-8 font-productSans">
            Join the brands that are already revolutionizing their approach to gaming marketing.
          </p>
          <button 
            onClick={() => window.location.href = "/contact"}
            className="bg-[#29dd3b] text-black px-8 py-3 rounded-full font-bold hover:bg-[#29dd3b]/80 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
