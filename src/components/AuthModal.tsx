import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode = 'login', onClose }) => {
  const { playClickSound, playSuccessSound } = useAudio();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      playSuccessSound();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  const handleGoogleAuth = () => {
    playClickSound();
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setSuccess(true);
      playSuccessSound();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F172A]/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Neon Ambient Background Orbs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 mb-3 shadow-lg shadow-blue-500/25">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {mode === 'login' ? 'Welcome Back to Apex AI' : 'Join Apex AI Network'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' ? 'Access your AI dashboard and cloud infrastructure' : 'Create your executive AI account in seconds'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/10">
          <button
            onClick={() => {
              playClickSound();
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              playClickSound();
              setMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Authentication Successful</h4>
            <p className="text-xs text-slate-300">Redirecting to your Apex AI workspace...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-300">{error}</div>}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Workspace' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase font-semibold">OR CONTINUES WITH</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-all"
            >
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.37 7.36 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.99 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.63 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
