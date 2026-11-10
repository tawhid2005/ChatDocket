'use client';

import React, { useState } from 'react';
import {
  Settings,
  Filter,
  EyeOff,
  Palette,
  Briefcase,
  Calendar,
  Search,
  CheckSquare,
  Square,
  ShieldAlert,
  Columns,
  SquareMinus,
  FileCheck,
  PlusCircle,
  Trash2,
  Lock,
  Layers,
  Sparkles,
  RefreshCw,
  Hash,
  Clock,
  Printer,
  ChevronRight,
} from 'lucide-react';
import {
  ExportMode,
  FilterConfig,
  BrandingConfig,
  GapAnnotation,
  ChatMetadata,
  ParsedMessage,
  SamplingDensity,
  VisaPreset,
  DocumentTheme,
  DocumentLayout,
} from '@/types/chat';

interface ControlSidebarProps {
  metadata: ChatMetadata | null;
  filterConfig: FilterConfig;
  brandingConfig: BrandingConfig;
  gapAnnotations: GapAnnotation[];
  isRedactionMode: boolean;
  redactedCount: number;
  onFilterChange: (newFilters: Partial<FilterConfig>) => void;
  onBrandingChange: (newBranding: Partial<BrandingConfig>) => void;
  onToggleRedactionMode: (active: boolean) => void;
  onAutoRedact: (type: 'phone' | 'email' | 'financial') => void;
  onRedactKeyword: (keyword: string) => void;
  onClearRedactions: () => void;
  onAddGapAnnotation: (gap: GapAnnotation) => void;
  onRemoveGapAnnotation: (id: string) => void;
  onOpenPricing: () => void;
  onApplyVisaPreset: (preset: VisaPreset) => void;
  onDownloadCertificate: () => void;
  onReset: () => void;
  messages: ParsedMessage[];
}

export const ControlSidebar: React.FC<ControlSidebarProps> = ({
  metadata,
  filterConfig,
  brandingConfig,
  gapAnnotations,
  isRedactionMode,
  redactedCount,
  onFilterChange,
  onBrandingChange,
  onToggleRedactionMode,
  onAutoRedact,
  onRedactKeyword,
  onClearRedactions,
  onAddGapAnnotation,
  onRemoveGapAnnotation,
  onOpenPricing,
  onApplyVisaPreset,
  onDownloadCertificate,
  onReset,
  messages,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'filter' | 'privacy' | 'theme' | 'agency'>('preset');
  const [keywordToRedact, setKeywordToRedact] = useState('');

  // Custom gap form state
  const [newGapStart, setNewGapStart] = useState('');
  const [newGapEnd, setNewGapEnd] = useState('');
  const [newGapReason, setNewGapReason] = useState('');

  const participants = metadata?.participants || [];

  const handleToggleSender = (sender: string) => {
    const current = filterConfig.selectedSenders;
    if (current.includes(sender)) {
      if (current.length === 1) return;
      onFilterChange({ selectedSenders: current.filter((s) => s !== sender) });
    } else {
      onFilterChange({ selectedSenders: [...current, sender] });
    }
  };

  const handleCreateGap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGapStart || !newGapEnd || !newGapReason) return;
    const sDate = new Date(newGapStart);
    const eDate = new Date(newGapEnd);
    const diffDays = Math.max(1, Math.round(Math.abs(eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24)));

    onAddGapAnnotation({
      id: `custom-gap-${Date.now()}`,
      startDate: newGapStart,
      endDate: newGapEnd,
      gapDays: diffDays,
      explanation: newGapReason,
    });

    setNewGapStart('');
    setNewGapEnd('');
    setNewGapReason('');
  };

  const handleDatePreset = (monthsBack: number | 'all') => {
    if (!metadata?.endDate) return;
    if (monthsBack === 'all') {
      onFilterChange({ startDate: '', endDate: '' });
      return;
    }
    const end = new Date(metadata.endDate);
    const start = new Date(metadata.endDate);
    start.setMonth(start.getMonth() - monthsBack);

    onFilterChange({
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    });
  };

  return (
    <aside className="no-print w-full lg:w-80 xl:w-96 shrink-0 bg-[#080c16]/95 backdrop-blur-xl border-r border-white/[0.08] flex flex-col lg:h-full shadow-2xl z-30 text-slate-300 pb-20 lg:pb-0">
      {/* 5 Tab Navigation Bar (Always Pinned & Visible) */}
      <div className="flex border-b border-white/[0.08] bg-[#060913] p-1.5 gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('preset')}
          className={`flex-1 py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
            activeTab === 'preset'
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
          title="Select Visa Embassy or Case Type"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Visa / Case</span>
        </button>

        <button
          onClick={() => setActiveTab('filter')}
          className={`flex-1 py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
            activeTab === 'filter'
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
          title="Filter Dates, Pages & Search"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>

        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex-1 py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
          title="Hide Sensitive Phone Numbers & Messages"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Hide Info</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
          title="Design Theme & Sections"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Style</span>
        </button>

        <button
          onClick={() => setActiveTab('agency')}
          className={`flex-1 py-2 px-1 rounded-xl text-[10px] sm:text-[11px] font-bold flex flex-col items-center gap-1 transition cursor-pointer ${
            activeTab === 'agency'
              ? 'bg-gradient-to-r from-emerald-500 to-lime-400 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
          title="Applicant / Sponsor Names, Bates ID & Case Ref"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Names &amp; ID</span>
        </button>
      </div>

      {/* Tab Panels Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
        {/* ================= TAB 1: PRESET & MODE ================= */}
        {activeTab === 'preset' && (
          <div className="space-y-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 leading-relaxed">
              <strong className="text-emerald-400 block mb-0.5">Quick 3-Step Guide:</strong>
              1. Pick your Visa/Case preset below • 2. Check names in <strong>Names &amp; ID</strong> • 3. Click <strong>Print / Save PDF</strong>.
            </div>

            <div>
              <h3 className="font-extrabold text-white text-sm mb-1">1. Choose Document Purpose</h3>
              <p className="text-slate-400 text-[11px]">
                Select your visa or legal category to auto-configure the official PDF style.
              </p>
            </div>

            {/* 6 Multi-Use Vertical Mode selection buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onFilterChange({ mode: 'visa' });
                  onBrandingChange({
                    mode: 'visa',
                    theme: 'whatsapp',
                    layout: 'single',
                    showCoverPage: true,
                    showCallSummaryTable: true,
                    showPhotoGrid: true,
                    showGapAnnotations: true,
                    showSha256Header: true,
                    showLineNumbers: false,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'visa'
                    ? 'border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>💑 Spouse Visa</span>
                  {brandingConfig.mode === 'visa' && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  UKVI, USCIS, IRCC packets
                </p>
              </button>

              <button
                onClick={() => {
                  onFilterChange({ mode: 'legal' });
                  onBrandingChange({
                    mode: 'legal',
                    theme: 'legal_table',
                    layout: 'single',
                    showCoverPage: true,
                    showSha256Header: true,
                    showLineNumbers: true,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'legal'
                    ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>⚖️ Court &amp; Litigation</span>
                  {brandingConfig.mode === 'legal' && <div className="w-2 h-2 rounded-full bg-indigo-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Bates stamps &amp; SHA-256
                </p>
              </button>

              <button
                onClick={() => {
                  onFilterChange({ mode: 'custody' });
                  onBrandingChange({
                    mode: 'custody',
                    theme: 'legal_table',
                    layout: 'single',
                    showCoverPage: true,
                    showSha256Header: true,
                    showCallSummaryTable: true,
                    showLineNumbers: true,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'custody'
                    ? 'border-rose-500 bg-rose-500/15 shadow-lg shadow-rose-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>👨‍👩‍👧 Family &amp; Custody</span>
                  {brandingConfig.mode === 'custody' && <div className="w-2 h-2 rounded-full bg-rose-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Harassment &amp; missed calls
                </p>
              </button>

              <button
                onClick={() => {
                  onFilterChange({ mode: 'tenant' });
                  onBrandingChange({
                    mode: 'tenant',
                    theme: 'legal_table',
                    layout: 'single',
                    showCoverPage: true,
                    showPhotoGrid: true,
                    showSha256Header: true,
                    showLineNumbers: true,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'tenant'
                    ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>🏠 Tenant &amp; Landlord</span>
                  {brandingConfig.mode === 'tenant' && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Rent &amp; deposit disputes
                </p>
              </button>

              <button
                onClick={() => {
                  onFilterChange({ mode: 'business' });
                  onBrandingChange({
                    mode: 'business',
                    theme: 'legal_table',
                    layout: 'single',
                    showCoverPage: true,
                    showSha256Header: true,
                    showLineNumbers: true,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'business'
                    ? 'border-cyan-500 bg-cyan-500/15 shadow-lg shadow-cyan-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>💼 Freelance &amp; Client</span>
                  {brandingConfig.mode === 'business' && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Agreements &amp; unpaid invoices
                </p>
              </button>

              <button
                onClick={() => {
                  onFilterChange({ mode: 'keepsake' });
                  onBrandingChange({
                    mode: 'keepsake',
                    theme: 'whatsapp',
                    layout: 'single',
                    showCoverPage: true,
                    showPhotoGrid: true,
                    showGapAnnotations: false,
                    showSha256Header: false,
                    showLineNumbers: false,
                  });
                }}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  brandingConfig.mode === 'keepsake'
                    ? 'border-pink-500 bg-pink-500/15 shadow-lg shadow-pink-500/10'
                    : 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]'
                }`}
              >
                <div className="font-bold text-white flex items-center justify-between text-xs">
                  <span>🎁 Romantic Keepsake</span>
                  {brandingConfig.mode === 'keepsake' && <div className="w-2 h-2 rounded-full bg-pink-400" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Love story &amp; photobook
                </p>
              </button>
            </div>

            {/* Immigration Official Presets */}
            {brandingConfig.mode === 'visa' && (
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <label className="font-bold text-slate-200 text-[11px] block">
                  Official Embassy Presets:
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => onApplyVisaPreset('uk_home_office')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      brandingConfig.visaPreset === 'uk_home_office'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white font-bold'
                        : 'border-white/[0.08] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">UK Home Office (Appendix FM)</div>
                      <div className="text-[10px] text-slate-400">Spouse Visa: 3 msgs/week, calls, gaps</div>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      UK
                    </span>
                  </button>

                  <button
                    onClick={() => onApplyVisaPreset('us_uscis')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      brandingConfig.visaPreset === 'us_uscis'
                        ? 'border-cyan-500 bg-cyan-500/15 text-white font-bold'
                        : 'border-white/[0.08] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">US USCIS (I-130 / CR1 / IR1)</div>
                      <div className="text-[10px] text-slate-400">Bona Fide Marriage: Timeline &amp; US Letter</div>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
                      US
                    </span>
                  </button>

                  <button
                    onClick={() => onApplyVisaPreset('canada_ircc')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      brandingConfig.visaPreset === 'canada_ircc'
                        ? 'border-lime-500 bg-lime-500/15 text-white font-bold'
                        : 'border-white/[0.08] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">Canada IRCC (IMM 5289)</div>
                      <div className="text-[10px] text-slate-400">Target 10-15 pages max packet rule</div>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-lime-500/20 text-lime-400">
                      CA
                    </span>
                  </button>

                  <button
                    onClick={() => onApplyVisaPreset('australia_dha')}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                      brandingConfig.visaPreset === 'australia_dha'
                        ? 'border-indigo-500 bg-indigo-500/15 text-white font-bold'
                        : 'border-white/[0.08] hover:bg-white/[0.04] text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">Australia DHA (Subclass 820/801)</div>
                      <div className="text-[10px] text-slate-400">Partner Visa continuous contact proof</div>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                      AU
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick File & Hash Info */}
            {metadata && (
              <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/[0.08] space-y-1.5">
                <div className="font-bold text-slate-200 text-[11px] flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-emerald-400" />
                  <span>File Integrity Snapshot</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>File Name:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[170px]">{metadata.fileName}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Messages Parsed:</span>
                  <span className="font-medium text-slate-200">{metadata.parsedMessagesCount}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Calls Logged:</span>
                  <span className="font-medium text-slate-200">{metadata.totalCalls} calls</span>
                </div>
                {metadata.sha256Hash && (
                  <div className="pt-1 border-t border-white/[0.06] text-[10px] text-emerald-400 font-mono break-all">
                    SHA-256: {metadata.sha256Hash.substring(0, 24)}...
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SMART SAMPLING & FILTERS ================= */}
        {activeTab === 'filter' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-white text-sm mb-1">Smart Sampling &amp; Filters</h3>
              <p className="text-slate-400 text-[11px]">
                Condense thousands of texts into an embassy-friendly 15-25 page document.
              </p>
            </div>

            {/* Quick Date Range Presets */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200 text-[11px]">Quick Date Presets:</label>
              <div className="grid grid-cols-4 gap-1">
                <button
                  type="button"
                  onClick={() => handleDatePreset(3)}
                  className="py-1 px-1.5 bg-white/[0.04] hover:bg-white/[0.1] rounded-lg text-[10px] font-bold text-slate-300 text-center border border-white/[0.06]"
                >
                  3 Mos
                </button>
                <button
                  type="button"
                  onClick={() => handleDatePreset(6)}
                  className="py-1 px-1.5 bg-white/[0.04] hover:bg-white/[0.1] rounded-lg text-[10px] font-bold text-slate-300 text-center border border-white/[0.06]"
                >
                  6 Mos
                </button>
                <button
                  type="button"
                  onClick={() => handleDatePreset(12)}
                  className="py-1 px-1.5 bg-white/[0.04] hover:bg-white/[0.1] rounded-lg text-[10px] font-bold text-slate-300 text-center border border-white/[0.06]"
                >
                  1 Year
                </button>
                <button
                  type="button"
                  onClick={() => handleDatePreset('all')}
                  className="py-1 px-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-bold text-center border border-emerald-500/40"
                >
                  All
                </button>
              </div>
            </div>

            {/* Sampling Density */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200 text-[11px]">Sampling Density:</label>
              <select
                value={filterConfig.samplingDensity}
                onChange={(e) => onFilterChange({ samplingDensity: e.target.value as SamplingDensity })}
                className="w-full bg-slate-900 border border-white/[0.15] rounded-xl p-2 text-xs text-white font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Messages (Complete Unsampled)</option>
                <option value="3_per_week">Smart Sample: 3 Messages per Week (UKVI)</option>
                <option value="5_per_month">Smart Sample: 5 Messages per Month</option>
                <option value="target_pages">Target Page Count (IRCC 10-20 Pages)</option>
              </select>
            </div>

            {/* Target Page Count slider if target_pages */}
            {filterConfig.samplingDensity === 'target_pages' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
                  <span>Target Page Count:</span>
                  <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded font-black">
                    {filterConfig.targetPageCount} Pages
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={filterConfig.targetPageCount}
                  onChange={(e) => onFilterChange({ targetPageCount: parseInt(e.target.value, 10) })}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <p className="text-[10px] text-emerald-300/80">
                  Evenly distributes ~{filterConfig.targetPageCount * 14} prioritized messages across the chat timeline.
                </p>
              </div>
            )}

            {/* Search Query */}
            <div className="space-y-1">
              <label className="font-bold text-slate-200 text-[11px]">Search Messages:</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter keywords: flight, visa, ring..."
                  value={filterConfig.searchQuery}
                  onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white placeholder:text-slate-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Sender Selection */}
            {participants.length > 0 && (
              <div className="space-y-1.5">
                <label className="font-bold text-slate-200 text-[11px]">Include Senders:</label>
                <div className="space-y-1">
                  {participants.map((sender) => {
                    const isChecked = filterConfig.selectedSenders.includes(sender);
                    return (
                      <button
                        key={sender}
                        type="button"
                        onClick={() => handleToggleSender(sender)}
                        className="flex items-center gap-2 w-full text-left py-1 px-1.5 rounded-lg hover:bg-white/[0.04] transition"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                        <span className="truncate text-slate-200">{sender}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Filter Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <label className="font-bold text-slate-200 text-[11px]">Content Filters:</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterConfig.showOnlyWithMedia}
                  onChange={(e) => onFilterChange({ showOnlyWithMedia: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Only messages with photo/media</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterConfig.showOnlyCalls}
                  onChange={(e) => onFilterChange({ showOnlyCalls: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Only voice and video call logs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterConfig.hideDeleted}
                  onChange={(e) => onFilterChange({ hideDeleted: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Hide deleted message placeholders</span>
              </label>
            </div>

            {/* Gap Annotations Manager */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-200 text-[11px]">
                  Communication Gaps ({gapAnnotations.length}):
                </label>
              </div>

              {gapAnnotations.map((gap) => (
                <div key={gap.id} className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-amber-300 text-[10px]">
                      {gap.startDate} – {gap.endDate} ({gap.gapDays} days)
                    </span>
                    <button
                      onClick={() => onRemoveGapAnnotation(gap.id)}
                      className="text-amber-400 hover:text-red-400 transition"
                      title="Remove gap annotation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight">{gap.explanation}</p>
                </div>
              ))}

              {/* Add Custom Gap Explanation */}
              <form onSubmit={handleCreateGap} className="p-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl space-y-2">
                <div className="font-bold text-slate-200 text-[10px]">Add Custom Gap Explanation:</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="date"
                    value={newGapStart}
                    onChange={(e) => setNewGapStart(e.target.value)}
                    className="p-1 text-[10px] border border-white/[0.1] rounded-lg bg-slate-900 text-white"
                  />
                  <input
                    type="date"
                    value={newGapEnd}
                    onChange={(e) => setNewGapEnd(e.target.value)}
                    className="p-1 text-[10px] border border-white/[0.1] rounded-lg bg-slate-900 text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Reason: In-person visit, travel, remote area..."
                  value={newGapReason}
                  onChange={(e) => setNewGapReason(e.target.value)}
                  className="w-full p-1.5 text-[10px] border border-white/[0.1] rounded-lg bg-slate-900 text-white"
                />
                <button
                  type="submit"
                  disabled={!newGapStart || !newGapEnd || !newGapReason}
                  className="w-full py-1 bg-gradient-to-r from-emerald-500 to-lime-400 disabled:opacity-40 text-slate-950 font-bold rounded-lg text-[10px] transition"
                >
                  Save Gap Explanation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRIVACY & REDACTION ================= */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-white text-sm mb-1">Privacy &amp; Redaction</h3>
              <p className="text-slate-400 text-[11px]">
                Black out sensitive personal data, intimate photos, or financial records before export.
              </p>
            </div>

            {/* Interactive Redaction Mode Switch */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">Interactive Redaction Mode</span>
                <button
                  onClick={() => onToggleRedactionMode(!isRedactionMode)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isRedactionMode ? 'bg-red-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isRedactionMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                {isRedactionMode
                  ? 'Active: Click any message or photo in the preview to redact or unredact.'
                  : 'Turn on to click-and-redact individual messages or media items.'}
              </p>
            </div>

            {/* Redaction counter and clear */}
            {redactedCount > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl">
                <span className="text-xs font-bold text-red-400">
                  {redactedCount} item{redactedCount > 1 ? 's' : ''} redacted
                </span>
                <button
                  onClick={onClearRedactions}
                  className="text-xs text-red-300 hover:text-white underline font-semibold"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Keyword Bulk Redact Bar */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
              <label className="font-bold text-slate-200 text-[11px]">Multi-Redact Keyword Across All Chats:</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. password, passport, account#"
                  value={keywordToRedact}
                  onChange={(e) => setKeywordToRedact(e.target.value)}
                  className="flex-1 p-1.5 bg-slate-900 border border-white/[0.1] rounded-lg text-xs text-white"
                />
                <button
                  type="button"
                  disabled={!keywordToRedact.trim()}
                  onClick={() => {
                    onRedactKeyword(keywordToRedact);
                    setKeywordToRedact('');
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition"
                >
                  Redact All
                </button>
              </div>
            </div>

            {/* 1-Click Auto Redact Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <label className="font-bold text-slate-200 text-[11px]">1-Click Bulk Redact (All):</label>
              <div className="space-y-1.5">
                <button
                  onClick={() => onAutoRedact('phone')}
                  className="w-full py-1.5 px-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-slate-200 font-medium rounded-xl text-left flex items-center justify-between transition"
                >
                  <span>Redact Phone Numbers</span>
                  <span className="text-[10px] text-slate-400 font-mono">[REDACTED PHONE]</span>
                </button>

                <button
                  onClick={() => onAutoRedact('email')}
                  className="w-full py-1.5 px-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-slate-200 font-medium rounded-xl text-left flex items-center justify-between transition"
                >
                  <span>Redact Email Addresses</span>
                  <span className="text-[10px] text-slate-400 font-mono">[REDACTED EMAIL]</span>
                </button>

                <button
                  onClick={() => onAutoRedact('financial')}
                  className="w-full py-1.5 px-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-slate-200 font-medium rounded-xl text-left flex items-center justify-between transition"
                >
                  <span>Redact Bank / Card Digits</span>
                  <span className="text-[10px] text-slate-400 font-mono">[REDACTED ID]</span>
                </button>
              </div>
            </div>

            {/* Certified Translations note */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1 text-[11px] text-emerald-300">
              <div className="font-bold">Certified Translation Display:</div>
              <p className="text-slate-300">
                Non-English messages (e.g. Banglish, Urdu, Arabic, Spanish) display certified inline English translations beneath original chat bubbles in italics for caseworker scrutiny.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 4: THEME & LAYOUT ================= */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-white text-sm mb-1">Theme &amp; Document Layout</h3>
              <p className="text-slate-400 text-[11px]">Customize formatting, column count, and document sections.</p>
            </div>

            {/* Document Theme */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200 text-[11px]">Visual Theme:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBrandingChange({ theme: 'whatsapp' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.theme === 'whatsapp'
                      ? 'border-emerald-500 bg-emerald-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>WhatsApp Bubbles</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">Authentic chat view</div>
                </button>

                <button
                  onClick={() => onBrandingChange({ theme: 'legal_table' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.theme === 'legal_table'
                      ? 'border-indigo-500 bg-indigo-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>Legal Exhibit Table</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">High-contrast rows</div>
                </button>
              </div>
            </div>

            {/* Column Layout */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200 text-[11px]">Column Layout:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBrandingChange({ layout: 'single' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.layout === 'single'
                      ? 'border-emerald-500 bg-emerald-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>Single Column</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">Standard spacing</div>
                </button>

                <button
                  onClick={() => onBrandingChange({ layout: 'two_column' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.layout === 'two_column'
                      ? 'border-emerald-500 bg-emerald-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>Compact 2-Column</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">Saves 40% paper</div>
                </button>
              </div>
            </div>

            {/* Paper Size: A4 vs US Letter */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200 text-[11px]">Print Paper Standard:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onBrandingChange({ paperSize: 'a4' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.paperSize === 'a4' || !brandingConfig.paperSize
                      ? 'border-emerald-500 bg-emerald-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>ISO A4 (210×297mm)</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">UK, EU, Canada, AU</div>
                </button>

                <button
                  onClick={() => onBrandingChange({ paperSize: 'letter' })}
                  className={`p-2.5 rounded-2xl border text-left transition ${
                    brandingConfig.paperSize === 'letter'
                      ? 'border-emerald-500 bg-emerald-500/15 font-bold text-white'
                      : 'border-white/[0.08] text-slate-300 bg-white/[0.02]'
                  }`}
                >
                  <div>US Letter (8.5×11&quot;)</div>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">USCIS &amp; US Courts</div>
                </button>
              </div>
            </div>

            {/* Section Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <label className="font-bold text-slate-200 text-[11px]">Include Document Sections:</label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showCoverPage}
                  onChange={(e) => onBrandingChange({ showCoverPage: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Relationship Analytics Cover Page</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showCallSummaryTable}
                  onChange={(e) => onBrandingChange({ showCallSummaryTable: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Call Log Summary Table</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showPhotoGrid}
                  onChange={(e) => onBrandingChange({ showPhotoGrid: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Photo Evidence Gallery</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showGapAnnotations}
                  onChange={(e) => onBrandingChange({ showGapAnnotations: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Communication Gap Callouts</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showSha256Header}
                  onChange={(e) => onBrandingChange({ showSha256Header: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>SHA-256 File Integrity Header</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brandingConfig.showLineNumbers}
                  onChange={(e) => onBrandingChange({ showLineNumbers: e.target.checked })}
                  className="accent-emerald-400 rounded"
                />
                <span>Sequential Message Line Numbers (#0001)</span>
              </label>
            </div>
          </div>
        )}

        {/* ================= TAB 5: AGENCY WHITE-LABEL & EXPORT ================= */}
        {activeTab === 'agency' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-extrabold text-white text-sm mb-1">Agency &amp; Case White-Label</h3>
              <p className="text-slate-400 text-[11px]">
                Add legal firm metadata, case reference numbers, and Bates stamping.
              </p>
            </div>

            {/* Case Details */}
            <div className="space-y-2.5">
              <div>
                <label className="font-bold text-slate-200 text-[11px] block mb-1">
                  Law Firm / Agency Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Immigration Solicitors LLP"
                  value={brandingConfig.lawFirmName}
                  onChange={(e) => onBrandingChange({ lawFirmName: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 text-[11px] block mb-1">
                  Case Reference / Docket ID:
                </label>
                <input
                  type="text"
                  placeholder="e.g. HO-2024-SP-88391 or USCIS-I130-990"
                  value={brandingConfig.caseReference}
                  onChange={(e) => onBrandingChange({ caseReference: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-200 text-[11px] block mb-1">Applicant Name:</label>
                  <input
                    type="text"
                    value={brandingConfig.applicantName}
                    onChange={(e) => onBrandingChange({ applicantName: e.target.value })}
                    className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-200 text-[11px] block mb-1">Sponsor / Spouse:</label>
                  <input
                    type="text"
                    value={brandingConfig.sponsorName}
                    onChange={(e) => onBrandingChange({ sponsorName: e.target.value })}
                    className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-200 text-[11px] block mb-1">Exhibit Letter:</label>
                  <input
                    type="text"
                    placeholder="Exhibit A"
                    value={brandingConfig.exhibitLetter}
                    onChange={(e) => onBrandingChange({ exhibitLetter: e.target.value })}
                    className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-200 text-[11px] block mb-1">Bates Prefix:</label>
                  <input
                    type="text"
                    placeholder="BATES-"
                    value={brandingConfig.batesPrefix}
                    onChange={(e) => onBrandingChange({ batesPrefix: e.target.value })}
                    className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-200 text-[11px] block mb-1">Starting Bates Number:</label>
                <input
                  type="number"
                  min="1"
                  value={brandingConfig.startingBatesNumber}
                  onChange={(e) => onBrandingChange({ startingBatesNumber: parseInt(e.target.value, 10) || 1 })}
                  className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 text-[11px] block mb-1">
                  Statutory Statement of Truth / Witness Declaration:
                </label>
                <textarea
                  rows={3}
                  value={brandingConfig.notesOrDeclaration || ''}
                  onChange={(e) => onBrandingChange({ notesOrDeclaration: e.target.value })}
                  placeholder="I believe that the facts stated in this witness statement and communication schedule are true."
                  className="w-full p-2 bg-slate-900 border border-white/[0.15] rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Watermark Pro Badge */}
            <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">PDF Watermark</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    brandingConfig.isPro
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {brandingConfig.isPro ? 'Pro: Watermark Disabled' : 'Free: Watermark Active'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {brandingConfig.isPro
                  ? 'All exported PDF pages are 100% white-label and free of watermarks.'
                  : 'Free exports include a subtle footer watermark. Upgrade to remove.'}
              </p>
              {!brandingConfig.isPro && (
                <button
                  onClick={onOpenPricing}
                  className="w-full py-2 bg-gradient-to-r from-emerald-400 to-lime-400 text-slate-950 font-extrabold rounded-xl text-xs transition active:scale-95 shadow-md shadow-emerald-500/20"
                >
                  Upgrade to Remove Watermark
                </button>
              )}
            </div>

            {/* Forensic Certificate Download Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onDownloadCertificate}
                className="w-full py-2 px-3 bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 font-bold rounded-xl text-xs transition border border-emerald-500/30 flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Download Forensic Integrity Certificate (.txt)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="p-3 bg-black/60 border-t border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white rounded-xl transition border border-white/[0.1]"
          title="Upload new file / reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.print()}
          className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Vector A4</span>
        </button>
      </div>
    </aside>
  );
};
