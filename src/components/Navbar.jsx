import React from 'react';
import BrandLogo from './BrandLogo';
import { ArrowUpRight, Sun, Moon, Laptop } from 'lucide-react';

export default function Navbar({ onOpenRegister, onOpenCbt, theme, toggleTheme }) {
  const navItems = [
    { label: 'TESTS', href: '#test-hub' },
    { label: 'COURSES', href: '#courses' },
    { label: 'VAULT', href: '#resources' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#f8f9fa]/85 dark:bg-[#070709]/90 border-b border-black/10 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero">
          <BrandLogo />
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onOpenCbt}
            className="flex items-center gap-2 text-[11px] font-mono tracking-[0.24em] text-[#ff2d55] font-bold hover:text-white transition-colors duration-200 uppercase cursor-pointer"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>CBT EXAM</span>
          </button>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11px] font-mono tracking-[0.24em] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 uppercase"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Section: Theme Toggle + Register */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:text-[#ff2d55] dark:hover:text-[#ff2d55] hover:border-[#ff2d55]/40 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <button
            onClick={() => onOpenRegister()}
            className="group px-6 py-2.5 rounded-full bg-[#ff2d55] text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#e0264b] active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>REGISTER</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
