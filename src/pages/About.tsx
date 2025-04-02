
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About Us</h1>
        <div className="text-napptix-light-grey font-roboto-mono space-y-6">
          <p>
            Napptix is a pioneering force in the gaming advertising industry, dedicated to creating
            meaningful connections between brands and gamers through innovative advertising solutions.
          </p>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Mission</h2>
          <p>
            To revolutionize gaming advertising by developing technologies that enhance rather than
            interrupt the gaming experience, creating value for players, developers, and advertisers alike.
          </p>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-6">Our Team</h2>
          <p>
            Founded by passionate gamers and advertising professionals, our team combines deep industry
            knowledge with technical expertise to deliver cutting-edge solutions for the gaming ecosystem.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p>We constantly push the boundaries of what's possible in gaming advertising.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
              <p>We prioritize transparency and ethical practices in all our operations.</p>
            </div>
            
            <div className="bg-napptix-dark p-6 rounded-xl border border-napptix-grey/20">
              <h3 className="text-xl font-bold text-white mb-4">Player-First</h3>
              <p>We believe that advertising should enhance, not detract from, the gaming experience.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
