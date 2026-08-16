import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { useAudio } from '../context/AudioContext';
import { ExternalLink, BookOpen, X, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const portfolioData: PortfolioItem[] = [
  {
    id: 'health-ai',
    title: 'AuraCare — Autonomous Healthcare Diagnostics',
    category: 'Healthcare AI',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    description: 'HIPAA-compliant diagnostic assist engine parsing radiological scans and medical records with 99.4% precision.',
    client: 'AuraCare Health Systems',
    impact: 'Saved 14,000+ clinical diagnostic hours per quarter',
    techStack: ['Vision Transformers', 'PyTorch', 'FastAPI', 'DICOM WebGL'],
    liveDemoUrl: 'https://auracare-demo.apexai.example',
    caseStudy: {
      challenge: 'Radiology departments experienced a 3-week backlog for MRI scan interpretations during peak loads.',
      solution: 'Deployed a fine-tuned Vision Transformer (ViT) ensemble integrated into PACS workstations for automated triaging.',
      results: [
        '99.4% Diagnostic Accuracy across 50k test cases',
        '84% Reduction in scan triaging wait times',
        'Full HIPAA & HITECH SOC2 compliance'
      ]
    }
  },
  {
    id: 'finance-ai',
    title: 'QuantX — High-Frequency Algo Trading Intelligence',
    category: 'Finance AI',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: 'Real-time order book sentiment analysis and predictive market anomaly detection running under 4ms latency.',
    client: 'QuantX Capital Management',
    impact: '$42M Alpha yield generated in 2025',
    techStack: ['C++ Neural Kernels', 'CUDA Acceleration', 'Kafka Streaming', 'Pinecone Vector DB'],
    liveDemoUrl: 'https://quantx-demo.apexai.example',
    caseStudy: {
      challenge: 'Traditional quantitative models failed to digest multi-modal news feeds during volatile market swings.',
      solution: 'Built a sub-millisecond transformer pipeline processing SEC filings, Bloomberg terminal feeds, and order book depth.',
      results: [
        'Under 4ms End-to-End Decision Latency',
        '28% Outperformance versus S&P 500 Benchmark',
        'Automated Risk Guardrails with zero false liquidate triggers'
      ]
    }
  },
  {
    id: 'retail-auto',
    title: 'OmniStore — Computer Vision Retail Checkout',
    category: 'Retail Automation',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80',
    description: 'Frictionless grab-and-go store experience utilizing multi-camera object tracking and instant receipt billing.',
    client: 'OmniStore Retail Global',
    impact: 'Zero checkout lines across 120 flagship stores',
    techStack: ['YOLOv9 Vision Engine', 'Edge TPU Hardware', 'Stripe Terminal API', 'React Native'],
    liveDemoUrl: 'https://omnistore-demo.apexai.example',
    caseStudy: {
      challenge: 'High customer drop-off rates due to long checkout queues during holiday peak shopping hours.',
      solution: 'Engineered an overhead camera ceiling array linked to edge tensor processing units for instant item identification.',
      results: [
        '99.8% Item Recognition Precision',
        '100% Elimination of cashier checkout queues',
        '34% Increase in store customer throughput'
      ]
    }
  },
  {
    id: 'edu-ai',
    title: 'CogniLearn — Adaptive AI Tutor Platform',
    category: 'Education AI',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    description: 'Hyper-personalized Socratic AI tutor adapting learning paces to individual student cognitive profiles.',
    client: 'CogniLearn EdTech Consortium',
    impact: 'Empowered 450,000+ STEM students globally',
    techStack: ['Llama-3 Fine-Tune', 'Knowledge Graph DB', 'Next.js App Router', 'WebSpeech API'],
    liveDemoUrl: 'https://cognilearn-demo.apexai.example',
    caseStudy: {
      challenge: 'Standardized online courses suffered a 78% drop-out rate due to lack of customized student support.',
      solution: 'Implemented an empathetic AI mentor that continuously assesses student mastery and adjusts problem difficulty.',
      results: [
        '4.2x Higher Course Completion Rates',
        '91% Student Satisfaction Score',
        'Available in 18 international languages'
      ]
    }
  },
  {
    id: 'chatbot-ent',
    title: 'NexGen Enterprise Support Swarm',
    category: 'AI Chatbots',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    description: 'Autonomous tier-1 and tier-2 customer resolution agents resolving 88% of incoming tickets without humans.',
    client: 'Global Telecom Alliance',
    impact: '$18.5M Annual Customer Service Cost Reduction',
    techStack: ['Multi-Agent Swarm Framework', 'Vector Embeddings', 'Zendesk API', 'WebSockets'],
    liveDemoUrl: 'https://nexgen-demo.apexai.example',
    caseStudy: {
      challenge: 'Call centers experienced 45-minute hold times and high agent burnout during system upgrades.',
      solution: 'Deployed a multi-agent swarm trained on 5 years of historical support resolution transcripts.',
      results: [
        '88% First-Contact Resolution Rate',
        'Average Resolution Time under 45 seconds',
        'Instant multi-channel sync (WhatsApp, Web, Voice)'
      ]
    }
  },
  {
    id: 'biz-web',
    title: 'Vanguard Corp — AI-Native Enterprise Portal',
    category: 'Business Websites',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'High-converting web experience with dynamic generative landing pages customized per visitor company firmographics.',
    client: 'Vanguard Software International',
    impact: '+210% Inbound Enterprise Sales Lead Pipeline',
    techStack: ['Next.js 15', 'Three.js WebGL', 'Tailwind CSS', 'Vercel Edge'],
    liveDemoUrl: 'https://vanguard-demo.apexai.example',
    caseStudy: {
      challenge: 'Generic web pages led to low conversion rates among Fortune 500 executive buyers.',
      solution: 'Built a dynamic edge website that detects visitor domain firmographics and customizes hero messaging in real-time.',
      results: [
        '210% Increase in qualified enterprise lead forms',
        'Core Web Vitals Performance score 100/100',
        'Sub-50ms Global Edge Page Load'
      ]
    }
  }
];

export const PortfolioSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'AI Chatbots', 'Business Websites', 'Healthcare AI', 'Finance AI', 'Retail Automation', 'Education AI'];

  const filteredItems = activeCategory === 'All'
    ? portfolioData
    : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#030712]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Transformative Client Deployments
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Explore how our AI architectures drive measurable ROI across healthcare, finance, retail, and enterprise tech.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat);
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-white/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={playHoverSound}
              className="group rounded-3xl glass-card border border-white/10 overflow-hidden glass-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Project Image Preview with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Impact Metric Banner */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/25">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">CLIENT ROI IMPACT</span>
                    <span className="text-xs font-bold text-white">{item.impact}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.techStack.map((tech: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedDemo(item);
                  }}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedCaseStudy(item);
                  }}
                  className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Case Study</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                playClickSound();
                setSelectedCaseStudy(null);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">DETAILED CASE STUDY</span>
            <h3 className="text-2xl font-extrabold text-white mt-1 mb-4">{selectedCaseStudy.title}</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">The Business Challenge</h4>
                <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/10">
                  {selectedCaseStudy.caseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">The Apex AI Solution Architecture</h4>
                <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20">
                  {selectedCaseStudy.caseStudy.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verified Key Results</h4>
                <div className="space-y-2">
                  {selectedCaseStudy.caseStudy.results.map((res: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs font-semibold text-slate-100">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo Preview Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => {
                playClickSound();
                setSelectedDemo(null);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 text-xs font-bold text-blue-300 uppercase">
                {selectedDemo.category}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedDemo.title} — Sandbox Preview</h3>
            </div>

            {/* Simulated Live Interface Preview Frame */}
            <div className="relative h-72 rounded-2xl overflow-hidden border border-white/15 bg-black flex flex-col justify-between p-6">
              <img src={selectedDemo.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="relative z-10 flex justify-between items-center bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Simulation Active
                </span>
                <span className="text-[10px] text-slate-400">Latency: 12ms</span>
              </div>

              <div className="relative z-10 text-center space-y-3 bg-black/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                <h4 className="text-lg font-bold text-white">{selectedDemo.client} Production Instance</h4>
                <p className="text-xs text-slate-300">Click below to initiate full interactive prototype sandbox session.</p>
                <button
                  onClick={() => alert(`Launching live cloud sandbox for ${selectedDemo.title}...`)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white inline-flex items-center gap-2"
                >
                  <span>Launch Live Instance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
