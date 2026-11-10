'use client';

import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Printer,
  Sparkles,
  HelpCircle,
  Database,
  Crown,
  HeartHandshake,
  Scale,
  RotateCcw,
  User,
  LogOut,
  Key,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';
import { ExportMode, PaperSize } from '@/types/chat';
import { UserProfile } from '@/types/auth';
import { BrandLogo } from '@/components/BrandLogo';

interface NavbarProps {
  mode: ExportMode;
  onModeChange: (mode: ExportMode) => void;
  onOpenGuide: () => void;
  onOpenPricing: () => void;
  onOpenWrapped: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  isPro: boolean;
  hasData: boolean;
  isDemoMode: boolean;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
  paperSize: PaperSize;
  onPaperSizeChange: (size: PaperSize) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onModeChange,
  onOpenGuide,
  onOpenPricing,
  onOpenWrapped,
  onLoadSample,
  onReset,
  isPro,
  hasData,
  isDemoMode,
  user,
  onOpenAuth,
  onSignOut,
  paperSize,
  onPaperSizeChange,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handlePrint = () => {
    if (hasData) {
      window.print();
    }
  };

  const handleCopyKey = () => {
    if (user?.licenseKey) {
      navigator.clipboard.writeText(user.licenseKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 h-14 bg-[#060810]/95 backdrop-blur-2xl border-b border-white/[0.08] px-3 sm:px-5 flex items-center transition-all">
      <div className="max-w-[1700px] w-full mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand (Always Single Line, Never Crushed) */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <BrandLogo size="sm" showText={false} className="sm:hidden shrink-0" />
          <BrandLogo size="md" showText={false} className="hidden sm:flex shrink-0" />
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">Docket</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635] animate-pulse shrink-0" />
              </span>
              {!hasData && (
                <span className="hidden md:inline-block text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  100% Client-Side
                </span>
              )}
              {isDemoMode && (
                <span className="hidden sm:inline-block text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Demo Mode
                </span>
              )}
            </div>
            {!hasData && (
              <p className="text-[11px] text-slate-400 hidden lg:block">
                WhatsApp to Official Legal &amp; Spouse Visa PDF Exporter
              </p>
            )}
          </div>
        </div>

        {/* Center: Compact Paper Size Switcher (Desktop Workspace) */}
        {hasData && (
          <div className="hidden xl:flex items-center bg-slate-900 border border-white/[0.1] rounded-xl p-0.5 text-xs font-bold shrink-0 whitespace-nowrap">
            <button
              onClick={() => onPaperSizeChange('a4')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                paperSize === 'a4'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="International ISO standard (UKVI, Canada, Australia)"
            >
              A4
            </button>
            <button
              onClick={() => onPaperSizeChange('letter')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                paperSize === 'letter'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="US Standard (USCIS & US Courts)"
            >
              US Letter
            </button>
          </div>
        )}

        {/* Right CTA Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
          {/* Upload New File / Reset button when data is loaded */}
          {hasData && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-xl border border-white/[0.1] transition cursor-pointer"
              title="Return to upload screen and clear current file"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">New File</span>
            </button>
          )}

          {/* Export Guide */}
          <button
            onClick={onOpenGuide}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl border border-white/[0.06] transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>How to Export</span>
          </button>

          {/* Viral Relationship Wrapped */}
          {hasData && (
            <button
              onClick={onOpenWrapped}
              className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-xl transition shadow-xs cursor-pointer"
              title="Generate viral Relationship Wrapped infographic"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>Wrapped</span>
            </button>
          )}

          {/* Pro Status / Upgrade Button */}
          <button
            onClick={onOpenPricing}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
              isPro
                ? 'bg-amber-400/15 text-amber-300 border-amber-400/40 shadow-xs'
                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            <Crown className={`w-3.5 h-3.5 ${isPro ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
            <span>{isPro ? 'Pro' : 'Pricing'}</span>
          </button>

          {/* User Profile / Auth Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 py-1 px-2 sm:px-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
                <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name}</span>
                <div className="w-5 h-5 rounded-md bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                  {user.name[0]?.toUpperCase() || 'U'}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#0b0f19] border border-white/[0.1] shadow-2xl p-3 z-50 text-xs space-y-3 animate-in fade-in duration-100">
                  <div className="border-b border-white/[0.08] pb-2">
                    <span className="font-bold text-white block">{user.name}</span>
                    <span className="text-[11px] text-slate-400 truncate block">{user.email}</span>
                    <span className="mt-1 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      PLAN: {user.plan.toUpperCase()}
                    </span>
                  </div>

                  {user.licenseKey && (
                    <div className="p-2 bg-slate-950 rounded-xl border border-white/[0.08] space-y-1">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">License Key:</span>
                      <div className="flex justify-between items-center font-mono text-[11px] text-emerald-300">
                        <span>{user.licenseKey}</span>
                        <button onClick={handleCopyKey} className="text-slate-400 hover:text-white cursor-pointer">
                          {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-slate-300 hover:text-red-300 flex items-center gap-2 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 shadow-xs transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Sign In / Register</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          )}

          {/* Print / Save PDF Primary CTA (Desktop) */}
          {hasData && (
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
