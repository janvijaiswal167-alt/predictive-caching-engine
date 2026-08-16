import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, FileText, Languages, Play, Copy, Check, ArrowRight, Bot, Cpu } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AIDemoSection: React.FC = () => {
  const { playClickSound, playSuccessSound } = useAudio();
  const [activeTab, setActiveTab] = useState<'voice' | 'summarizer' | 'translation'>('voice');

  // --- Voice Assistant State ---
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [voiceResponse, setVoiceResponse] = useState('');
  const [voiceProcessing, setVoiceProcessing] = useState(false);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas Audio Wave Visualizer animation
  useEffect(() => {
    let animId: number;
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const renderWave = () => {
      tick += 0.1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerY = canvas.height / 2;
      const bars = 28;
      const barWidth = 4;

      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + 4) + 10;
        const amp = isRecording
          ? Math.sin(tick + i * 0.4) * 20 + 25
          : voiceProcessing
          ? Math.sin(tick * 2 + i * 0.2) * 12 + 15
          : 6;
        
        const gradient = ctx.createLinearGradient(0, centerY - amp, 0, centerY + amp);
        gradient.addColorStop(0, '#06B6D4');
        gradient.addColorStop(0.5, '#2563EB');
        gradient.addColorStop(1, '#7C3AED');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, centerY - amp / 2, barWidth, amp, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isRecording, voiceProcessing]);

  const handleToggleVoice = () => {
    playClickSound();
    if (!isRecording) {
      setIsRecording(true);
      setVoiceResponse('');
      setVoiceQuery('Listening... "How can Apex AI automate my customer onboarding?"');

      setTimeout(() => {
        setIsRecording(false);
        setVoiceProcessing(true);

        setTimeout(() => {
          setVoiceProcessing(false);
          setVoiceQuery('"How can Apex AI automate my customer onboarding?"');
          setVoiceResponse(
            'Apex AI deploys autonomous multi-modal agent workflows that verify customer identity, parse KYC documents via OCR, and generate personalized onboarding dashboards in real-time under 2 seconds.'
          );
          playSuccessSound();
        }, 1500);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  // --- Text Summarizer State ---
  const [inputText, setInputText] = useState(
    'Apex AI provides next-generation enterprise artificial intelligence engineering. Our custom deep learning models enable organizations to scale operations, lower latency, and replace legacy workflows with autonomous agent pipelines trained on private knowledge graphs.'
  );
  const [summaryResult, setSummaryResult] = useState<{ summary: string; bullets: string[]; compression: string } | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  const handleSummarize = () => {
    playClickSound();
    if (!inputText) return;
    setSummarizing(true);
    setSummaryResult(null);

    setTimeout(() => {
      setSummarizing(false);
      setSummaryResult({
        summary: 'Apex AI delivers enterprise deep learning & autonomous agent pipelines to optimize operational latency and scale workflows.',
        bullets: [
          'Deploys custom deep learning models for scale',
          'Autonomous agent pipelines replace legacy systems',
          'Private knowledge graphs ensure zero data leakage'
        ],
        compression: '72% Reduction'
      });
      playSuccessSound();
    }, 1400);
  };

  // --- Translation State ---
  const [transSourceText, setTransSourceText] = useState('Apex AI builds intelligent enterprise solutions for global market leaders.');
  const [selectedTargetLang, setSelectedTargetLang] = useState<'hi' | 'mr' | 'gu' | 'es' | 'fr'>('hi');
  const [copied, setCopied] = useState(false);

  const translationsMap = {
    hi: { lang: 'Hindi (हिन्दी)', text: 'एपेक्स एआई वैश्विक बाजार के नेताओं के लिए बुद्धिमान उद्यम समाधान बनाता है।' },
    mr: { lang: 'Marathi (मराठी)', text: 'अ‍ॅपेक्स एआय जागतिक बाजारपेठेतील आघाडीच्या कंपन्यांसाठी बुद्धिमान व्यवसाय उपाय तयार करते.' },
    gu: { lang: 'Gujarati (ગુજરાતી)', text: 'એપેક્સ એઆઈ વૈશ્વિક માર્કેટ લીડર્સ માટે બુદ્ધિશાળી એન્ટરપ્રાઇઝ સોલ્યુશન્સ બનાવે છે.' },
    es: { lang: 'Spanish (Español)', text: 'Apex AI crea soluciones empresariales inteligentes para líderes del mercado global.' },
    fr: { lang: 'French (Français)', text: 'Apex AI crée des solutions d\'entreprise intelligentes pour les leaders du marché mondial.' }
  };

  const copyToClipboard = (text: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demos" className="relative py-24 bg-[#030712] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-xs font-bold text-purple-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" /> Interactive Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Experience Apex AI Demos Live
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Test our real-time voice synthesis, NLP text summarization, and multi-lingual translation engines.
          </p>
        </div>

        {/* Demo Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('voice');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'voice'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>AI Voice Assistant</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('summarizer');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'summarizer'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>AI Text Summarizer</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('translation');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'translation'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>AI Translation</span>
            </button>
          </div>
        </div>

        {/* Demo Box Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* TAB 1: AI VOICE ASSISTANT DEMO */}
          {activeTab === 'voice' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">Apex Neural Voice Engine</h3>
                  <p className="text-xs text-slate-400 mt-1">Press the microphone to simulate real-time conversational AI audio interaction.</p>
                </div>
                
                {/* Canvas Audio Waveform Visualizer */}
                <div className="bg-[#030712] px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
                  <canvas ref={waveCanvasRef} width={220} height={40} className="w-[220px] h-[40px]" />
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    {isRecording ? 'RECORDING' : voiceProcessing ? 'PROCESSING' : 'READY'}
                  </span>
                </div>
              </div>

              {/* Mic Control Circle */}
              <div className="flex flex-col items-center justify-center py-6">
                <button
                  onClick={handleToggleVoice}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                    isRecording
                      ? 'bg-red-500 shadow-red-500/50 scale-110 animate-pulse'
                      : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 shadow-blue-500/30'
                  }`}
                >
                  {isRecording ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-white" />}
                </button>
                <span className="text-xs text-slate-300 font-semibold mt-4">
                  {isRecording ? 'Tap to Stop Listening' : 'Tap Microphone to Speak'}
                </span>
              </div>

              {/* Live Transcript & AI Output */}
              <div className="space-y-4">
                {voiceQuery && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-xs font-bold text-blue-300 flex-shrink-0">
                      YOU
                    </div>
                    <p className="text-xs text-slate-200 mt-1 font-medium">{voiceQuery}</p>
                  </div>
                )}

                {voiceProcessing && (
                  <div className="p-4 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-semibold text-purple-300">Apex LLM synthesizing audio response...</span>
                  </div>
                )}

                {voiceResponse && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Bot className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-wider">APEX VOICE RESPONSE</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">{voiceResponse}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI TEXT SUMMARIZER DEMO */}
          {activeTab === 'summarizer' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">Autonomous Text Summarizer</h3>
                  <p className="text-xs text-slate-400 mt-1">Compress lengthy business documents into key action items instantly.</p>
                </div>
                <button
                  onClick={() =>
                    setInputText(
                      'Artificial intelligence automation reduces enterprise operational overhead by up to 60%. By orchestrating autonomous agents, Apex AI ensures high throughput, low latency, and zero human error across critical back-office systems.'
                    )
                  }
                  className="text-xs text-purple-400 hover:text-purple-300 underline font-medium"
                >
                  Load Sample Text
                </button>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste article, document, or memo text here..."
                  className="w-full bg-[#030712]/90 border border-white/10 focus:border-blue-500 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleSummarize}
                disabled={summarizing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                {summarizing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Summarize with Apex Engine</span>
                  </>
                )}
              </button>

              {summaryResult && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">EXECUTIVE SUMMARY</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      {summaryResult.compression}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-semibold">{summaryResult.summary}</p>

                  <div className="space-y-2">
                    {summaryResult.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI TRANSLATION DEMO */}
          {activeTab === 'translation' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-bold text-white">Multi-Lingual AI Translation Engine</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instant real-time neural translation between English, Hindi, Marathi, Gujarati, Spanish, and French.
                </p>
              </div>

              {/* Language Selector Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['hi', 'mr', 'gu', 'es', 'fr'] as const).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => {
                      playClickSound();
                      setSelectedTargetLang(langKey);
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedTargetLang === langKey
                        ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {translationsMap[langKey].lang.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Translation Panels Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Source Input */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SOURCE (ENGLISH)</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">{transSourceText}</p>
                </div>

                {/* Target Output */}
                <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                      TARGET ({translationsMap[selectedTargetLang].lang})
                    </span>
                    <button
                      onClick={() => copyToClipboard(translationsMap[selectedTargetLang].text)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      title="Copy translation"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-100 leading-relaxed font-semibold">
                    {translationsMap[selectedTargetLang].text}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
