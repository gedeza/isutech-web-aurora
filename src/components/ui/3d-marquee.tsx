import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThreeDMarqueeProps {
  items: { src: string; alt: string }[];
  className?: string;
  speed?: number;
}

export function ThreeDMarquee({ items, className, speed = 40 }: ThreeDMarqueeProps) {
  // Duplicate items array a few times to ensure infinite scroll fills screen
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden flex items-center justify-start [perspective:1200px]", 
        className
      )}
    >
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Tilted continuous track */}
      <motion.div
        className="flex gap-12 items-center w-full"
        style={{
          rotateX: "15deg",
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center w-40 h-20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 transform-gpu"
            style={{ translateZ: "20px" }}
          >
            <img 
              src={item.src} 
              alt={item.alt} 
              className="max-h-full max-w-full object-contain dark:invert" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
