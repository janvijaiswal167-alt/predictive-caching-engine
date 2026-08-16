import React, { useState } from 'react';
import { BlogPost } from '../types';
import { useAudio } from '../context/AudioContext';
import { Clock, Calendar, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';

export const blogPostsData: BlogPost[] = [
  {
    id: 'b1',
    title: 'Architecting Autonomous Multi-Agent Swarms for High-Throughput Enterprises',
    category: 'Machine Learning',
    date: 'July 24, 2026',
    readTime: '6 min read',
    excerpt: 'How multi-agent task distribution frameworks reduce reasoning latency and eliminate single-point bottleneck risks in enterprise LLM deployments.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Chief AI Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    content: `Autonomous AI agents represent the biggest paradigm shift in software architecture since microservices. Rather than routing all requests through a single monolithic prompt, multi-agent swarms decompose complex business directives into specialized execution graphs.

Key Architectural Takeaways:
1. Role-Based Agent Specialization: Assign dedicated system prompts and tool bindings (e.g. Code Evaluator, SQL Query Planner, Visual OCR Inspector).
2. Asynchronous Queueing: Use high-throughput streaming queues (Kafka / NATS) to prevent worker thread lockups.
3. Consensus Verification: Implement double-check verification nodes before mutating production database states.`
  },
  {
    id: 'b2',
    title: 'The 2026 Executive Guide to Generative AI Security & Data Privacy',
    category: 'Generative AI',
    date: 'July 18, 2026',
    readTime: '8 min read',
    excerpt: 'Navigating SOC2 Type II, HIPAA, and EU AI Act compliance when deploying proprietary RAG vector databases and fine-tuned open weights.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Devon Miller',
      role: 'Head of AI Security',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    content: `Data leakage remains the number one concern for C-suite leaders evaluating generative AI adoption. By implementing zero-trust vector indexes and isolated VPC enclaves, enterprises can leverage open-source frontier models (like Llama-3 or Mistral) without exposing IP.`
  },
  {
    id: 'b3',
    title: 'Sub-300ms Voice Synthesis: Re-engineering Customer Service Telephony',
    category: 'Automation',
    date: 'July 10, 2026',
    readTime: '5 min read',
    excerpt: 'How streaming neural voice synthesis and low-latency WebRTC channels enable human-indistinguishable conversational voicebots.',
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Priya Sharma',
      role: 'Principal Voice Engineer',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80'
    },
    content: `Human conversation hinges on millisecond turn-taking. If a voice assistant takes longer than 500ms to respond, the illusion breaks down. We detail our WebRTC streaming pipeline that achieves 240ms end-to-end speech-to-speech latency.`
  }
];

export const BlogSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudio();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="relative py-24 bg-[#030712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> Apex AI Insights & Research
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Frontier AI Engineering Articles
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Deep technical breakdowns, architectural blueprints, and industry trends from our AI research labs.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              onMouseEnter={playHoverSound}
              className="group rounded-3xl glass-card border border-white/10 overflow-hidden glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-purple-300 uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs text-slate-300 font-medium">{post.author.name}</span>
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedPost(post);
                  }}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0F172A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                playClickSound();
                setSelectedPost(null);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedPost.category}</span>
            <h3 className="text-2xl font-extrabold text-white mt-1 mb-4">{selectedPost.title}</h3>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-6 pb-4 border-b border-white/10">
              <span>By {selectedPost.author.name} ({selectedPost.author.role})</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-light whitespace-pre-line">
              {selectedPost.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
