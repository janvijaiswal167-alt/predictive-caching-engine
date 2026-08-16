import React, { useState } from 'react';
import { CareerPosition } from '../types';
import { useAudio } from '../context/AudioContext';
import { Briefcase, MapPin, Sparkles, CheckCircle2, ArrowRight, X, ShieldCheck } from 'lucide-react';

export const positionsData: CareerPosition[] = [
  {
    id: 'c1',
    title: 'Senior AI / LLM Infrastructure Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-Time',
    experience: '5+ Years',
    description: 'Design ultra-low latency vLLM and TensorRT inference clusters serving multi-modal agents at scale.',
    requirements: ['Expertise in C++, Rust, or Python', 'Experience with PyTorch, CUDA, and TensorRT', 'Vector DB scaling (Milvus / Qdrant)'],
    responsibilities: ['Architect edge inferencing kernels', 'Optimize memory bandwidth for sub-20ms TTFT', 'Scale GPU Kubernetes clusters']
  },
  {
    id: 'c2',
    title: 'Principal Machine Learning Researcher (Agents & RAG)',
    department: 'AI Research',
    location: 'New York, NY / Remote',
    type: 'Full-Time',
    experience: '6+ Years / Ph.D.',
    description: 'Lead research in multi-agent consensus algorithms, automated reasoning, and synthetic training data synthesis.',
    requirements: ['Ph.D. or equivalent in Computer Science / AI', 'Top tier publications (NeurIPS, ICML, ICLR)', 'Hands-on fine-tuning experience'],
    responsibilities: ['Publish state-of-the-art agent papers', 'Build proprietary fine-tuning pipelines', 'Mentor research fellows']
  },
  {
    id: 'c3',
    title: 'Senior Full-Stack Web3 / WebGL Engineer',
    department: 'Product Engineering',
    location: 'London, UK / Remote',
    type: 'Full-Time',
    experience: '4+ Years',
    description: 'Craft 60FPS Apple-grade web interfaces, interactive 3D WebGL canvases, and real-time dashboard experiences.',
    requirements: ['Expert in Next.js, Three.js, React, Tailwind', 'Strong eye for glassmorphic design aesthetics', '60FPS performance profiling'],
    responsibilities: ['Build customer-facing AI portals', 'Engineer interactive 3D WebGL scenes', 'Optimize core web vitals to 100/100']
  }
];

export const CareersSection: React.FC = () => {
  const { playHoverSound, playClickSound, playSuccessSound } = useAudio();
  const [selectedPos, setSelectedPos] = useState<CareerPosition | null>(null);
  const [applied, setApplied] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setApplied(true);
    playSuccessSound();
  };

  return (
    <section id="careers" className="relative py-24 bg-[#030712]/95 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5" /> Join Apex AI Team
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Build the Future of Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            We are hiring world-class researchers, systems engineers, and designers passionate about autonomous AI.
          </p>
        </div>

        {/* Benefits & Culture Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
              $5K
            </div>
            <h4 className="text-sm font-bold text-white">AI Learning Stipend</h4>
            <p className="text-xs text-slate-400">Annual budget for conferences, hardware, papers, and GPU compute.</p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
              100%
            </div>
            <h4 className="text-sm font-bold text-white">Remote-First Culture</h4>
            <p className="text-xs text-slate-400">Work from anywhere with top-tier co-working & home office stipends.</p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
              M3/4090
            </div>
            <h4 className="text-sm font-bold text-white">Top Hardware Gear</h4>
            <p className="text-xs text-slate-400">Latest Apple M3 Max or Dual RTX 4090 local AI workstation setup.</p>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              PTO
            </div>
            <h4 className="text-sm font-bold text-white">Unlimited Paid Time Off</h4>
            <p className="text-xs text-slate-400">Flexible vacation policy with quarterly mandatory unplugged weeks.</p>
          </div>
        </div>

        {/* Open Positions List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Current Open Roles</h3>

          {positionsData.map((pos) => (
            <div
              key={pos.id}
              onMouseEnter={playHoverSound}
              className="p-6 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-600/20 border border-purple-500/30 text-[10px] font-bold text-purple-300 uppercase">
                    {pos.department}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {pos.location}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white">{pos.title}</h4>
                <p className="text-xs text-slate-300 font-light mt-1 max-w-2xl">{pos.description}</p>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setSelectedPos(pos);
                  setApplied(false);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 self-start md:self-auto"
              >
                <span>Apply for Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Online Application Modal */}
      {selectedPos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPos(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!applied ? (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">JOB APPLICATION</span>
                  <h3 className="text-xl font-extrabold text-white mt-1">{selectedPos.title}</h3>
                  <p className="text-xs text-slate-400">{selectedPos.department} • {selectedPos.location}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jordan Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@domain.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn / GitHub Profile URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/jordan"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Why do you want to join Apex AI?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your background with AI agents and deep learning..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg"
                >
                  Submit Application
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white">Application Received</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for applying for <strong className="text-white">{selectedPos.title}</strong>. Our recruiting team will review your profile within 48 hours.
                </p>
                <button
                  onClick={() => setSelectedPos(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white"
                >
                  Return to Positions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
