import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';

export default function DailyWeeklyMonthlyHub({ onOpenCbt, onOpenRegister }) {
  return (
    <section id="test-hub" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/10 dark:border-white/[0.08]">
      {/* Title - Zero Subtitle, Zero Labels */}
      <div className="mb-14">
        <h2 
          className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          TEST PROTOCOLS
        </h2>
      </div>

      {/* Grid of 3 Pure Cards - NO top subtitles, NO extra clutter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* CARD 1: DAILY PRACTICE QUIZ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#0b0b0e] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/25 shadow-sm transition-all duration-300"
        >
          <div>
            <h3 
              className="text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white mb-8"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              DAILY PRACTICE QUIZ
            </h3>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>15 QUESTIONS</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>15 MINUTES</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>INSTANT SOLUTIONS</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
            </div>
          </div>

          {/* Action button to open full CBT Test */}
          <button
            onClick={onOpenCbt}
            className="w-full py-4 px-4 rounded-xl bg-[#ff2d55] text-white hover:bg-[#e0264b] text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer shadow-sm"
          >
            <span>START CBT TEST</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* CARD 2: WEEKLY CBT TEST SERIES */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#101017] border border-[#ff2d55]/40 shadow-sm transition-all duration-300"
        >
          <div>
            <h3 
              className="text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white mb-8"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              WEEKLY CBT TEST SERIES
            </h3>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>100 QUESTIONS</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>SUNDAY 10:00 AM</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>PERCENTILE RANKING</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
            </div>
          </div>

          {/* Action button with Lock SVG & Unlock Date Only */}
          <button
            onClick={() => onOpenRegister('WEEKLY CBT TEST SERIES')}
            className="w-full py-4 px-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-[#ff2d55] text-neutral-900 dark:text-neutral-200 hover:text-white border border-black/10 dark:border-white/10 hover:border-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#ff2d55] group-hover:text-white transition-colors" />
              <span>UNLOCKS 28 OCT 2026</span>
            </div>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

        {/* CARD 3: MONTHLY GRAND BENCHMARK */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white dark:bg-[#0b0b0e] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/25 shadow-sm transition-all duration-300"
        >
          <div>
            <h3 
              className="text-xl sm:text-2xl font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white mb-8"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              MONTHLY GRAND BENCHMARK
            </h3>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>FULL SYLLABUS</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>ALL-INDIA POOL</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
              <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/[0.04] text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-600 dark:text-neutral-400 uppercase">
                <span>SIMULATED EXAM UI</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              </div>
            </div>
          </div>

          {/* Action button with Lock SVG & Unlock Date Only */}
          <button
            onClick={() => onOpenRegister('MONTHLY GRAND BENCHMARK')}
            className="w-full py-4 px-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-[#ff2d55] text-neutral-900 dark:text-neutral-200 hover:text-white border border-black/10 dark:border-white/10 hover:border-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-[#ff2d55] group-hover:text-white transition-colors" />
              <span>UNLOCKS 30 NOV 2026</span>
            </div>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
