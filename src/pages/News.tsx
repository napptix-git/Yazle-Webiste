
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const News: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Latest News</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <article className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <div className="mb-4">
              <span className="text-[#29dd3b] text-sm">April 24, 2025</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Napptix Launches New Interactive Ad Platform</h2>
            <p className="text-gray-300 mb-4">
              Today marks a significant milestone in gaming advertising as we launch our revolutionary interactive ad platform, designed to transform how brands connect with gamers.
            </p>
          </article>

          <article className="bg-napptix-dark p-8 rounded-xl border border-napptix-grey/20">
            <div className="mb-4">
              <span className="text-[#29dd3b] text-sm">April 20, 2025</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Expanding Our Global Presence</h2>
            <p className="text-gray-300 mb-4">
              We're excited to announce the opening of our new offices in Singapore and Dubai, strengthening our presence in key gaming markets across Asia and the Middle East.
            </p>
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
