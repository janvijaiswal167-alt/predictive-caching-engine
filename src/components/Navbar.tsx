import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { Language } from '../types';
import { Volume2, VolumeX, Globe, Menu, X, Cpu, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenConsultation }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isMuted, toggleMute, playHoverSound, playClickSound } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const navLinks = [
    { href: '#home', label: t('navHome') },
    { href: '#services', label: t('navServices') },
    { href: '#demos', label: t('navDemos') },
    { href: '#portfolio', label: t('navProjects') },
    { href: '#pricing', label: t('navPricing') },
    { href: '#testimonials', label: t('navTestimonials') },
    { href: '#blog', label: t('navBlog') },
    { href: '#careers', label: t('navCareers') },
    { href: '#contact', label: t('navContact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Stylized "A" + Neural Circuit */}
        <a
          href="#home"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Neural circuit line art */}
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight font-sans text-white flex items-center gap-1">
              APEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500">AI</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">Intelligence Agency</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Audio Synth, Multi-Language, Auth */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Mute/Unmute Audio Button */}
          <button
            onClick={toggleMute}
            onMouseEnter={playHoverSound}
            title={isMuted ? 'Unmute Audio Experience' : 'Mute Audio'}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-1.5"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onMouseEnter={playHoverSound}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0F172A] border border-white/15 rounded-xl shadow-2xl backdrop-blur-xl py-2 z-50">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      playClickSound();
                      setLanguage(item.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-white/10 transition-colors ${
                      language === item.code ? 'text-blue-400 bg-white/5 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-base">{item.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenAuth('login');
            }}
            onMouseEnter={playHoverSound}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
          >
            {t('btnLogin')}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenConsultation();
            }}
            onMouseEnter={playHoverSound}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 hover:shadow-purple-600/40 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('btnGetStarted')}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-white/5 text-slate-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 mt-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language selector in mobile */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Select Language</span>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                  }}
                  className={`px-2 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 border ${
                    language === item.code
                      ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span className="uppercase">{item.code}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="flex-1 py-2.5 rounded-xl border border-white/20 text-xs font-semibold text-slate-200 text-center"
            >
              {t('btnLogin')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white text-center"
            >
              {t('btnGetStarted')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
