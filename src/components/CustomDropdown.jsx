import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ options, value, onChange, placeholder = 'SELECT' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt === value) || value;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 text-left text-xs font-mono tracking-[0.14em] uppercase text-neutral-900 dark:text-white flex items-center justify-between transition-all duration-200 cursor-pointer focus:outline-none focus:border-[#ff2d55]"
      >
        <span className="truncate">{selectedOption || placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-neutral-500 shrink-0 ml-2"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Menu List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-2xl bg-white dark:bg-[#121218] border border-black/10 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] p-2 backdrop-blur-xl"
          >
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl text-left text-xs font-mono tracking-[0.14em] uppercase transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#ff2d55]/10 text-[#ff2d55] font-bold'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#ff2d55] shrink-0 ml-2" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
