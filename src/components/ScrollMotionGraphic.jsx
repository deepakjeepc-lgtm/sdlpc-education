import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ScrollMotionGraphic() {
  const { scrollYProgress } = useScroll();

  // Butter-smooth spring interpolation for zero lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.35, 0.85]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 180]);
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.35, 0.65, 0.45, 0.25]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Dynamic Scroll-Driven Organic Luminous Graphic */}
      <motion.div
        style={{
          scale,
          rotate,
          y,
          opacity,
        }}
        className="relative w-[360px] sm:w-[540px] md:w-[720px] h-[360px] sm:h-[540px] md:h-[720px]"
      >
        {/* Core Radiance Layer 1 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff2d55]/20 via-[#ff2d55]/10 to-transparent blur-3xl dark:from-[#ff2d55]/25 dark:via-red-600/10 dark:to-transparent" />

        {/* Core Radiance Layer 2 (Rotational Offset) */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-transparent via-[#ff2d55]/15 to-[#ff2d55]/5 blur-2xl" />

        {/* Minimal Geometric Ring Graphic */}
        <div className="absolute inset-16 rounded-full border border-black/5 dark:border-white/5 opacity-60" />
        <div className="absolute inset-28 rounded-full border border-dashed border-[#ff2d55]/20 opacity-40 animate-[spin_60s_linear_infinite]" />
      </motion.div>
    </div>
  );
}
