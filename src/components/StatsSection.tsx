import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Users, ThumbsUp, Globe2, ShieldCheck, Activity } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats = [
    { id: 'projects', count: 500, suffix: '+', label: t('statsProjects'), icon: Award, color: 'from-blue-500 to-cyan-400' },
    { id: 'clients', count: 250, suffix: '+', label: t('statsClients'), icon: Users, color: 'from-purple-500 to-indigo-400' },
    { id: 'satisfaction', count: 98, suffix: '%', label: t('statsSatisfaction'), icon: ThumbsUp, color: 'from-emerald-400 to-teal-500' },
    { id: 'countries', count: 12, suffix: '+', label: t('statsCountries'), icon: Globe2, color: 'from-pink-500 to-purple-400' },
    { id: 'uptime', count: 99.9, suffix: '%', label: t('statsUptime'), icon: ShieldCheck, color: 'from-cyan-400 to-blue-600' }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-[#030712]/95 border-t border-b border-white/10 overflow-hidden">
      {/* Background Neon Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 rounded-3xl glass-card border border-white/10 hover:border-white/20 transition-all text-center flex flex-col items-center group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans mb-1 flex items-center justify-center">
                <span>{isVisible ? stat.count : 0}</span>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>{stat.suffix}</span>
              </div>

              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Live Infrastructure Telemetry Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-bold text-slate-200">Apex Global Edge Nodes: <span className="text-emerald-400">100% OPERATIONAL</span></span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium text-slate-400">
            <span>Avg Response Latency: <strong className="text-cyan-300">11.4 ms</strong></span>
            <span>Concurrent AI Sessions: <strong className="text-purple-300">42,890</strong></span>
            <span>Daily Inferences: <strong className="text-blue-300">1.8 Billion</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
