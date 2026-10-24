import React from 'react';
import BrandLogo from './BrandLogo';
import { ArrowUp } from 'lucide-react';

export default function Footer({ onOpenRegister }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-black/10 dark:border-white/[0.08] bg-neutral-100 dark:bg-[#070709] pt-16 pb-28 md:pb-16 px-6 sm:px-10 text-neutral-500 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <BrandLogo size="sm" />

        <div className="flex flex-wrap items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase">
          <a href="#quiz" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            QUIZ
          </a>
          <a href="#test-hub" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            TESTS
          </a>
          <a href="#courses" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            COURSES
          </a>
          <a href="#resources" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
            VAULT
          </a>
          <button
            onClick={onOpenRegister}
            className="text-[#ff2d55] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            REGISTER
          </button>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-[#ff2d55] hover:text-[#ff2d55] transition-all cursor-pointer ml-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-black/5 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
        <div>/2025 SDLPC EDUCATION.</div>
        <div>ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
