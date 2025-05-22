
import React, { forwardRef } from 'react';

interface FlipCardProps {
  id: string;
  frontImage: string;
  backText: string;
  isActive?: boolean;
}

// GIF mapping based on card type
const cardGifs = {
  "IN-GAME": "/lovable-uploads/inGame.gif", // Gaming controller gif
  "ON-GAME": "/lovable-uploads/onGame.gif", // Interface display gif
  "OFF-GAME": "/lovable-uploads/offGame.gif", // Network/connection gif
  "PRO-GAME": "/lovable-uploads/proGame.gif"  // Tournament/trophy gif
};

const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ id, frontImage, backText, isActive = false }, ref) => {
    const gifUrl = cardGifs[backText as keyof typeof cardGifs] || "";
    
    return (
      <div className="flip-card" id={id} ref={ref as React.RefObject<HTMLDivElement>}>
        <div className={`flip-card-wrapper ${isActive ? 'active' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front border-[1px] border-[#FFFFFF] rounded-2xl overflow-hidden">
              <div className="w-full h-full flex flex-col relative">
                <img 
                  src={frontImage} 
                  alt={`${backText} card`}
                  className="w-full h-full object-cover absolute inset-0 z-0"
                />
                
                {/* Semi-transparent overlay for better visibility */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                {/* Empty front card - no text as requested */}
                <div className="relative z-20 flex flex-col h-full p-6 justify-center">
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flex flex-col items-center justify-center h-full">
                {/* Larger rectangular GIF in the back */}
                <div className="w-full h-3/4 overflow-hidden bg-black/30 rounded-md relative">
                {gifUrl.endsWith('.mov') ? (
                    <video
                      src={gifUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={gifUrl}
                      alt={`${backText} animation`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FlipCard.displayName = 'FlipCard';

export default FlipCard;
