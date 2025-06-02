
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: any;
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  // Split text into lines
  const lines = text.split('\n');
  // State: array of arrays, each line is an array of chars
  const [displayLines, setDisplayLines] = useState(lines.map(line => line.split('')));
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const totalLength = lines.reduce((acc, line) => acc + line.length, 0);
    const interval = setInterval(() => {
      if (!animateOnLoad && isFirstRender.current) {
        clearInterval(interval);
        isFirstRender.current = false;
        return;
      }
      if (iterations.current < totalLength) {
        let charCount = 0;
        setDisplayLines(
          lines.map((line) =>
            line.split('').map((l, i) => {
              if (l === ' ') {
                charCount++;
                return l;
              }
              if (charCount <= iterations.current) {
                charCount++;
                return l;
              }
              charCount++;
              return alphabets[getRandomInt(26)];
            })
          )
        );
        iterations.current = iterations.current + 0.1;
      } else {
        setTrigger(false);
        clearInterval(interval);
      }
    }, duration / (totalLength * 10));

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div
      className={cn(
        "overflow-hidden py-2 flex flex-col cursor-default scale-100",
        className,
      )}
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="wait">
        {displayLines.map((lineArr, lineIdx) => (
          <span key={lineIdx} className="block">
            {lineArr.map((letter, i) => (
              <motion.span
                key={i}
                className={cn("font-mono", letter === " " ? "w-3" : "")}
                {...framerProps}
              >
                {letter.toUpperCase()}
              </motion.span>
            ))}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
}