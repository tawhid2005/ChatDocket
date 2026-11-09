'use client';

import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileArchive,
  ShieldCheck,
  HeartHandshake,
  Scale,
  Sparkles,
  HelpCircle,
  Database,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  ChevronDown,
  Globe,
  Award,
  FileCheck2,
  Calendar,
  Apple,
  Smartphone,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface OnboardingGuideProps {
  onFileUpload: (files: File[]) => void;
  onLoadDemo: () => void;
  onOpenGuide: () => void;
  isLoading: boolean;
  uploadError?: string | null;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  onFileUpload,
  onLoadDemo,
  onOpenGuide,
  isLoading,
  uploadError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deviceTab, setDeviceTab] = useState<'iphone' | 'android'>('iphone');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(Array.from(e.target.files));
    }
  };

  const faqs = [
    {
      q: 'How does Chat Docket ensure 100% privacy without server uploads?',
      a: 'Chat Docket operates on a zero-knowledge WebAssembly client architecture. Your exported WhatsApp .zip and .txt files are decrypted, parsed, and converted to vector A4 PDFs strictly within your browser’s local RAM. Not a single character, phone number, or photo ever touches an external server.',
    },
    {
      q: 'Why do immigration caseworkers reject raw WhatsApp .txt or screenshot dumps?',
      a: 'Caseworkers at UKVI, USCIS, and IRCC process dozens of cases a day. Submitting 600 uncurated pages of daily chatter or unorganized screenshot folders frustrates adjudicators. Immigration guidelines (such as IRCC IMM 5289) require an organized, chronological PDF of key milestones (10 to 25 pages) showing continuous contact.',
    },
    {
      q: 'Does this comply with the Canada IRCC 10-page maximum communication rule?',
      a: 'Yes! Chat Docket provides a dedicated Canada IRCC preset that automatically samples multi-year chat histories into an embassy-compliant 10-15 page dossier, prioritizing travel planning, call schedules, and relationship milestones.',
    },
    {
      q: 'Can I redact sensitive banking numbers, phone numbers, and intimate messages?',
      a: 'Yes. With our Interactive 1-Click Redaction tool, you can simply click on any message or photo to immediately mask it with an official [REDACTED] black-out bar. You can also use our 1-click bulk PII redaction for phone numbers, email addresses, and financial account numbers.',
    },
    {
      q: 'How do certified translations work for foreign language chats (Banglish, Urdu, Spanish, Tagalog)?',
      a: 'Both UKVI and USCIS reject machine translations. Chat Docket allows you to add certified English translations directly beneath original foreign language bubbles in italics, and automatically includes a legal Translator Certification block.',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      {/* ================= HERO HEADER ================= */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Server Uploads • 100% In-Browser Memory Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          WhatsApp Chat to Official{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">
            Legal &amp; Spouse Visa
          </span>{' '}
          PDF
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Upload your exported WhatsApp <code>.zip</code> or <code>.txt</code> file below. No report will be generated until your file is uploaded.
        </p>
      </div>

      {/* Error Alert if upload failed */}
      {uploadError && (
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">File Processing Notice</span>
            <span>{uploadError}</span>
          </div>
        </div>
      )}

      {/* ================= 3-STEP VISUAL WORKFLOW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0">
            1
          </div>
          <div>
            <span className="font-bold text-xs text-white block">1. Upload Chat</span>
            <span className="text-[11px] text-slate-400">WhatsApp .zip or .txt (or try Demo)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-black text-xs shrink-0">
            2
          </div>
          <div>
            <span className="font-bold text-xs text-white block">2. Auto-Format</span>
            <span className="text-[11px] text-slate-400">Select UKVI, USCIS, or IRCC Preset</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center font-black text-xs shrink-0">
            3
          </div>
          <div>
            <span className="font-bold text-xs text-white block">3. Download PDF</span>
            <span className="text-[11px] text-slate-400">Bates Stamped &amp; SHA-256 Verified</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN UPLOAD DROPZONE ================= */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-200 backdrop-blur-2xl max-w-3xl mx-auto ${
          isDragging
            ? 'border-emerald-400 bg-emerald-500/15 scale-[1.01]'
            : 'border-emerald-500/40 hover:border-emerald-400 bg-white/[0.03] hover:bg-white/[0.05]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".zip,.txt"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/25 mb-4">
          {isLoading ? (
            <div className="w-8 h-8 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-10 h-10 stroke-[2.2]" />
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
          {isLoading ? 'Decrypting and Extracting Archive(s)...' : 'Upload WhatsApp .ZIP or .TXT File(s)'}
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Drag and drop your WhatsApp export archive, or click below to browse. You can also test with our 1-click sample demo!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 active:scale-95 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Processing Archive...</span>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                <span>📁 Choose File from Computer</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onLoadDemo}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] hover:border-emerald-400/50 text-white font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer group shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span>✨ Try Live Demo (Sample Chat)</span>
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Lock className="w-3.5 h-3.5" /> 100% Local In-Browser Privacy
          </span>
          <span className="flex items-center gap-1.5">
            <FileArchive className="w-3.5 h-3.5 text-slate-400" /> Supports .zip with photos &amp; calls
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" /> Supports raw .txt files
          </span>
        </div>
      </div>

      {/* ================= SUPPORTED EMBASSIES & STANDARDS ================= */}
      <div className="max-w-3xl mx-auto pt-1">
        <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Embassy Compliant &amp; Formatted for Official Legal Standards
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <span className="text-xs font-bold text-white block mb-0.5">🇬🇧 UK Home Office</span>
            <span className="text-[10px] text-slate-400">Appendix FM Partner Visa</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <span className="text-xs font-bold text-white block mb-0.5">🇺🇸 US USCIS</span>
            <span className="text-[10px] text-slate-400">Form I-130 / CR1 Bona Fide</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <span className="text-xs font-bold text-white block mb-0.5">🇨🇦 Canada IRCC</span>
            <span className="text-[10px] text-slate-400">Guide IMM 5289 (10-Pg Limit)</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <span className="text-xs font-bold text-white block mb-0.5">🇦🇺 Australia DHA</span>
            <span className="text-[10px] text-slate-400">Subclass 820/801 Relationship</span>
          </div>
        </div>
      </div>

      {/* ================= STEP-BY-STEP EXPORT GUIDE FOR IPHONE & ANDROID ================= */}
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>How to get the .ZIP file from your phone</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Follow these simple 4 steps in WhatsApp to export your chat:
            </p>
          </div>

          {/* Device Switcher Pills */}
          <div className="p-1 bg-slate-900 border border-white/[0.1] rounded-2xl flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setDeviceTab('iphone')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                deviceTab === 'iphone'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iPhone (iOS)</span>
            </button>

            <button
              type="button"
              onClick={() => setDeviceTab('android')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                deviceTab === 'android'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
          </div>
        </div>

        {/* Steps Content */}
        {deviceTab === 'iphone' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">1</span>
                <span>Open Chat &amp; Tap Contact Name</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Open WhatsApp, tap your chat with your spouse, and tap their name at the top to open Contact Info.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>Tap &quot;Export Chat&quot;</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Scroll all the way down to the bottom of the screen and tap the <strong>Export Chat</strong> option.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">3</span>
                <span>Select &quot;Attach Media&quot;</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Choose <strong>Attach Media</strong> so photos, audio notes, and call records are included in the zip.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">4</span>
                <span>Save to Files or AirDrop</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Tap <strong>Save to Files</strong> (or AirDrop to PC/Mac) to get the <code>.zip</code> file, then drop it into the box above!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">1</span>
                <span>Open Chat &amp; Tap ⋮ Menu</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Open WhatsApp, open your chat, and tap the 3 vertical dots (<strong>⋮</strong>) in the top-right corner.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>Tap More &gt; Export Chat</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Select <strong>More</strong>, then tap <strong>Export chat</strong> in the popup menu.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">3</span>
                <span>Select &quot;Include Media&quot;</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Choose <strong>Include Media</strong> to ensure photos and call logs are extracted.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">4</span>
                <span>Send to Google Drive or Computer</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Save the <code>.zip</code> file to Google Drive or email it to your computer, then drop it into the box above!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= OPTIONAL SAMPLE DEMO TESTING BANNER ================= */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-lime-400/20 text-lime-400 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block">Don&apos;t have your WhatsApp ZIP export handy right now?</span>
            <span className="text-slate-400">
              You can test the features using our realistic 6-month sample demonstration chat (Tariq &amp; Sarah).
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLoadDemo}
          className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white font-bold text-xs transition border border-white/[0.1] shrink-0 active:scale-95"
        >
          Try Sample Demo Mode
        </button>
      </div>

      {/* ================= 6 MULTI-USE VERTICALS (MULTI-PURPOSE PLATFORM) ================= */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Multi-Purpose Legal &amp; Evidence Engine</span>
          </div>
          <h3 className="text-2xl font-black text-white">One Tool, Endless Evidentiary &amp; Memory Use Cases</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Engineered for immigration solicitors, litigants in court, families, landlords, freelancers, and couples worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition space-y-2">
            <div className="text-2xl">💑</div>
            <h4 className="text-sm font-bold text-white">Spouse &amp; Fiancé Visas</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              UK Home Office Appendix FM, USCIS I-130, IRCC Canada spousal sponsorship. Proof of genuine &amp; subsisting relationship.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-indigo-500/40 transition space-y-2">
            <div className="text-2xl">⚖️</div>
            <h4 className="text-sm font-bold text-white">Civil Court Litigation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bates stamped forensic exhibits (`Exhibit A - Page 001`), line-by-line numbering, and cryptographic SHA-256 evidence integrity.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-rose-500/40 transition space-y-2">
            <div className="text-2xl">👨‍👩‍👧</div>
            <h4 className="text-sm font-bold text-white">Family Court &amp; Child Custody</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Document co-parenting discussions, child support promises, harassment logs, and highlight missed voice &amp; video calls.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition space-y-2">
            <div className="text-2xl">🏠</div>
            <h4 className="text-sm font-bold text-white">Landlord &amp; Tenant Disputes</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Security deposit deductions, mold/repair notices, rent payment confirmations, and lease agreement text exchanges.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/40 transition space-y-2">
            <div className="text-2xl">💼</div>
            <h4 className="text-sm font-bold text-white">Freelancer &amp; Client Contracts</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Document client approvals on WhatsApp, scope change authorizations, deliverable acceptance, and unpaid invoice discussions.
            </p>
          </div>

          <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-pink-500/40 transition space-y-2">
            <div className="text-2xl">🎁</div>
            <h4 className="text-sm font-bold text-white">Romantic Keepsake &amp; Gift Book</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Print your entire love story as an anniversary keepsake photobook with full-color photos, call streaks, and romantic dedication cover.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 3 FEATURE HIGHLIGHTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 backdrop-blur-xl">
          <div className="text-sm font-extrabold text-slate-400 mb-2">01.</div>
          <h3 className="text-base font-bold text-white mb-1.5">Universal Extraction</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Extracts .zip archives containing <code>_chat.txt</code> or <code>WhatsApp Chat.txt</code> alongside photos and voice records strictly in local RAM.
          </p>
        </div>

        <div className="bg-[#a3e635] text-slate-950 rounded-3xl p-6 shadow-xl shadow-lime-500/20">
          <div className="text-sm font-extrabold text-slate-900 mb-2">02.</div>
          <h3 className="text-base font-black text-slate-950 mb-1.5">Smart Embassy Sampling</h3>
          <p className="text-xs text-slate-900 font-medium leading-relaxed">
            Condenses thousands of messages into an official 15-25 page packet (UK Home Office, USCIS) or 10 pages (Canada IRCC) with call tables and gap explanations.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 backdrop-blur-xl">
          <div className="text-sm font-extrabold text-slate-400 mb-2">03.</div>
          <h3 className="text-base font-bold text-white mb-1.5">Vector A4 PDF Output</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bates stamps (<code>Exhibit A - Page 001</code>), cryptographic SHA-256 integrity hash, line numbers, and certified translation stamps.
          </p>
        </div>
      </div>

      {/* ================= FREQUENTLY ASKED QUESTIONS (SEO & TRUST) ================= */}
      <div id="faq" className="max-w-3xl mx-auto space-y-4 pt-6">
        <div className="text-center space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers for Applicants &amp; Solicitors</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-400">
            Everything you need to know about embassy compliance, privacy, and evidence rules.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-white/[0.03] transition cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
