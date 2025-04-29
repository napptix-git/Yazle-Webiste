import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Newspaper } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from 'framer-motion';

// Define the global interface for the window object
declare global {
  interface Window {
    announcementBarState: {
      isVisible: boolean;
    };
  }
}

// Initialize the global state object
if (typeof window !== 'undefined') {
  window.announcementBarState = window.announcementBarState || { isVisible: true };
}

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // Call the hook here
  

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleReadMore = () => {
    navigate('/news');
    window.scrollTo(0, 0);
  };

  // Update the global state with current visibility
  if (typeof window !== 'undefined') {
    window.announcementBarState.isVisible = isVisible;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 48, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-[#29dd3b]/20 via-[#29dd3b]/40 to-[#29dd3b]/20 border-b border-[#29dd3b]/40 shadow-md fixed top-0 left-0 right-0 z-50"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between py-3">
              <div className="flex items-center gap-2 text-sm md:text-base mb-2 sm:mb-0 sm:pl-[300px]">
                <span className="text-xl animate-pulse">🎮</span>
                <p className="text-white font-syne font-semibold">
                  {isMobile ? "Napptix Acquires Yezel!" : "Breaking News: Napptix Acquires Yezel to Revolutionize Gaming Advertising!"}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handleReadMore}
                  className="flex items-center gap-1 bg-black hover:bg-[#29dd3b]/80 text-white px-3 py-1 rounded-full text-sm font-syne transition-colors font-bold"
                >
                  <Newspaper className="h-3 w-3 sm:h-4 sm:w-4" /> Read More
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss announcement"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
