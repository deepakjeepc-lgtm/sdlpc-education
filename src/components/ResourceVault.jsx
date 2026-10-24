import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check } from 'lucide-react';

const resources = [
  {
    title: 'EXAMINATION SYLLABUS MAP',
    meta: 'PDF • 4.2 MB',
  },
  {
    title: 'FORMULA RAPID COMPENDIUM',
    meta: 'PDF • 8.1 MB',
  },
  {
    title: 'PREVIOUS 5-YEAR SOLVED PAPERS',
    meta: 'PDF • 14.5 MB',
  },
  {
    title: 'HIGH-YIELD GK CAPSULE',
    meta: 'PDF • 5.6 MB',
  },
  {
    title: 'TOPPERS SHORT NOTES',
    meta: 'PDF • 11.0 MB',
  },
  {
    title: '1,000 HIGH-FREQUENCY MCQS',
    meta: 'PDF • 7.3 MB',
  },
];

export default function ResourceVault({ onDownloadRequest }) {
  const [downloaded, setDownloaded] = useState(null);

  const handleDownload = (item) => {
    setDownloaded(item.title);
    setTimeout(() => {
      onDownloadRequest(item.title);
    }, 350);
  };

  return (
    <section id="resources" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto border-t border-black/10 dark:border-white/[0.08]">
      {/* Title - Zero Subtitle, Zero Labels */}
      <div className="mb-14">
        <h2 
          className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          RESOURCE VAULT
        </h2>
      </div>

      {/* Grid of Minimal Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, idx) => {
          const isDone = downloaded === item.title;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-3xl bg-white dark:bg-[#0b0b0e] border border-black/10 dark:border-white/[0.08] hover:border-black/25 dark:hover:border-white/25 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/5 dark:border-white/[0.04]">
                  <span className="text-xs font-mono tracking-[0.2em] text-[#ff2d55] uppercase font-bold">
                    {item.meta}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55]" />
                </div>

                <h3 
                  className="text-lg font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white mb-8 leading-snug"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  {item.title}
                </h3>
              </div>

              <button
                onClick={() => handleDownload(item)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                  isDone
                    ? 'bg-[#ff2d55] text-white shadow-sm'
                    : 'bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.09] text-neutral-900 dark:text-neutral-200 border border-black/10 dark:border-white/10'
                }`}
              >
                {isDone ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>QUEUED</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#ff2d55]" />
                    <span>DOWNLOAD</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
