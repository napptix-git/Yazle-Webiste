
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/news');
    window.scrollTo(0, 0);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#29dd3b]/10 border-b border-[#29dd3b]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-xl">🎮</span>
            <p className="text-white font-syne">
              Breaking News: Napptix Acquires Yezel to Revolutionize Gaming Advertising! 
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReadMore}
              className="text-[#29dd3b] hover:text-[#29dd3b]/80 text-sm font-syne transition-colors"
            >
              Read More →
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
