
import React, { forwardRef } from 'react';

interface FlipCardProps {
  id: string;
  frontImage: string;
  backText: string;
  isActive?: boolean;
}

const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ id, frontImage, backText, isActive = false }, ref) => {
    return (
      <div className="flip-card" id={id} ref={ref as React.RefObject<HTMLDivElement>}>
        <div className={`flip-card-wrapper ${isActive ? 'active' : ''}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img 
                src={frontImage} 
                alt={`${backText} card`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flip-card-back">
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-3xl font-bold mb-4">{backText}</h3>
                <p className="text-lg text-center px-6">
                  {backText === "In-Game" && "Native ad placements within the gaming environment."}
                  {backText === "On-Game" && "Strategic ad placements around the game interface."}
                  {backText === "Off-Game" && "Extend your reach beyond gameplay through our network."}
                  {backText === "Pro-Game" && "Specialized solutions for esports events and tournaments."}
                </p>
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
