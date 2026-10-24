import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailyWeeklyMonthlyHub from './components/DailyWeeklyMonthlyHub';
import CourseCatalog from './components/CourseCatalog';
import ResourceVault from './components/ResourceVault';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import CbtExamScreen from './components/CbtExamScreen';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sdlpc_theme') || 'dark';
  });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCbtActive, setIsCbtActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  // Sync theme with DOM documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sdlpc_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCbtComplete = (scoreStr) => {
    localStorage.setItem('sdlpc_last_cbt_score', scoreStr);
  };

  const handleOpenRegister = (prefillCourse = '') => {
    setSelectedCourse(prefillCourse || '');
    setIsRegisterOpen(true);
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in active CBT Exam Session: Hide all global website elements and render full 100vh CBT interface
  if (isCbtActive) {
    return (
      <CbtExamScreen
        onClose={() => setIsCbtActive(false)}
        onComplete={handleCbtComplete}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] dark:bg-[#070709] text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-[#ff2d55] selection:text-white transition-colors duration-300">
      {/* Top Navbar with Dark/Light Switcher & CBT Launch */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenCbt={() => setIsCbtActive(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Interactive Massive S D L P C Letters */}
        <Hero
          onOpenRegister={() => handleOpenRegister()}
          onScrollToResources={() => handleScrollToSection('resources')}
        />

        {/* Test Protocols - Clean Cards, NO Top Subtitles, Dates on Locked Buttons */}
        <DailyWeeklyMonthlyHub
          onOpenCbt={() => setIsCbtActive(true)}
          onOpenRegister={(track) => handleOpenRegister(track)}
        />

        {/* Curated Curriculum Programs */}
        <CourseCatalog
          onSelectCourse={(courseTitle) => handleOpenRegister(courseTitle)}
        />

        {/* Resource Vault */}
        <ResourceVault
          onDownloadRequest={(resourceTitle) => handleOpenRegister(`VAULT: ${resourceTitle}`)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Mobile Floating Bottom Glass Nav */}
      <MobileBottomNav
        onOpenRegister={() => handleOpenRegister()}
        onOpenCbt={() => setIsCbtActive(true)}
        activeSection={activeSection}
      />

      {/* Registration Modal with Custom Dropdown */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedCourse={selectedCourse}
      />
    </div>
  );
}
