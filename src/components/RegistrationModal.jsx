import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { submitRegistration } from '../services/registrationService';
import CustomDropdown from './CustomDropdown';

const STREAM_OPTIONS = [
  'COMPREHENSIVE MULTI-TRACK',
  'SSC & GENERAL STUDIES',
  'RAILWAY RRB CBT',
  'BANKING APTITUDE',
  'CLASS 10TH BOARD FOUNDATION',
  'CLASS 12TH SENIOR SCIENCE',
  'DAILY QUIZ & TEST SERIES ONLY',
  'RESOURCE VAULT ONLY',
];

export default function RegistrationModal({ isOpen, onClose, preselectedCourse = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    stream: 'COMPREHENSIVE MULTI-TRACK',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, stream: preselectedCourse.toUpperCase() }));
    }
  }, [preselectedCourse]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('NAME AND CONTACT NUMBER REQUIRED');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      await submitRegistration(formData);
      setLoading(false);
      setSubmitted(true);
    } catch {
      setLoading(false);
      setErrorMsg('REGISTRATION FAILED. TRY AGAIN.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      stream: 'COMPREHENSIVE MULTI-TRACK',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white dark:bg-[#0c0c11] border border-black/10 dark:border-white/10 rounded-3xl p-8 z-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_0_60px_rgba(255,45,85,0.15)]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/40 flex items-center justify-center mx-auto mb-6 text-[#ff2d55]">
                  <Check className="w-6 h-6" />
                </div>

                <h3 
                  className="text-xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white mb-6"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  CONFIRMED
                </h3>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.06] text-left text-xs font-mono space-y-2 mb-8">
                  <div className="flex justify-between">
                    <span className="text-neutral-500 tracking-[0.15em]">NAME</span>
                    <span className="text-neutral-900 dark:text-neutral-200 uppercase">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 tracking-[0.15em]">CONTACT</span>
                    <span className="text-neutral-900 dark:text-neutral-200">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 tracking-[0.15em]">TRACK</span>
                    <span className="text-neutral-900 dark:text-neutral-200 uppercase truncate max-w-[160px]">{formData.stream}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-4 rounded-full bg-[#ff2d55] text-white text-xs font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#e0264b] transition-all cursor-pointer shadow-sm"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h3 
                    className="text-xl font-bold uppercase tracking-[0.14em] text-neutral-900 dark:text-white"
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                  >
                    PRE-REGISTER
                  </h3>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-[11px] font-mono tracking-[0.15em] text-red-500">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="FULL NAME"
                      className="w-full px-5 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-mono tracking-[0.14em] uppercase placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#ff2d55] transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="CONTACT NUMBER"
                      className="w-full px-5 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-mono tracking-[0.14em] placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#ff2d55] transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="EMAIL (OPTIONAL)"
                      className="w-full px-5 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white text-xs font-mono tracking-[0.14em] placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-[#ff2d55] transition-all"
                    />
                  </div>

                  {/* Refined Custom Dropdown */}
                  <div>
                    <CustomDropdown
                      options={STREAM_OPTIONS}
                      value={formData.stream}
                      onChange={(val) => setFormData({ ...formData, stream: val })}
                      placeholder="SELECT CURRICULUM STREAM"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-4 rounded-full bg-[#ff2d55] text-white text-xs font-mono tracking-[0.25em] uppercase font-bold hover:bg-[#e0264b] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>SUBMIT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
