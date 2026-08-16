import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { useAudio } from '../context/AudioContext';
import {
  MessageSquareCode,
  Globe,
  Image,
  Video,
  Smartphone,
  ShoppingBag,
  TrendingUp,
  Workflow,
  BarChart3,
  Brain,
  Mic,
  ArrowRight,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const servicesData: ServiceItem[] = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots & Conversational Agents',
    category: 'Conversational AI',
    description: 'Custom autonomous chatbots trained on your enterprise data with natural NLP, multi-modal vision, and CRM integrations.',
    iconName: 'MessageSquareCode',
    gradient: 'from-blue-600 to-indigo-600',
    features: ['Custom Knowledge Graph', '24/7 Multi-Lingual Support', 'CRM & Slack Integration', 'Human Handoff Protocols']
  },
  {
    id: 'ai-websites',
    title: 'AI Website Development',
    category: 'Web Engineering',
    description: 'Ultra-fast, responsive web applications powered by generative AI UX customization, personalization, and 60FPS visuals.',
    iconName: 'Globe',
    gradient: 'from-purple-600 to-pink-600',
    features: ['Dynamic UX Personalization', 'Core Web Vitals 99+', 'Headless CMS Architecture', 'AI Search Engine Integration']
  },
  {
    id: 'ai-image-gen',
    title: 'AI Image Generation Engine',
    category: 'Generative Media',
    description: 'Proprietary visual generation pipelines creating photorealistic marketing assets, product designs, and branding.',
    iconName: 'Image',
    gradient: 'from-cyan-500 to-blue-600',
    features: ['Commercial IP Protection', 'Ultra HD 8K Rendering', 'Custom LoRA Model Training', 'Brand Style Consistency']
  },
  {
    id: 'ai-video-gen',
    title: 'AI Video Generation & Avatars',
    category: 'Generative Media',
    description: 'Realistic synthetic video avatars, automated commercial production, multi-lingual lip syncing, and video rendering.',
    iconName: 'Video',
    gradient: 'from-indigo-600 to-purple-600',
    features: ['Hyper-Realistic Photorealism', 'Instant Multi-Lang Voiceover', 'Automated Scripting & Edit', '4K Batch Production']
  },
  {
    id: 'mobile-apps',
    title: 'Intelligent Mobile Applications',
    category: 'Mobile Engineering',
    description: 'Cross-platform iOS and Android apps equipped with on-device CoreML neural inferencing and offline voice capabilities.',
    iconName: 'Smartphone',
    gradient: 'from-emerald-500 to-teal-600',
    features: ['On-Device Neural Acceleration', 'Biometric Security', 'Bi-directional Realtime Sync', 'Offline Machine Learning']
  },
  {
    id: 'ecommerce',
    title: 'AI-Driven E-Commerce Solutions',
    category: 'Enterprise Tech',
    description: 'Next-gen shopping engines featuring visual search, intelligent price optimization, dynamic recommendations, and checkout.',
    iconName: 'ShoppingBag',
    gradient: 'from-amber-500 to-orange-600',
    features: ['Visual Product Discovery', 'Real-time Price Optimization', 'Fraud Detection Algorithms', 'Predictive Inventory Engine']
  },
  {
    id: 'digital-marketing',
    title: 'Autonomous Digital Marketing',
    category: 'Growth Engine',
    description: 'Self-optimizing ad creative pipelines, predictive customer lifetime value scoring, and automated SEO campaign generation.',
    iconName: 'TrendingUp',
    gradient: 'from-rose-500 to-purple-600',
    features: ['Predictive Audience Targeting', 'Autonomous A/B Copy Testing', 'ROAS Attribution Engine', 'Automated Content Scheduling']
  },
  {
    id: 'ai-automation',
    title: 'Enterprise AI Automation & RPA',
    category: 'Process Engineering',
    description: 'Automate complex multi-step back-office workflows, document processing, invoice OCR parsing, and decision trees.',
    iconName: 'Workflow',
    gradient: 'from-cyan-600 to-indigo-600',
    features: ['Zero-Error Document OCR', 'Multi-Agent API Pipelines', 'Legacy System Wrapping', 'Audit-Ready Traceability']
  },
  {
    id: 'data-analytics',
    title: 'Predictive Data Analytics',
    category: 'Business Intelligence',
    description: 'Turn raw data into actionable strategic forecasts with deep learning pattern recognition and interactive 3D dashboards.',
    iconName: 'BarChart3',
    gradient: 'from-blue-600 to-purple-600',
    features: ['Predictive Trend Forecasting', 'Real-time Anomaly Alerts', 'Custom Executive Dashboards', 'Big Data Streaming']
  },
  {
    id: 'machine-learning',
    title: 'Custom Machine Learning Solutions',
    category: 'Core AI Research',
    description: 'Bespoke deep neural network fine-tuning, transformer optimization, vector database indexing, and custom model deployment.',
    iconName: 'Brain',
    gradient: 'from-purple-600 to-blue-600',
    features: ['Custom LLM Fine-Tuning', 'Vector DB Architecture (Pinecone/Milvus)', 'Quantized Edge Deployment', 'Continuous Model Training']
  },
  {
    id: 'voice-assistants',
    title: 'AI Voice Assistants & Telephony',
    category: 'Voice Tech',
    description: 'Conversational voicebots capable of handling thousands of concurrent phone calls with latency under 300ms.',
    iconName: 'Mic',
    gradient: 'from-teal-500 to-cyan-600',
    features: ['Sub-300ms Voice Response', 'Natural Emotion Intonation', 'Twilio & SIP Telephony', 'Real-time Speech Analytics']
  }
];

export const ServicesSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const renderIcon = (name: string) => {
    const props = { className: 'w-7 h-7 text-white' };
    switch (name) {
      case 'MessageSquareCode': return <MessageSquareCode {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Image': return <Image {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Workflow': return <Workflow {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Mic': return <Mic {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#030712]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Comprehensive AI Capability
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Enterprise AI Services Built for Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            From autonomous multi-agent swarms to custom deep neural networks, we engineer production-grade AI applications.
          </p>
        </div>

        {/* 3D Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onMouseEnter={playHoverSound}
              className="group relative rounded-3xl p-6 glass-card glass-card-hover border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              {/* Glowing Gradient Top Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`} />

              <div>
                {/* 3D Animated Icon Box */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {renderIcon(service.iconName)}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                  {service.category}
                </span>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Micro Features list preview */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 2).map((feat: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedService(service);
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all group-hover:border-purple-500/40"
              >
                <span>Learn More Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            
            <button
              onClick={() => {
                playClickSound();
                setSelectedService(null);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${selectedService.gradient} flex items-center justify-center shadow-lg`}>
                {renderIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
              {selectedService.description} apex AI builds battle-tested solutions tailored specifically for your operational stack.
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Capabilities & Engineering Specs</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedService.features.map((feat: string, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  playClickSound();
                  setSelectedService(null);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white text-center shadow-lg"
              >
                Request Architecture Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
