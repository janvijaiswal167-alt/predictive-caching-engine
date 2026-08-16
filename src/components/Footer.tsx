import React, { useState } from 'react';
import { Cpu, Send, Check, ShieldCheck, FileText, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const Footer: React.FC = () => {
  const { playClickSound, playSuccessSound } = useAudio();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    playClickSound();
    setSubscribed(true);
    playSuccessSound();
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer className="relative bg-[#02050E] border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                APEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Engineering world-class artificial intelligence systems, multi-agent swarms, custom neural networks, and 60FPS digital web experiences for global market leaders.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((social) => (
                <a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  onClick={playClickSound}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'Services', 'AI Demos', 'Projects', 'Pricing', 'Testimonials', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} onClick={playClickSound} className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: AI Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">AI Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">AI Chatbots & Agents</a></li>
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">AI Website Engineering</a></li>
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">Generative Media Engine</a></li>
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">AI Voice Assistants</a></li>
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">Predictive Data Analytics</a></li>
              <li><a href="#services" onClick={playClickSound} className="hover:text-purple-400 transition-colors">Custom Machine Learning</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">AI Research Dispatch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive weekly frontier AI whitepapers and benchmark updates.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="executive@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-3 pr-10 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && <span className="text-[10px] text-emerald-400 font-bold block">Subscribed to Apex Dispatch!</span>}
            </form>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Apex AI Inc. All rights reserved. SOC2 Type II & HIPAA Certified.</p>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                playClickSound();
                setModalType('privacy');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                playClickSound();
                setModalType('terms');
              }}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              {modalType === 'privacy' ? <ShieldCheck className="w-6 h-6 text-emerald-400" /> : <FileText className="w-6 h-6 text-purple-400" />}
              <h3 className="text-xl font-bold text-white">
                {modalType === 'privacy' ? 'Apex AI Data Privacy Guarantee' : 'Terms & Conditions of Service'}
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
              At Apex AI, enterprise security and client data sovereignty are built into every model layer. We adhere strictly to zero-retention policies on client inference streams and private knowledge graphs.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-2">
              <p>• Zero training on client inputs or customer proprietary data.</p>
              <p>• End-to-end AES-256 encryption in transit and at rest.</p>
              <p>• Isolated VPC tenant enclaves with dedicated hardware security modules (HSM).</p>
            </div>

            <button
              onClick={() => setModalType(null)}
              className="w-full py-3 mt-6 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
