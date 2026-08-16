import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';
import { AIRobotCanvas } from './3d/AIRobotCanvas';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Code2, Globe2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation, onOpenAuth }) => {
  const { t } = useLanguage();
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                Next-Gen AI Systems & Autonomous Agents
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
              {t('heroTitle').split(' Artificial Intelligence')[0]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300">
                Artificial Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  onOpenConsultation();
                }}
                onMouseEnter={playHoverSound}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>{t('btnGetStarted')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenConsultation();
                }}
                onMouseEnter={playHoverSound}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm backdrop-blur-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{t('btnBookConsultation')}</span>
              </button>
            </div>

            {/* Executive Partner Badges */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Architected to Enterprise Standards
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-75">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" /> SOC2 Certified Security
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Bot className="w-4 h-4 text-purple-400" /> Multi-LLM Orchestration
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <Globe2 className="w-4 h-4 text-cyan-400" /> Global Edge Neural Mesh
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Animated AI Robot Canvas */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 glass-card rounded-3xl p-2 border border-white/15 shadow-2xl bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-2xl">
              <AIRobotCanvas />
            </div>

            {/* Glowing Backdrop Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
