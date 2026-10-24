import React, { useState } from 'react';
import { motion } from 'framer-motion';

const letters = ['S', 'D', 'L', 'P', 'C'];

export default function InteractiveSDLPC() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="relative flex items-center justify-center my-8 sm:my-12 md:my-16 select-none w-full">
      {/* Main Kinetic Typography Row - Ultra Large, Tighter Spacing, Zero Background Blur/Shadow */}
      <div className="relative flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 z-10">
        {letters.map((char, index) => {
          const isHovered = hoveredIdx === index;
          return (
            <motion.div
              key={char}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(index)}
              onTouchEnd={() => setTimeout(() => setHoveredIdx(null), 800)}
              className="relative cursor-pointer group flex items-center justify-center py-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Bold Display Letter: Ultra Large, Pure Crisp Color Transition, Zero Blurry Shadow */}
              <motion.div
                whileHover={{
                  y: -12,
                  scale: 1.08,
                }}
                whileTap={{
                  y: -6,
                  scale: 1.03,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 24,
                }}
                className={`text-7xl sm:text-9xl md:text-[12rem] lg:text-[15rem] xl:text-[17rem] font-bold tracking-tighter leading-none transition-colors duration-200 ${
                  isHovered
                    ? 'text-[#ff2d55]'
                    : 'text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white'
                }`}
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                {char}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
