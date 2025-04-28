
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Newspaper } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the announcement has been dismissed before
  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleReadMore = () => {
    navigate('/news');
    window.scrollTo(0, 0);
    toast({
      title: "Navigating to news section",
      description: "Read about our latest acquisition!",
      duration: 2000,
    });
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcementDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#29dd3b]/20 via-[#29dd3b]/40 to-[#29dd3b]/20 border-b border-[#29dd3b]/40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm md:text-base mb-2 sm:mb-0">
            <span className="text-xl animate-pulse">🎮</span>
            <p className="text-white font-syne font-semibold">
              Breaking News: Napptix Acquires Yezel to Revolutionize Gaming Advertising! 
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReadMore}
              className="flex items-center gap-1 bg-[#29dd3b] hover:bg-[#29dd3b]/80 text-black px-3 py-1 rounded-full text-sm font-syne transition-colors font-bold"
            >
              <Newspaper className="h-4 w-4" /> Read More
            </button>
            <button
              onClick={handleDismiss}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
