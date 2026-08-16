import React, { useState, useEffect } from 'react';
import { TestimonialItem } from '../types';
import { useAudio } from '../context/AudioContext';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'FinTech Dynamics Global',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'Apex AI transformed our entire algorithmic trading infrastructure. The sub-millisecond neural inferencing pipeline they built gave us a massive quantitative edge.',
    verified: true
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'VP of Digital Operations',
    company: 'Nexus Health Systems',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'The diagnostic vision models developed by Apex AI reduced our patient report backlog by 84%. Their SOC2 security and HIPAA compliance were flawless.',
    verified: true
  },
  {
    id: 't3',
    name: 'Sophia Chen',
    role: 'Head of Customer Experience',
    company: 'OmniGlobal E-Commerce',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'Deploying the Apex multi-agent support swarm saved us over $18M annually while bringing our customer ticket resolution time down to 45 seconds.',
    verified: true
  },
  {
    id: 't4',
    name: 'David Sterling',
    role: 'Founder & CEO',
    company: 'AeroSpace Next Gen',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review: 'Working with Apex AI feels like pairing with Google DeepMind or Anthropic researchers. Their technical rigor and speed of execution are unparalleled.',
    verified: true
  }
];

export const TestimonialsSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 bg-[#030712]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Quote className="w-3.5 h-3.5" /> Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Trusted by Enterprise Leaders Worldwide
          </h2>
        </div>

        {/* Testimonial Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-24 h-24 text-white/5 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Client Avatar Image */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 mb-4 shadow-xl">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {current.verified && (
                    <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 border border-white text-white" title="Verified Enterprise Client">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white">{current.name}</h4>
                <p className="text-xs text-purple-400 font-semibold">{current.role}</p>
                <p className="text-[11px] text-slate-400 font-medium">{current.company}</p>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Quote Text */}
              <div className="md:col-span-8 space-y-4">
                <p className="text-base sm:text-lg text-slate-200 font-light italic leading-relaxed">
                  "{current.review}"
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Case Study Verified Deployment 2025-2026
                  </span>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      onMouseEnter={playHoverSound}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      onMouseEnter={playHoverSound}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
