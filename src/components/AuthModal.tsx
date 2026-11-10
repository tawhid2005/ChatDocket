'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile } from '@/types/auth';
import { supabase, fetchUserProfile } from '@/lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  pendingPlanName?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  pendingPlanName,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (supabase) {
        if (tab === 'signup') {
          setSuccessMessage('Creating your ChatDocket cloud account...');
          const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
              data: {
                full_name: name.trim() || cleanEmail.split('@')[0],
              },
            },
          });

          if (error) throw error;

          if (data.user && data.session) {
            const profile = await fetchUserProfile(
              data.user.id,
              cleanEmail,
              name.trim() || cleanEmail.split('@')[0]
            );
            onSuccess(profile);
            onClose();
            return;
          } else if (data.user && !data.session) {
            // Email confirmation required by Supabase settings
            setIsLoading(false);
            setSuccessMessage(
              'Account created! Please check your email inbox and click the confirmation link to activate.'
            );
            return;
          }
        } else {
          setSuccessMessage('Verifying credentials with Supabase...');
          const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          });

          if (error) throw error;

          if (data.user) {
            const profile = await fetchUserProfile(
              data.user.id,
              data.user.email || cleanEmail,
              data.user.user_metadata?.full_name
            );
            onSuccess(profile);
            onClose();
            return;
          }
        }
      } else {
        // Fallback offline local session when Supabase keys are absent
        const user: UserProfile = {
          id: `usr_${Date.now().toString(36)}`,
          name: name.trim() || cleanEmail.split('@')[0],
          email: cleanEmail,
          plan: 'free',
          isVerified: true,
        };
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setIsLoading(true);
    setSuccessMessage('Connecting to Google OAuth...');

    try {
      if (supabase) {
        // Verify whether Google OAuth is enabled in Supabase before redirecting
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (sbUrl && sbKey) {
          try {
            const settingsRes = await fetch(`${sbUrl}/auth/v1/settings`, {
              headers: { apikey: sbKey },
            });
            if (settingsRes.ok) {
              const settings = await settingsRes.json();
              if (!settings?.external?.google) {
                setIsLoading(false);
                setSuccessMessage('');
                setErrorMessage(
                  'Google Sign-In is not enabled in Supabase yet. Please enter your Email & Password below to sign in instantly!'
                );
                return;
              }
            }
          } catch {}
        }

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
          },
        });
        if (error) throw error;
        // Browser will redirect to Google sign-in
        return;
      }

      // Offline fallback
      const user: UserProfile = {
        id: `usr_g_${Date.now().toString(36)}`,
        name: name.trim() || 'Alex Harrison',
        email: email.trim().toLowerCase() || 'alex.harrison@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        plan: 'free',
        isVerified: true,
      };
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(
        err.message?.includes('provider is not enabled')
          ? 'Google Sign-In is not enabled yet in Supabase. Please sign in with Email & Password below.'
          : err.message || 'Google Sign-In failed.'
      );
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setSuccessMessage('Logging in as verified case applicant...');
    setTimeout(() => {
      const user: UserProfile = {
        id: `usr_demo_${Date.now().toString(36)}`,
        name: 'Tariq Rahman',
        email: 'tariq.applicant@gmail.com',
        plan: 'free',
        isVerified: true,
      };
      onSuccess(user);
      setIsLoading(false);
      setSuccessMessage('');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative max-w-md w-full rounded-3xl overflow-hidden border border-white/[0.12] bg-[#090d16] shadow-2xl text-white">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 p-6 pb-4 flex items-center justify-between border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-lime-400 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Lock className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                {tab === 'signin' ? 'Sign In to Chat Docket' : 'Create Your Account'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {pendingPlanName
                  ? `Sign in required to activate ${pendingPlanName}`
                  : 'Manage cases, verified licenses & tax invoices'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="relative z-10 flex border-b border-white/[0.08] bg-black/30 p-1.5 gap-1.5">
          <button
            onClick={() => {
              setTab('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'signup'
                ? 'bg-white/[0.1] text-emerald-400 border border-white/[0.1] shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create New Account
          </button>
          <button
            onClick={() => {
              setTab('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'signin'
                ? 'bg-white/[0.1] text-emerald-400 border border-white/[0.1] shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In Existing
          </button>
        </div>

        {/* Feedback messages */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="relative z-10 p-6 space-y-4">
          {/* 1-Click Google OAuth */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white/[0.05] hover:bg-white/[0.1] active:scale-95 text-white font-bold rounded-2xl text-xs border border-white/[0.12] flex items-center justify-center gap-2.5 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[10px] uppercase font-bold text-slate-500">Or with Email</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {tab === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Your Full Name:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Tariq Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/[0.12] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 active:scale-95 text-slate-950 font-black text-xs rounded-2xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{tab === 'signin' ? 'Sign In Now' : 'Create Free Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-2 border-t border-white/[0.08] text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 underline font-semibold transition"
            >
              ⚡ Fast 1-Click Test Login (Tariq Rahman)
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted local session. We never share your data.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
