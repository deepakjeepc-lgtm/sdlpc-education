import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import InteractiveSDLPC from './InteractiveSDLPC';

export default function Hero({ onOpenRegister, onScrollToResources }) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-center pt-24 pb-16 px-6 sm:px-10 overflow-hidden w-full">
      {/* Central Iconic Giant SDLPC Display Letters */}
      <InteractiveSDLPC />

      {/* Clean High-Conversion Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto z-10"
      >
        <button
          onClick={onOpenRegister}
          className="w-full sm:w-auto group px-10 py-4 rounded-full bg-[#ff2d55] text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-[#e0264b] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
        >
          <span>PRE-REGISTER</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <button
          onClick={onScrollToResources}
          className="w-full sm:w-auto px-10 py-4 rounded-full bg-black/5 dark:bg-white/5 text-neutral-900 dark:text-white border border-black/10 dark:border-white/15 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
        >
          <Download className="w-4 h-4 text-neutral-500" />
          <span>RESOURCES</span>
        </button>
      </motion.div>

      {/* 3 Pure Pillars — Zero Labels & Subtitles, Larger Refined Typography */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 mt-20 pt-10 border-t border-black/10 dark:border-white/[0.08] max-w-4xl w-full text-center z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-mono tracking-[0.22em] text-neutral-900 dark:text-white uppercase font-bold">
            DAILY QUIZ
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-mono tracking-[0.22em] text-neutral-900 dark:text-white uppercase font-bold">
            WEEKLY TESTS
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm font-mono tracking-[0.22em] text-neutral-900 dark:text-white uppercase font-bold">
            MONTHLY GRAND MOCKS
          </span>
        </div>
      </motion.div>
    </section>
  );
}
