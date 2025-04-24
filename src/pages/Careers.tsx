
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Careers: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Careers at Napptix</h1>
        <p className="text-xl text-gray-300 mb-12">Join us in revolutionizing gaming advertising</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-4">Why Join Us?</h2>
            <ul className="space-y-4 text-gray-300">
              <li>• Innovative technology environment</li>
              <li>• Global impact in gaming industry</li>
              <li>• Competitive compensation</li>
              <li>• Remote-first culture</li>
              <li>• Continuous learning opportunities</li>
            </ul>
          </div>
          
          <div className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <h2 className="text-2xl font-bold text-white mb-4">Open Positions</h2>
            <div className="space-y-4">
              <p className="text-gray-300">No positions currently available.</p>
              <p className="text-gray-400">
                Check back soon or send your resume to careers@napptix.com for future opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
