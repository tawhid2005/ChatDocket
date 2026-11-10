'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  ShieldCheck,
  Phone,
  Video,
  PhoneMissed,
  Image as ImageIcon,
  FileText,
  AlertTriangle,
  User,
  Heart,
  Eye,
  EyeOff,
  CheckCheck,
  Scale,
  Calendar,
  Clock,
  Sparkles,
  Printer,
  Check,
  BadgeCheck,
  Crown,
  ArrowRight,
  Lock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ParsedMessage,
  CallEntry,
  ChatMetadata,
  GapAnnotation,
  FilterConfig,
  BrandingConfig,
} from '@/types/chat';

interface DocumentPreviewProps {
  messages: ParsedMessage[];
  calls: CallEntry[];
  metadata: ChatMetadata | null;
  gapAnnotations: GapAnnotation[];
  filterConfig: FilterConfig;
  brandingConfig: BrandingConfig;
  isRedactionMode: boolean;
  onToggleRedactMessage: (id: string) => void;
  onOpenTranslationModal?: (msg: ParsedMessage) => void;
  onDownloadCertificate?: () => void;
  onOpenPricing?: () => void;
}

const FREE_MESSAGE_LIMIT = 20;
const FREE_CALL_LIMIT = 6;
const FREE_MEDIA_LIMIT = 4;

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  messages,
  calls,
  metadata,
  gapAnnotations,
  filterConfig,
  brandingConfig,
  isRedactionMode,
  onToggleRedactMessage,
  onOpenTranslationModal,
  onDownloadCertificate,
  onOpenPricing,
}) => {
  const [mounted, setMounted] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Automatically set clean legal filename & suppress website title in PDF save dialog
  useEffect(() => {
    let originalTitle = '';
    const handleBeforePrint = () => {
      originalTitle = document.title;
      document.title = brandingConfig.caseReference || 'Official_Communication_Record';
    };
    const handleAfterPrint = () => {
      if (originalTitle) document.title = originalTitle;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [brandingConfig.caseReference]);

  const p1 = metadata?.participants[0] || brandingConfig.applicantName || 'Applicant';
  const p2 = metadata?.participants[1] || brandingConfig.sponsorName || 'Sponsor';

  // Monthly breakdown data for Recharts (prefer true full-archive stats over sampled slice)
  const monthlyData = useMemo(() => {
    if (metadata?.monthlyStats && metadata.monthlyStats.length > 0) {
      return metadata.monthlyStats;
    }

    const map = new Map<string, { month: string; count: number }>();
    messages.forEach((m) => {
      const monthKey = m.timestamp.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!map.has(monthKey)) {
        map.set(monthKey, { month: monthKey, count: 0 });
      }
      map.get(monthKey)!.count++;
    });
    return Array.from(map.values());
  }, [metadata?.monthlyStats, messages]);

  // Photo evidence items
  const mediaItems = useMemo(() => {
    return messages.filter((m) => m.isMedia && (m.mediaBlobUrl || m.mediaFileName));
  }, [messages]);

  // Enforce Free Preview limits vs Pro Unlimited Plan
  const visibleMessages = useMemo(() => {
    return brandingConfig.isPro ? messages : messages.slice(0, FREE_MESSAGE_LIMIT);
  }, [messages, brandingConfig.isPro]);

  const visibleCalls = useMemo(() => {
    if (!brandingConfig.isPro) {
      return calls.slice(0, FREE_CALL_LIMIT);
    }
    // Keep call table concise on sampled embassy presets while showing full summary metrics
    if (filterConfig.samplingDensity !== 'all' && calls.length > 50) {
      const step = calls.length / 50;
      const sampled: CallEntry[] = [];
      for (let i = 0; i < 50; i++) {
        const item = calls[Math.floor(i * step)];
        if (item) sampled.push(item);
      }
      return sampled;
    }
    return calls;
  }, [calls, brandingConfig.isPro, filterConfig.samplingDensity]);

  const visibleMedia = useMemo(() => {
    return brandingConfig.isPro ? mediaItems : mediaItems.slice(0, FREE_MEDIA_LIMIT);
  }, [mediaItems, brandingConfig.isPro]);

  const isMessageLimitReached = !brandingConfig.isPro && messages.length > FREE_MESSAGE_LIMIT;

  // Dynamic sequential Bates page numbering based on active sections (no skipped numbers)
  const batesPages = useMemo(() => {
    let next = Math.max(1, brandingConfig.startingBatesNumber || 1);
    const formatBates = (num: number) =>
      `${brandingConfig.batesPrefix}${String(num).padStart(4, '0')}`;

    const cover = brandingConfig.showCoverPage ? formatBates(next++) : '';
    const callsPage =
      brandingConfig.showCallSummaryTable && calls.length > 0 ? formatBates(next++) : '';
    const gaps =
      brandingConfig.showGapAnnotations && gapAnnotations.length > 0 ? formatBates(next++) : '';
    const photos =
      brandingConfig.showPhotoGrid && visibleMedia.length > 0 ? formatBates(next++) : '';
    const messagesPage = formatBates(next++);

    return { cover, calls: callsPage, gaps, photos, messages: messagesPage };
  }, [
    brandingConfig.startingBatesNumber,
    brandingConfig.batesPrefix,
    brandingConfig.showCoverPage,
    brandingConfig.showCallSummaryTable,
    brandingConfig.showGapAnnotations,
    brandingConfig.showPhotoGrid,
    calls.length,
    gapAnnotations.length,
    visibleMedia.length,
  ]);

  const visaPresetBadge = useMemo(() => {
    if (brandingConfig.mode !== 'visa') return null;
    switch (brandingConfig.visaPreset) {
      case 'uk_home_office':
        return 'UK Home Office (Appendix FM) Standard';
      case 'us_uscis':
        return 'US USCIS (Form I-130 / CR1) US Letter';
      case 'canada_ircc':
        return 'Canada IRCC (IMM 5289) Compact Format';
      case 'australia_dha':
        return 'Australia DHA (Subclass 820/801) Format';
      default:
        return null;
    }
  }, [brandingConfig.mode, brandingConfig.visaPreset]);

  // Non-English messages requiring translation
  const hasTranslations = useMemo(() => {
    return visibleMessages.some((m) => !!m.translation);
  }, [visibleMessages]);

  // Calculate accurate call duration only from explicit durations in export, otherwise count answered calls
  const callStats = useMemo(() => {
    let totalExplicitMins = 0;
    let explicitDurationCount = 0;
    let answeredCount = 0;

    calls.forEach((c) => {
      if (c.status === 'answered') {
        answeredCount++;
        const hrs = c.duration.match(/(\d+)\s*hr/i);
        const mins = c.duration.match(/(\d+)\s*min/i);
        const secs = c.duration.match(/(\d+)\s*sec/i);
        if (hrs || mins || secs) {
          explicitDurationCount++;
          if (hrs) totalExplicitMins += parseInt(hrs[1], 10) * 60;
          if (mins) totalExplicitMins += parseInt(mins[1], 10);
          if (secs) totalExplicitMins += Math.round(parseInt(secs[1], 10) / 60);
        }
      }
    });

    if (explicitDurationCount > 0) {
      return {
        label: 'Call Hours Logged',
        value: `${Math.floor(totalExplicitMins / 60)}h ${totalExplicitMins % 60}m`,
        subtext: `${explicitDurationCount} timed calls`,
      };
    }

    return {
      label: 'Answered Calls',
      value: `${answeredCount}`,
      subtext: `${calls.length - answeredCount} missed / declined`,
    };
  }, [calls]);

  const callHoursFormatted = callStats.value;

  return (
    <div className="printable-area w-full flex-1 bg-[#090d16] p-3 sm:p-6 lg:p-8 lg:h-full lg:overflow-y-auto overflow-y-auto pb-24 lg:pb-8 print:h-auto print:overflow-visible">
      {/* Dynamic Print Page Size Rule (A4 vs US Letter) & Suppress Browser URL/Time Headers */}
      <style media="print">{`
        @page {
          size: ${brandingConfig.paperSize === 'letter' ? 'letter' : 'A4'} portrait;
          margin: 0mm !important;
        }
      `}</style>

      {/* Top Floating Studio Toolbar */}
      <div className="no-print max-w-[210mm] mx-auto mb-4 flex flex-wrap items-center justify-between text-xs text-slate-400 bg-white/[0.03] border border-white/[0.08] px-3 sm:px-4 py-2.5 rounded-2xl backdrop-blur-md gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-bold text-slate-200">
            {brandingConfig.paperSize === 'letter' ? 'US Letter' : 'A4'} Live Preview
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            {brandingConfig.paperSize === 'letter' ? '8.5" × 11" (USCIS Standard)' : '210mm × 297mm (Vector A4)'}
          </span>
          {!brandingConfig.isPro && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Free Preview ({visibleMessages.length}/{messages.length} msgs)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls (desktop) */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-white/[0.1] rounded-xl p-0.5 text-[11px] font-bold">
            <button
              onClick={() => setZoomScale(0.85)}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${zoomScale === 0.85 ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              85%
            </button>
            <button
              onClick={() => setZoomScale(1)}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${zoomScale === 1 ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              100%
            </button>
            <button
              onClick={() => setZoomScale(1.15)}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${zoomScale === 1.15 ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              115%
            </button>
          </div>

          {/* Certificate Download */}
          {onDownloadCertificate && (
            <button
              onClick={onDownloadCertificate}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 font-semibold rounded-xl border border-white/[0.1] text-xs transition cursor-pointer"
              title="Download official forensic hash certificate (.txt)"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Integrity Certificate</span>
            </button>
          )}

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-emerald-400 to-lime-400 text-slate-950 font-black rounded-xl hover:opacity-90 transition text-xs shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      <div
        style={{
          transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
        }}
        className="print-reset-transform max-w-[210mm] mx-auto space-y-6 sm:space-y-8"
      >
        {/* ================= SECTION 1: COVER PAGE ================= */}
        {brandingConfig.showCoverPage && (
          <div className="a4-page-preview p-5 sm:p-10 lg:p-12 relative flex flex-col justify-between border border-slate-300 page-break-after rounded-xl sm:rounded-none">
            <div>
              {/* Top Legal / Law Firm Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {brandingConfig.lawFirmName || 'CHRONOLOGICAL COMMUNICATION RECORD & RELATIONSHIP EVIDENCE'}
                  </h1>
                  <p className="text-xs font-semibold text-slate-600 mt-1 uppercase tracking-wider">
                    Official Evidentiary Packet • {brandingConfig.exhibitLetter || 'Exhibit A'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900 px-2.5 py-1 bg-slate-100 rounded border border-slate-300 inline-block">
                    {brandingConfig.caseReference || 'CASE-REF: PENDING'}
                  </div>
                  {brandingConfig.showSha256Header && metadata?.sha256Hash && (
                    <div className="text-[9px] font-mono text-slate-500 mt-1">
                      Integrity Hash: {metadata.sha256Hash.substring(0, 16)}...
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Purpose */}
              <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {brandingConfig.mode === 'visa' && 'Spouse / Partner Visa Evidentiary Submission'}
                      {brandingConfig.mode === 'legal' && 'Judicial & Court Legal Exhibit (Civil Proceedings)'}
                      {brandingConfig.mode === 'custody' && 'Family Court Evidence (Custody & Communication Schedule)'}
                      {brandingConfig.mode === 'tenant' && 'Residential Tenancy Dispute & Rent Correspondence Record'}
                      {brandingConfig.mode === 'business' && 'Commercial Freelance & Contract Dispute Evidence'}
                      {brandingConfig.mode === 'keepsake' && 'Our Story: Relationship Keepsake & Anniversary Book'}
                    </span>
                  </span>
                  {visaPresetBadge && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold tracking-normal normal-case">
                      {visaPresetBadge}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {brandingConfig.mode === 'keepsake'
                    ? `The Chronicles of Love: ${brandingConfig.applicantName || p1} & ${brandingConfig.sponsorName || p2}`
                    : `Documented WhatsApp Communication History between ${brandingConfig.applicantName || p1} & ${brandingConfig.sponsorName || p2}`}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {brandingConfig.mode === 'keepsake'
                    ? 'A permanent celebration of our shared laughs, late night talks, travels, and unforgettable milestones captured in continuous conversation.'
                    : 'This document presents an unalterable, chronological record of continuous communication, voice/video call logs, and correspondence extracted from WhatsApp for official review.'}
                </p>
              </div>

              {/* 4 Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Messages</span>
                  <span className="text-xl font-black text-slate-900">
                    {metadata?.parsedMessagesCount || messages.length}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Chronologically logged</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Calls</span>
                  <span className="text-xl font-black text-slate-900">{calls.length}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Voice &amp; Video</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">{callStats.label}</span>
                  <span className="text-xl font-black text-emerald-700">{callHoursFormatted}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{callStats.subtext}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Time Span</span>
                  <span className="text-xl font-black text-indigo-700">
                    {metadata?.timeSpanMonths ? `${metadata.timeSpanMonths} Mos` : 'Multi-Month'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Timeline duration</span>
                </div>
              </div>

              {/* Monthly Communication Volume Chart */}
              <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Monthly Communication Continuity Trend
                  </h3>
                  <span className="text-[10px] text-slate-500">Total Messages per Month (Full Archive)</span>
                </div>

                {mounted && monthlyData.length > 0 ? (
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis
                          width={42}
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          tickFormatter={(val: number) =>
                            val >= 1000 ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : String(val)
                          }
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: '#334155',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '11px',
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#10b981"
                          radius={[4, 4, 0, 0]}
                          isAnimationActive={false}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-xs text-slate-400">
                    Loading communication trend chart...
                  </div>
                )}
              </div>

              {/* Case Details Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-xs">
                <table className="w-full text-left">
                  <tbody>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="py-2 px-3 font-semibold text-slate-600 w-1/3">Applicant / Party 1:</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{brandingConfig.applicantName || p1}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-3 font-semibold text-slate-600">Sponsor / Party 2:</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{brandingConfig.sponsorName || p2}</td>
                    </tr>
                    <tr className="border-b border-slate-100 bg-slate-50/60">
                      <td className="py-2 px-3 font-semibold text-slate-600">Evidence Period:</td>
                      <td className="py-2 px-3 text-slate-800">
                        {metadata?.startDate ? metadata.startDate.toLocaleDateString('en-GB') : 'Start'} –{' '}
                        {metadata?.endDate ? metadata.endDate.toLocaleDateString('en-GB') : 'Present'}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-3 font-semibold text-slate-600">Sampling Density Applied:</td>
                      <td className="py-2 px-3 text-slate-800 font-medium">
                        {filterConfig.samplingDensity === 'all'
                          ? 'Complete Unsampled Log (100% of Messages)'
                          : filterConfig.samplingDensity === '3_per_week'
                          ? 'Smart Sampled (Up to 3 Milestones per Calendar Week)'
                          : filterConfig.samplingDensity === '5_per_month'
                          ? 'Smart Sampled (Up to 5 Milestones per Calendar Month)'
                          : `Targeted Page Density (~${filterConfig.targetPageCount} Pages)`}
                      </td>
                    </tr>
                    {metadata?.sha256Hash && (
                      <tr className="bg-slate-50/60">
                        <td className="py-2 px-3 font-semibold text-slate-600">Forensic SHA-256 Hash:</td>
                        <td className="py-2 px-3 font-mono text-[10px] text-slate-700 break-all">
                          {metadata.sha256Hash}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Certified Translation Declaration Block (Mandatory for UKVI & USCIS) */}
              {hasTranslations && (
                <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-xl mb-6 text-xs text-amber-950 avoid-break">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                    <BadgeCheck className="w-4 h-4 text-amber-700" />
                    <span>Certified Translator Declaration (Immigration Adjudication Standard)</span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-normal">
                    I hereby certify that all foreign language dialogue herein (including Banglish / Urdu / Spanish) has been faithfully translated into English, and that the English translations appearing directly under each respective chat entry are true and accurate to the best of my knowledge and linguistic competence.
                  </p>
                </div>
              )}
            </div>

            {/* Official Certification / Signature Block */}
            <div className="pt-4 border-t-2 border-slate-900 mt-auto avoid-break">
              <div className="font-bold text-[11px] text-slate-900 uppercase tracking-wide mb-1">
                Statutory Statement of Truth / Witness Statement
              </div>
              <p className="text-[10px] text-slate-600 italic mb-5 leading-normal">
                {brandingConfig.notesOrDeclaration ||
                  'I believe that the facts stated in this witness statement, communication schedule, and attached chat exhibits are true. I understand that proceedings for contempt of court or visa refusal may be brought against anyone who makes a false statement in a document verified by a statement of truth.'}
              </p>

              <div className="grid grid-cols-2 gap-8 text-xs pt-4">
                <div className="border-t border-slate-400 pt-2">
                  <div className="font-bold text-slate-900">{brandingConfig.applicantName || p1}</div>
                  <div className="text-[10px] text-slate-500">Signature of Applicant &amp; Date</div>
                </div>
                <div className="border-t border-slate-400 pt-2">
                  <div className="font-bold text-slate-900">{brandingConfig.sponsorName || p2}</div>
                  <div className="text-[10px] text-slate-500">Signature of Sponsor / Spouse &amp; Date</div>
                </div>
              </div>

              {/* Page footer / Bates */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-6 pt-2 border-t border-slate-100">
                <span>
                  {brandingConfig.isPro
                    ? brandingConfig.caseReference || 'Confidential Evidentiary Dossier'
                    : 'Free Preview • Upgrade for Official Watermark-Free Submission'}
                </span>
                <span className="font-mono font-bold text-slate-700">
                  {batesPages.cover}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION 2: CALL LOG SUMMARY TABLE ================= */}
        {brandingConfig.showCallSummaryTable && calls.length > 0 && (
          <div className="a4-page-preview p-5 sm:p-10 lg:p-12 relative flex flex-col justify-between border border-slate-300 page-break-after rounded-xl sm:rounded-none">
            <div>
              <div className="border-b border-slate-300 pb-3 mb-5 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase">
                    Call Log Summary Schedule
                  </h2>
                  <p className="text-xs text-slate-500">
                    Chronological schedule of voice and video calls verifying continuous verbal contact
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-slate-500">
                  {visibleCalls.length} of {calls.length} Calls
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto mb-6 text-xs">
                <table className="w-full text-left min-w-[480px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Date &amp; Time</th>
                      <th className="py-2.5 px-3">Caller</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleCalls.map((call, idx) => (
                      <tr key={call.id || idx} className="hover:bg-slate-50/50">
                        <td className="py-2 px-3 font-medium text-slate-900 whitespace-nowrap">
                          {call.rawTimestamp}
                        </td>
                        <td className="py-2 px-3 text-slate-700 truncate max-w-[120px]">{call.caller}</td>
                        <td className="py-2 px-3 text-slate-700">
                          <span className="inline-flex items-center gap-1">
                            {call.type === 'video' ? (
                              <Video className="w-3.5 h-3.5 text-indigo-600" />
                            ) : (
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                            <span className="capitalize">{call.type}</span>
                          </span>
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-800">{call.duration}</td>
                        <td className="py-2 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              call.status === 'answered'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            }`}
                          >
                            {call.status === 'answered' ? 'Completed' : 'Missed / No Answer'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Duration</span>
                  <span className="font-extrabold text-slate-900">{callHoursFormatted}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Video Calls</span>
                  <span className="font-extrabold text-indigo-700">
                    {calls.filter((c) => c.type === 'video').length}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Voice Calls</span>
                  <span className="font-extrabold text-emerald-700">
                    {calls.filter((c) => c.type === 'voice').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-8 pt-2 border-t border-slate-100 avoid-break">
              <span>{brandingConfig.caseReference || 'Exhibit Schedule'} • Call Summary</span>
              <span className="font-mono font-bold text-slate-700">
                {batesPages.calls}
              </span>
            </div>
          </div>
        )}

        {/* ================= SECTION 3: COMMUNICATION GAPS ================= */}
        {brandingConfig.showGapAnnotations && gapAnnotations.length > 0 && (
          <div className="a4-page-preview p-8 sm:p-12 relative flex flex-col justify-between border border-slate-300 page-break-after">
            <div>
              <div className="border-b border-slate-300 pb-3 mb-6">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Communication Gap Explanations</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Formal explanation of periods exceeding 14 days without digital messaging (in accordance with immigration casework guidance)
                </p>
              </div>

              <div className="space-y-4">
                {gapAnnotations.map((gap, index) => (
                  <div
                    key={gap.id}
                    className="gap-box p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-950 text-sm">
                        Gap #{index + 1}: {gap.startDate} to {gap.endDate}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold text-[10px]">
                        {gap.gapDays} Days Duration
                      </span>
                    </div>
                    <div className="text-slate-800 leading-relaxed font-medium bg-white p-3 rounded-lg border border-amber-200/60">
                      {gap.explanation}
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      Casework note: This break in digital chat corresponds to cohabitation, in-person travel, or professional duties as supported by corresponding passport stamps or travel itineraries.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-8 pt-2 border-t border-slate-100 avoid-break">
              <span>{brandingConfig.caseReference || 'Exhibit Schedule'} • Communication Gaps</span>
              <span className="font-mono font-bold text-slate-700">
                {batesPages.gaps}
              </span>
            </div>
          </div>
        )}

        {/* ================= SECTION 4: PHOTO EVIDENCE GALLERY ================= */}
        {brandingConfig.showPhotoGrid && visibleMedia.length > 0 && (
          <div className="a4-page-preview p-5 sm:p-10 lg:p-12 relative flex flex-col justify-between border border-slate-300 page-break-after rounded-xl sm:rounded-none">
            <div>
              <div className="border-b border-slate-300 pb-3 mb-6 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-emerald-600" />
                    <span>Photo Evidence &amp; Visual Exhibits</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Photographic attachments extracted directly from WhatsApp communication stream
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-500">
                  {visibleMedia.length} of {mediaItems.length} Photos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibleMedia.map((item, idx) => (
                  <div
                    key={item.id}
                    className="photo-evidence-item bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs p-3 space-y-2"
                  >
                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200/80">
                      {item.mediaBlobUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.mediaBlobUrl}
                          alt={item.mediaFileName || `Photo evidence ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 mb-1" />
                          <span className="text-[10px]">{item.mediaFileName || 'Media attached'}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-900">Exhibit Photo #{idx + 1}</span>
                        <span className="font-mono text-slate-500">{item.rawTimestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-tight">
                        <strong>Sender:</strong> {item.sender}
                      </p>
                      {item.content && (
                        <p className="text-[10px] text-slate-500 line-clamp-2 italic">
                          &quot;{item.content.replace(/^[a-zA-Z0-9_\-.]+\.(?:jpg|png|jpeg)\s*\((?:file\s+attached)\)/i, '').trim() || item.mediaFileName}&quot;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-8 pt-2 border-t border-slate-100 avoid-break">
              <span>{brandingConfig.caseReference || 'Exhibit Schedule'} • Photo Evidence</span>
              <span className="font-mono font-bold text-slate-700">
                {batesPages.photos}
              </span>
            </div>
          </div>
        )}

        {/* ================= SECTION 5: MESSAGES STREAM (WHATSAPP OR LEGAL TABLE) ================= */}
        <div className="a4-page-preview p-4 sm:p-10 border border-slate-300 rounded-xl sm:rounded-none">
          <div className="border-b border-slate-300 pb-3 mb-6 flex flex-wrap justify-between items-center gap-2 text-xs">
            <div>
              <span className="font-extrabold text-slate-900 uppercase">
                {brandingConfig.lawFirmName ? `${brandingConfig.lawFirmName} • ` : ''}
                {brandingConfig.exhibitLetter || 'Exhibit A'} — Chat Logs
              </span>
              <span className="text-slate-500 ml-2">
                ({visibleMessages.length} of {messages.length} Messages Shown)
              </span>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-600">
              {brandingConfig.caseReference ? `Ref: ${brandingConfig.caseReference}` : 'Case Docket'}
            </div>
          </div>

          {/* Redaction Notice Banner if active */}
          {isRedactionMode && (
            <div className="no-print mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold">
                <EyeOff className="w-4 h-4 text-red-600" />
                Redaction Mode Active: Click any message or photo below to black-out sensitive PII.
              </span>
            </div>
          )}

          {/* Messages: WhatsApp Bubble Theme */}
          {brandingConfig.theme === 'whatsapp' ? (
            <div
              className={`space-y-3 ${
                brandingConfig.layout === 'two_column' ? 'two-column-layout' : ''
              }`}
            >
              {visibleMessages.map((msg, index) => {
                const isApplicant = msg.sender === p1;
                const isRedacted = msg.isRedacted;

                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      if (isRedactionMode) onToggleRedactMessage(msg.id);
                    }}
                    className={`chat-bubble-container flex flex-col ${
                      isApplicant ? 'items-start' : 'items-end'
                    } ${isRedactionMode ? 'redacted-hover-target' : ''}`}
                  >
                    {brandingConfig.showLineNumbers && (
                      <span className="text-[9px] font-mono text-slate-400 mb-0.5 px-1">
                        #{String(index + 1).padStart(4, '0')}
                      </span>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs relative border ${
                        isApplicant
                          ? 'bg-white border-slate-200 text-slate-900 rounded-tl-xs'
                          : 'bg-emerald-50 border-emerald-200 text-slate-900 rounded-tr-xs'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-3 text-[10px] font-bold text-slate-600 mb-1">
                        <span className={isApplicant ? 'text-indigo-700' : 'text-emerald-700'}>
                          {msg.sender}
                        </span>
                        <span className="font-normal text-slate-400 whitespace-nowrap">{msg.rawTimestamp}</span>
                      </div>

                      {isRedacted ? (
                        <div className="redacted-block my-1 text-xs">
                          [REDACTED BY LEGAL COUNSEL]
                        </div>
                      ) : (
                        <>
                          {msg.isCall ? (
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-100/60 text-emerald-950 font-medium my-1">
                              {msg.callType === 'video' ? (
                                <Video className="w-4 h-4 text-indigo-600" />
                              ) : msg.callDuration?.includes('0 mins') ? (
                                <PhoneMissed className="w-4 h-4 text-rose-600" />
                              ) : (
                                <Phone className="w-4 h-4 text-emerald-600" />
                              )}
                              <span>{msg.content}</span>
                            </div>
                          ) : msg.isDeleted ? (
                            <div className="italic text-slate-400 flex items-center gap-1.5 my-1">
                              <span className="w-2 h-2 rounded-full bg-slate-300" />
                              <span>This message was deleted</span>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap leading-relaxed break-words">
                              {msg.content}
                            </div>
                          )}

                          {/* Voice Note Audio Rendering */}
                          {msg.mediaType === 'audio' || msg.mediaFileName?.endsWith('.opus') || msg.mediaFileName?.endsWith('.m4a') ? (
                            <div className="my-1.5 p-2 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-2.5 max-w-xs">
                              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <Phone className="w-3.5 h-3.5 fill-white" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-1 h-3">
                                  <div className="w-1 h-2 bg-emerald-600 rounded-full" />
                                  <div className="w-1 h-3.5 bg-emerald-500 rounded-full" />
                                  <div className="w-1 h-1.5 bg-emerald-400 rounded-full" />
                                  <div className="w-1 h-3 bg-emerald-600 rounded-full" />
                                  <div className="w-1 h-2 bg-emerald-500 rounded-full" />
                                  <div className="w-1 h-3.5 bg-emerald-400 rounded-full" />
                                  <div className="w-1 h-2.5 bg-emerald-600 rounded-full" />
                                  <div className="w-1 h-1.5 bg-emerald-300 rounded-full" />
                                </div>
                                <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                                  <span>Voice Note {msg.audioDuration || '0:42'}</span>
                                  <span className="text-emerald-700 font-bold">Audio Evidentiary File</span>
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {msg.isMedia && msg.mediaBlobUrl && (
                            <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 max-w-sm">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={msg.mediaBlobUrl}
                                alt={msg.mediaFileName || 'Media attachment'}
                                className="w-full max-h-48 object-cover"
                              />
                              <div className="p-1 text-[9px] text-slate-500 bg-white font-mono flex items-center justify-between">
                                <span>{msg.mediaFileName || 'Attachment'}</span>
                                <span className="font-semibold text-emerald-700">Verified Evidence</span>
                              </div>
                            </div>
                          )}

                          {msg.translation ? (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600 italic bg-amber-50/40 p-1.5 rounded relative group">
                              <span className="font-semibold text-amber-900 not-italic block text-[10px]">
                                Certified English Translation:
                              </span>
                              &quot;{msg.translation}&quot;
                              {onOpenTranslationModal && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenTranslationModal(msg);
                                  }}
                                  className="no-print opacity-0 group-hover:opacity-100 absolute top-1 right-1 text-[9px] text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded hover:bg-amber-300 transition"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                          ) : (
                            onOpenTranslationModal && !msg.isCall && !msg.isDeleted && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenTranslationModal(msg);
                                }}
                                className="no-print mt-1 text-[9px] text-slate-400 hover:text-amber-700 hover:underline block"
                              >
                                + Add Certified Translation
                              </button>
                            )
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-slate-300 rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse min-w-[520px]">
                <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2 px-2.5 w-14">Line #</th>
                    <th className="py-2 px-3 w-36">Timestamp</th>
                    <th className="py-2 px-3 w-32">Sender</th>
                    <th className="py-2 px-3">Message Content / Evidentiary Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {visibleMessages.map((msg, index) => {
                    const isRedacted = msg.isRedacted;

                    return (
                      <tr
                        key={msg.id}
                        onClick={() => {
                          if (isRedactionMode) onToggleRedactMessage(msg.id);
                        }}
                        className={`hover:bg-slate-50 ${isRedactionMode ? 'redacted-hover-target' : ''}`}
                      >
                        <td className="py-2 px-2.5 font-mono text-[10px] text-slate-500">
                          #{String(index + 1).padStart(4, '0')}
                        </td>
                        <td className="py-2 px-3 font-mono text-[10px] text-slate-600 whitespace-nowrap">
                          {msg.rawTimestamp}
                        </td>
                        <td className="py-2 px-3 font-semibold text-slate-900 truncate max-w-[120px]">
                          {msg.sender}
                        </td>
                        <td className="py-2 px-3 text-slate-800">
                          {isRedacted ? (
                            <span className="redacted-block font-mono">[REDACTED]</span>
                          ) : (
                            <div className="space-y-1">
                              <div className="whitespace-pre-wrap">{msg.content}</div>

                              {msg.translation && (
                                <div className="text-[10px] text-slate-500 italic bg-slate-50 p-1 rounded">
                                  <strong>Translation:</strong> &quot;{msg.translation}&quot;
                                </div>
                              )}

                              {msg.isMedia && (
                                <div className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3" />
                                  <span>[Media Attached: {msg.mediaFileName || 'Image'}]</span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Free Plan Limit Upgrade Prompt (Screen Only — Never Prints Inside Official PDF) */}
          {isMessageLimitReached && (
            <div className="no-print mt-8 p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-2 border-emerald-400/60 text-white shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-400 to-lime-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Lock className="w-6 h-6 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                  Free 5-Page Preview Limit Reached
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {messages.length - visibleMessages.length} More Messages Ready to Export
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  You are previewing {visibleMessages.length} of {messages.length} parsed messages. Upgrade to unlock the complete unwatermarked dossier, all {calls.length} call records, and full photo exhibits for embassy submission.
                </p>
              </div>

              {onOpenPricing && (
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className="mx-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-300 hover:to-lime-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 fill-slate-950" />
                  <span>Unlock Full Watermark-Free PDF ($12)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Watermark and Page Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-2 avoid-break">
            <div>
              {!brandingConfig.isPro ? (
                <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                  Free Verification Preview ({visibleMessages.length}/{messages.length} Msgs) • Upgrade for Full Unwatermarked Dossier
                </span>
              ) : (
                <span>Official Forensic Chat Record • Verifiable via SHA-256 Digest</span>
              )}
            </div>

            <div className="font-mono font-bold text-slate-700">
              {batesPages.messages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
