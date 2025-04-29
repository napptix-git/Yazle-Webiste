import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Newspaper } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleReadMore = () => {
    navigate('/news');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Reserve vertical space ALWAYS */}
      

      {/* Visually toggle visibility, NOT presence */}
      <div
        className={`bg-gradient-to-r from-[#29dd3b]/20 via-[#29dd3b]/40 to-[#29dd3b]/20 border-b border-[#29dd3b]/40 shadow-md fixed top-0 left-0 right-0 z-50
          ${isVisible ? 'visible opacity-100' : 'invisible opacity-0'}
        `}
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between pl-[450px]">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-pulse">🎮</span>
            <p className="font-semibold">Breaking News: Napptix Acquires Yezel!</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReadMore}
              className="flex items-center gap-1 bg-black hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              Read More
            </button>
            <button
              onClick={handleDismiss}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementBar;
