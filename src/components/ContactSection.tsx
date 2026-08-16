import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { playClickSound, playSuccessSound } = useAudio();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', budget: '$10k - $50k' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      playSuccessSound();
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#030712] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" /> Direct Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Let's Engineer Your AI Vision
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Speak directly with our Chief AI Architects to evaluate your technical roadmap and ROI potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Quick Contact Channels & Global Offices */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-3xl glass-card border border-white/15 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Executive Outreach</span>
              </h3>

              {/* WhatsApp Direct Link */}
              <a
                href="https://wa.me/14155550199?text=Hello%20Apex%20AI%20Team%2C%20I%20would%20like%20to%20schedule%20an%20AI%20consultation."
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
                className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">WhatsApp Direct Chat</span>
                    <span className="text-[11px] text-emerald-400 font-medium">+1 (415) 555-0199</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">Chat Now →</span>
              </a>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Email Direct</span>
                  <span className="text-xs text-slate-300">architects@apexai.io</span>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Global Headquarters Phone</span>
                  <span className="text-xs text-slate-300">+1 (800) 555-APEX AI</span>
                </div>
              </div>
            </div>

            {/* Offices List */}
            <div className="p-8 rounded-3xl glass-card border border-white/15 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" /> GLOBAL INNOVATION HUBS
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-bold">San Francisco</strong>
                  <span className="text-[11px] text-slate-400">Market St, Suite 400</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-bold">London</strong>
                  <span className="text-[11px] text-slate-400">Canary Wharf, Floor 22</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-bold">Tokyo</strong>
                  <span className="text-[11px] text-slate-400">Roppongi Hills Tower</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block font-bold">Mumbai</strong>
                  <span className="text-[11px] text-slate-400">BKC Financial Hub</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-white/15 shadow-2xl relative">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-extrabold text-white">Consultation Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. A Senior AI Solutions Architect will respond to <strong className="text-cyan-300">{formData.email}</strong> within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-white">Schedule Technical Discovery</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@enterprise.com"
                        className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Enterprise Global Inc."
                        className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Project Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                      >
                        <option value="$10k - $25k">$10,000 – $25,000</option>
                        <option value="$25k - $50k">$25,000 – $50,000</option>
                        <option value="$50k - $100k">$50,000 – $100,000</option>
                        <option value="$100k+">$100,000+ Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Scope & AI Goals *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your desired AI capabilities, website, voice assistant, or automation requirements..."
                      className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-xl p-4 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Architecture Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
