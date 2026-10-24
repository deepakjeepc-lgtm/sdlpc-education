import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const courses = [
  {
    category: 'COMPETITIVE',
    title: 'SSC & GENERAL STUDIES',
    specs: '6 MONTHS • 180 MODULES',
    status: 'COMING SOON',
  },
  {
    category: 'COMPETITIVE',
    title: 'RAILWAY RRB CBT',
    specs: '4 MONTHS • 120 MODULES',
    status: 'COMING SOON',
  },
  {
    category: 'COMPETITIVE',
    title: 'BANKING APTITUDE',
    specs: '5 MONTHS • 150 MODULES',
    status: 'COMING SOON',
  },
  {
    category: 'ACADEMIC',
    title: 'CLASS 10TH BOARD FOUNDATION',
    specs: '10 MONTHS • 220 MODULES',
    status: 'COMING SOON',
  },
  {
    category: 'ACADEMIC',
    title: 'CLASS 12TH SENIOR SCIENCE',
    specs: '10 MONTHS • 260 MODULES',
    status: 'COMING SOON',
  },
  {
    category: 'ACADEMIC',
    title: 'CLASS 11TH & 12TH HUMANITIES',
    specs: '8 MONTHS • 140 MODULES',
    status: 'COMING SOON',
  },
];

export default function CourseCatalog({ onSelectCourse }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? courses
    : courses.filter((c) => c.category === activeFilter);

  return (
    <section id="courses" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/10 dark:border-white/[0.08]">
      {/* Title & Filter - Zero Subtitle, Zero Labels */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <h2 
          className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          CURRICULUM
        </h2>

        {/* Minimal Uppercase Filter Tabs */}
        <div className="flex items-center gap-3">
          {['ALL', 'COMPETITIVE', 'ACADEMIC'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black font-bold'
                  : 'bg-black/[0.04] dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group rounded-3xl bg-white dark:bg-[#0b0b0e] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/25 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/5 dark:border-white/[0.04]">
                <span className="text-xs font-mono tracking-[0.2em] text-[#ff2d55] uppercase font-bold">
                  {item.status}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55]" />
              </div>

              <h3 
                className="text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white mb-6 leading-snug"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {item.title}
              </h3>

              <div className="text-xs sm:text-sm font-mono tracking-[0.16em] text-neutral-500 mb-8 uppercase">
                {item.specs}
              </div>
            </div>

            <button
              onClick={() => onSelectCourse(item.title)}
              className="w-full py-3.5 px-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] hover:bg-[#ff2d55] text-neutral-900 dark:text-neutral-300 hover:text-white border border-black/10 dark:border-white/10 hover:border-transparent text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer group/btn"
            >
              <span>PRE-ENROLL</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
