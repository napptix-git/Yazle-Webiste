
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Card3DAnimation.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: 'In-Game',
    content: 'Native ad placements within the gaming environment that feel like a natural part of the experience.',
    icon: '🎮',
    image: '/lovable-uploads/8354ca7f-1dcf-4c35-bc7d-7fb04f9c9254.png',
  },
  {
    title: 'On-Game',
    content: 'Strategic ad placements around the game interface, loading screens, and menus.',
    icon: '🖥️',
    image: '/lovable-uploads/6e100c42-279f-4ff0-8321-04d4fcd5505d.png',
  },
  {
    title: 'Off-Game',
    content: 'Advertising strategies outside the gameplay such as on companion apps, forums, and esports platforms.',
    icon: '📱',
    image: '/lovable-uploads/7e606c44-61cb-46c1-9563-29b2a6d7b82e.png',
  },
  {
    title: 'Pro Game',
    content: 'Specialized solutions for esports events, tournaments, and professional gaming streams.',
    icon: '🏆',
    image: '/lovable-uploads/9d37880a-6199-4554-aaa7-8ec093ad6bb8.png',
  },
];

export const Card3DAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing ScrollTrigger instances to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const ctx = gsap.context(() => {
      // First, create the pin for the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // Make it longer for more scroll distance
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        // When the animation completes, it will seamlessly restart
        onLeaveBack: (self) => self.scroll(self.end - 0.01),
        onLeave: (self) => self.scroll(self.start + 0.01)
      });
      
      // Set initial position of cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.set(card, {
          rotateY: -30,
          z: -100 * (cards.length - i),
          opacity: i === 0 ? 0.5 : 0.3 - (i * 0.1),
          scale: 0.8 - (i * 0.05),
        });
      });
      
      // Create animations for each card
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        
        // Card comes into view
        gsap.to(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top top+=${i * 150}`,
            end: `+=${window.innerHeight * 0.7}`,
            scrub: 0.5,
          },
          z: 0,
          rotateY: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          onComplete: () => {
            card.classList.add('active');
          }
        });
        
        // If not the last card, animate it out when next card comes in
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top top+=${(i + 1) * 150}`,
              end: `+=${window.innerHeight * 0.7}`,
              scrub: 0.5,
            },
            z: 100,
            opacity: 0,
            rotateY: 30,
            x: i % 2 === 0 ? -300 : 300, // Alternate exit directions
            scale: 0.8,
            ease: "power2.in",
          });
        }
        
        // If it's the last card, create a transition back to the first card
        if (i === cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top top+=${(i + 2) * 150}`,
              end: `+=${window.innerHeight * 0.7}`,
              scrub: 0.5,
            },
            z: 100,
            opacity: 0,
            rotateY: 30,
            x: i % 2 === 0 ? -300 : 300,
            scale: 0.8,
            ease: "power2.in",
          });
        }
      });
      
      // Reset animation for infinite loop
      gsap.set(cardRefs.current[0], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top top+=${(cards.length + 2) * 150}`,
          scrub: 0.5,
        },
        z: -100 * cards.length,
        rotateY: -30,
        opacity: 0.5,
        scale: 0.8,
        x: 0,
        immediateRender: false,
      });
    }, containerRef);
    
    // Clean up function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section 
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="text-center mb-12 z-10">
        <h2 className="text-4xl font-bold mb-2">Our Services</h2>
        <p className="text-lg text-slate-400 text-center max-w-xl">
          Comprehensive advertising solutions across the gaming ecosystem
        </p>
      </div>
      
      <div
        ref={containerRef}
        className="card-container relative h-[110vh] w-full flex items-center justify-center"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="card-item absolute w-80 h-96 shadow-3d rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full bg-white text-black flex flex-col">
              {card.image ? (
                <div className="w-full h-full relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-center text-white">{card.title}</h3>
                    <p className="text-sm text-center text-gray-300">{card.content}</p>
                    <button className="mt-6 bg-[#29dd3b] text-black px-4 py-2 rounded-full hover:bg-[#29dd3b]/80 transition-colors">
                      Learn more
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 h-full">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
                  <p className="text-sm text-center text-gray-600">{card.content}</p>
                  <button className="mt-6 bg-black text-white px-4 py-2 rounded-full hover:bg-black/80 transition-colors">
                    Learn more
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card3DAnimation;
