import React from 'react';
import { Sparkles, Laptop, Layers, FileDown, UserCheck } from 'lucide-react';

export default function MobileBottomNav({ onOpenRegister, onOpenCbt, activeSection }) {
  return (
    <nav className="md:hidden fixed bottom-5 left-5 right-5 z-40 flex items-center justify-between px-4 py-2.5 rounded-full bg-white/90 dark:bg-[#0b0b0e]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
      <a
        href="#hero"
        className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-[9px] font-mono tracking-[0.2em]">CORE</span>
      </a>

      {/* Direct CBT Exam Launch */}
      <button
        onClick={onOpenCbt}
        className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[#ff2d55] cursor-pointer"
      >
        <Laptop className="w-4 h-4" />
        <span className="text-[9px] font-mono tracking-[0.2em] font-bold">CBT</span>
      </button>

      <a
        href="#courses"
        className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
      >
        <Layers className="w-4 h-4" />
        <span className="text-[9px] font-mono tracking-[0.2em]">TRACKS</span>
      </a>

      <a
        href="#resources"
        className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
      >
        <FileDown className="w-4 h-4" />
        <span className="text-[9px] font-mono tracking-[0.2em]">VAULT</span>
      </a>

      <button
        onClick={() => onOpenRegister()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff2d55] text-white text-[10px] font-mono tracking-[0.18em] uppercase font-bold shadow-sm active:scale-95 transition-transform cursor-pointer"
      >
        <UserCheck className="w-3.5 h-3.5" />
        <span>JOIN</span>
      </button>
    </nav>
  );
}
