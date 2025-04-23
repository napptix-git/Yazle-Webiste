import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipCard from './FlipCard';
import './FlipCardAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCardSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const serviceData = [
    { id: "in-game", title: "In-Game" },
    { id: "on-game", title: "On-Game" },
    { id: "off-game", title: "Off-Game" },
    { id: "pro-game", title: "Pro-Game" }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current || cardsRef.current.length < 4) return;

    // Cleanup any previous triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const totalScrollHeight = window.innerHeight * 2.5;

    if (isMobile) {
      // 📱 Mobile Animation
      const yOffsets = [0, 300, 500, 700];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScrollHeight}px`,
        pin: true,
        pinSpacing: true,
      });

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 0, rotate: 0 },
          {
            y: yOffsets[index],
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${window.innerHeight}`,
              scrub: 0.5,
              id: `mobile-expand-${index}`,
            },
          }
        );

        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        if (!frontEl || !backEl) return;

        const staggerOffset = index * 0.05;
        const startOffset = 0.4 + staggerOffset;
        const endOffset = 0.7 + staggerOffset;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScrollHeight}px`,
          scrub: 1,
          id: `flip-mobile-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const flipProgress = (progress - startOffset) / (endOffset - startOffset);
              const frontRotation = -180 * flipProgress;
              const backRotation = 180 - 180 * flipProgress;

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
            }
          }
        });
      });

    } else {
      // 🖥️ Desktop Animation
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScrollHeight}px`,
        pin: true,
        pinSpacing: true,
      });

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { left: "50%", rotation: 0 },
          {
            left: `${positions[index]}%`,
            rotation: rotations[index],
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${window.innerHeight * 0.8}px`,
              scrub: 0.5,
              id: `spread-${index}`,
            },
          }
        );
      });

      cardsRef.current.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        if (!frontEl || !backEl) return;

        const staggerOffset = index * 0.05;
        const startOffset = 0.4 + staggerOffset;
        const endOffset = 0.7 + staggerOffset;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "center bottom",
          end: `+=${totalScrollHeight}px`,
          scrub: 1,
          id: `flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const flipProgress = (progress - startOffset) / (endOffset - startOffset);
              const frontRotation = -180 * flipProgress;
              const backRotation = 180 - 180 * flipProgress;
              const cardRotation = rotations[index] * (1 - flipProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, { rotate: cardRotation, ease: "power1.out" });
            }
          }
        });
      });
    }

    setIsInitialized(true);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, cardsRef.current.length]);

  return (
    <div className="relative h-[350vh]" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black" ref={sectionRef}>
        <div className="absolute top-[130px] w-full text-center z-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-gray-400 pt-3 max-w-2xl mx-auto">
            Seamless brand integration across every layer of the gaming journey.
          </p>
        </div>

        {isMobile ? (
          <div className="w-full flex flex-col items-center gap-10 px-4 py-10">
            {serviceData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="w-full max-w-xs relative"
              >
                <FlipCard
                  id={`card-${index + 1}`}
                  frontImage="/lovable-uploads/7463cd87-d84d-4f7a-b845-8389ab62e8fb.png"
                  backText={service.title}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="cards-container relative w-full h-[80%] flex items-center justify-center">
            {serviceData.map((service, index) => (
              <FlipCard
                key={service.id}
                id={`card-${index + 1}`}
                frontImage="/lovable-uploads/card.jpg"
                backText={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCardSection;
