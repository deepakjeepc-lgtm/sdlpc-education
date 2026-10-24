import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw, Zap } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'WHICH SCHEDULE OF THE INDIAN CONSTITUTION CONTAINS RECOGNIZED OFFICIAL LANGUAGES?',
    options: [
      { key: 'A', text: 'SEVENTH SCHEDULE' },
      { key: 'B', text: 'EIGHTH SCHEDULE', isCorrect: true },
      { key: 'C', text: 'NINTH SCHEDULE' },
      { key: 'D', text: 'TENTH SCHEDULE' },
    ],
    explanation: '8TH SCHEDULE RECOGNIZES 22 OFFICIAL LANGUAGES.',
  },
  {
    id: 2,
    question: 'WHAT IS THE SI UNIT OF ELECTRIC POTENTIAL DIFFERENCE?',
    options: [
      { key: 'A', text: 'AMPERE' },
      { key: 'B', text: 'OHM' },
      { key: 'C', text: 'VOLT', isCorrect: true },
      { key: 'D', text: 'WATT' },
    ],
    explanation: 'VOLT (V) IS THE SI UNIT DERIVED AS JOULE PER COULOMB.',
  },
  {
    id: 3,
    question: 'IF A TRAIN TRAVELS AT 72 KM/H, WHAT IS ITS VELOCITY IN METERS PER SECOND?',
    options: [
      { key: 'A', text: '15 M/S' },
      { key: 'B', text: '20 M/S', isCorrect: true },
      { key: 'C', text: '25 M/S' },
      { key: 'D', text: '30 M/S' },
    ],
    explanation: '72 * (5 / 18) = 20 M/S CONVERSION FACTOR.',
  },
];

export default function InteractiveQuiz({ onOpenRegister }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelect = (option) => {
    if (selectedKey !== null) return;
    setSelectedKey(option.key);
    if (option.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedKey(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedKey(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-24 px-6 sm:px-10 max-w-4xl mx-auto border-t border-black/10 dark:border-white/[0.08]">
      {/* Header - Zero Subtitle, Zero Labels */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#ff2d55]" />
          <h2 
            className="text-xl sm:text-3xl font-bold uppercase tracking-[0.16em] text-neutral-900 dark:text-white"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            DAILY PRACTICE TEST
          </h2>
        </div>

        <div className="text-xs sm:text-sm font-mono tracking-[0.22em] text-[#ff2d55] font-bold">
          {isCompleted ? 'COMPLETE' : `0${currentIdx + 1} / 0${quizQuestions.length}`}
        </div>
      </div>

      {/* Main Quiz Card */}
      <motion.div
        key={isCompleted ? 'done' : currentIdx}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#0c0c11] border border-black/10 dark:border-white/[0.08] shadow-sm"
      >
        {isCompleted ? (
          /* Result View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#ff2d55]/10 border border-[#ff2d55]/30 flex items-center justify-center mx-auto mb-6 text-[#ff2d55]">
              <Check className="w-8 h-8" />
            </div>

            <div className="text-4xl sm:text-6xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {score} / {quizQuestions.length}
            </div>

            <div className="text-xs sm:text-sm font-mono tracking-[0.22em] text-neutral-500 uppercase mb-10">
              ACCURACY: {Math.round((score / quizQuestions.length) * 100)}%
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#ff2d55] text-white text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#e0264b] transition-all cursor-pointer shadow-sm"
              >
                UNLOCK FULL TEST SERIES
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RETAKE</span>
              </button>
            </div>
          </div>
        ) : (
          /* Question View */
          <div>
            <h3 
              className="text-lg sm:text-2xl font-bold uppercase tracking-[0.08em] text-neutral-900 dark:text-white leading-relaxed mb-8"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              {currentQ.question}
            </h3>

            {/* Options List with Larger Refined Typography */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option) => {
                const isSelected = selectedKey === option.key;
                const showCorrect = selectedKey !== null && option.isCorrect;
                const showWrong = isSelected && !option.isCorrect;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelect(option)}
                    disabled={selectedKey !== null}
                    className={`w-full py-4 px-6 rounded-2xl border text-left text-xs sm:text-sm font-mono tracking-[0.14em] uppercase transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      showCorrect
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                        : showWrong
                        ? 'bg-red-500/10 border-red-500 text-red-500 font-bold'
                        : isSelected
                        ? 'bg-[#ff2d55]/10 border-[#ff2d55] text-[#ff2d55]'
                        : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/[0.08] text-neutral-900 dark:text-neutral-200 hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs font-bold">
                        {option.key}
                      </span>
                      <span>{option.text}</span>
                    </div>

                    {showCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                    {showWrong && <X className="w-4 h-4 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/5 dark:border-white/[0.05]">
              <div>
                {selectedKey && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm font-mono tracking-[0.14em] text-[#ff2d55] uppercase font-semibold"
                  >
                    {currentQ.explanation}
                  </motion.div>
                )}
              </div>

              {selectedKey && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleNext}
                  className="px-8 py-3 rounded-full bg-[#ff2d55] text-white text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#e0264b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
