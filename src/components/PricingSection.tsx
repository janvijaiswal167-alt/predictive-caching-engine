import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { useAudio } from '../context/AudioContext';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, X } from 'lucide-react';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter AI Plan',
    priceMonthly: 499,
    priceAnnual: 399,
    description: 'Perfect for fast-growing startups adopting AI web & chatbot automation.',
    features: [
      'Custom AI Website Development',
      'Standard AI Chatbot (10k msgs/mo)',
      'Basic Workflow Automation (3 flows)',
      'Standard Analytics Dashboard',
      'Community & Email Support'
    ],
    ctaText: 'Start Starter Plan'
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    priceMonthly: 1499,
    priceAnnual: 1199,
    description: 'Complete AI stack for scaling businesses seeking competitive dominance.',
    popular: true,
    features: [
      'Next-Gen AI Website & Personalization',
      'Unlimited AI Chatbot Swarm',
      'Full Business Automation & RPA',
      'Predictive Analytics Dashboard',
      'AI Voice Assistant Integration',
      '24/7 Dedicated Premium Support'
    ],
    ctaText: 'Get Started with Professional'
  },
  {
    id: 'enterprise',
    name: 'Enterprise AI Stack',
    priceMonthly: 3999,
    priceAnnual: 3199,
    description: 'Custom deep neural networks, on-premise fine-tuning, and SLA guarantees.',
    features: [
      'Custom LLM Fine-Tuning (Llama-3/Claude)',
      'Private Knowledge Graph Infrastructure',
      'Sub-15ms Latency Edge Deployment',
      'SOC2 & HIPAA Compliant Architecture',
      'Dedicated Chief AI Architect',
      'Guaranteed 99.99% Uptime SLA'
    ],
    ctaText: 'Contact Enterprise Sales'
  }
];

export const PricingSection: React.FC = () => {
  const { playHoverSound, playClickSound, playSuccessSound } = useAudio();
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setCheckoutStep('success');
    playSuccessSound();
  };

  return (
    <section id="pricing" className="relative py-24 bg-[#030712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Predictable Plans for AI Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Choose the ideal AI execution tier. Scale or adjust resources at any time.
          </p>
        </div>

        {/* Monthly / Annual Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-14">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>Monthly Billing</span>
          <button
            onClick={() => {
              playClickSound();
              setIsAnnual(!isAnnual);
            }}
            className="relative w-14 h-8 rounded-full bg-white/10 p-1 border border-white/15 transition-colors"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>Annual Billing</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
              SAVE 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                onMouseEnter={playHoverSound}
                className={`relative rounded-3xl p-8 glass-card border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-purple-500/60 shadow-2xl shadow-purple-500/20 bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-slate-950/80 lg:-translate-y-2'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border border-white/20 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> RECOMMENDED OPTION
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-300 font-light mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                    <span className="text-4xl font-extrabold text-white font-sans">${price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">INCLUDED CAPABILITIES</span>
                    {plan.features.map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-cyan-400" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedPlan(plan);
                    setCheckoutStep('form');
                  }}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-purple-600/40'
                      : 'bg-white/5 hover:bg-white/10 border border-white/15 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Plan Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'form' ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">SELECTED TIER</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">{selectedPlan.name}</h3>
                  <p className="text-xs text-slate-300 mt-1">${isAnnual ? selectedPlan.priceAnnual : selectedPlan.priceMonthly} / month (Billed {isAnnual ? 'Annually' : 'Monthly'})</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="cto@acme.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg"
                >
                  Confirm & Initialize Plan Setup
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Plan Initialization Sent</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your dedicated Apex AI Architect will contact your team within 2 hours to begin infrastructure deployment.
                </p>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
