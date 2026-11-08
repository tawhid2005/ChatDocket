'use client';

import React, { useState } from 'react';
import { X, Sparkles, Heart, MessageCircle, PhoneCall, Award, Flame, Copy, Check, Clock } from 'lucide-react';
import { ChatMetadata, ParsedMessage } from '@/types/chat';

interface RelationshipWrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ChatMetadata | null;
  messages: ParsedMessage[];
}

export const RelationshipWrappedModal: React.FC<RelationshipWrappedModalProps> = ({
  isOpen,
  onClose,
  metadata,
  messages,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !metadata) return null;

  const p1 = metadata.participants[0] || 'Partner 1';
  const p2 = metadata.participants[1] || 'Partner 2';

  const stats1 = metadata.participantStats[p1] || { messageCount: 0, wordCount: 0, mediaCount: 0, callCount: 0 };
  const stats2 = metadata.participantStats[p2] || { messageCount: 0, wordCount: 0, mediaCount: 0, callCount: 0 };

  const totalMsgs = stats1.messageCount + stats2.messageCount || 1;
  const p1Percent = Math.round((stats1.messageCount / totalMsgs) * 100);
  const p2Percent = 100 - p1Percent;

  // Calculate days together
  let totalDays = 1;
  if (metadata.startDate && metadata.endDate) {
    const diffTime = Math.abs(metadata.endDate.getTime() - metadata.startDate.getTime());
    totalDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
  }

  // Find most active hour of the day
  const hourCounts = new Array(24).fill(0);
  messages.forEach((m) => {
    const h = m.timestamp.getHours();
    hourCounts[h]++;
  });
  let peakHour = 20; // default 8pm
  let peakHourCount = 0;
  hourCounts.forEach((count, h) => {
    if (count > peakHourCount) {
      peakHourCount = count;
      peakHour = h;
    }
  });

  const peakHourFormatted = `${peakHour % 12 || 12} ${peakHour >= 12 ? 'PM' : 'AM'}`;

  // Find top emojis in chat
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojiMap = new Map<string, number>();
  messages.forEach((m) => {
    const matches = m.content.match(emojiRegex);
    if (matches) {
      matches.forEach((em) => {
        emojiMap.set(em, (emojiMap.get(em) || 0) + 1);
      });
    }
  });

  // Top 5 emojis or default romantic set
  const defaultEmojis = ['❤️', '💍', '✨', '😍', '☕'];
  const sortedEmojis = Array.from(emojiMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map((e) => e[0])
    .slice(0, 5);
  const topEmojis = sortedEmojis.length >= 3 ? sortedEmojis : defaultEmojis;

  const handleCopySummary = () => {
    const summaryText = `✨ Chat Docket: Our WhatsApp Relationship Wrapped ✨\n💑 ${p1} & ${p2}\n📅 ${totalDays} Days of Messages\n💬 ${totalMsgs} Total Messages (${p1} ${p1Percent}% vs ${p2} ${p2Percent}%)\n📞 ${metadata.totalCalls} Calls Logged\n⏰ Peak Chat Time: ${peakHourFormatted}\nTop Emojis: ${topEmojis.join(' ')}\n#ChatDocket #RelationshipGoals`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl border border-pink-500/30 bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-white p-6 sm:p-7">
        {/* Glow backdrop effect */}
        <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>WhatsApp Relationship Wrapped</span>
        </div>

        {/* Couple Title */}
        <h3 className="text-2xl font-black tracking-tight text-white mb-1 flex items-center gap-2">
          <span>{p1}</span>
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 shrink-0" />
          <span>{p2}</span>
        </h3>
        <p className="text-xs text-pink-200/80 mb-6">
          {totalDays} days of documented love and continuous communication
        </p>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold mb-1">
              <MessageCircle className="w-4 h-4" />
              <span>Total Messages</span>
            </div>
            <div className="text-2xl font-black text-white">{totalMsgs.toLocaleString()}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Chronologically parsed</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
              <PhoneCall className="w-4 h-4" />
              <span>Calls Exchanged</span>
            </div>
            <div className="text-2xl font-black text-white">{metadata.totalCalls}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Voice &amp; Video logs</p>
          </div>
        </div>

        {/* Who texts more bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-pink-300">{p1}: {p1Percent}%</span>
            <span className="text-indigo-300">{p2}: {p2Percent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
            <div
              style={{ width: `${p1Percent}%` }}
              className="bg-gradient-to-r from-pink-500 to-rose-400 h-full transition-all"
            />
            <div
              style={{ width: `${p2Percent}%` }}
              className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full transition-all"
            />
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            {p1Percent > p2Percent
              ? `🏆 ${p1} leads the conversation with ${stats1.messageCount} texts!`
              : `🏆 ${p2} leads the conversation with ${stats2.messageCount} texts!`}
          </p>
        </div>

        {/* Peak Chat Hour & Top Emojis */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Peak Chat Hour</span>
            </div>
            <div className="text-lg font-bold text-white">{peakHourFormatted}</div>
            <p className="text-[10px] text-slate-400">Night owls in sync</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Top Emojis</span>
            </div>
            <div className="text-lg tracking-wider">{topEmojis.join(' ')}</div>
            <p className="text-[10px] text-slate-400">Most frequent expressions</p>
          </div>
        </div>

        {/* Share / Copy CTA Button */}
        <div className="flex gap-2">
          <button
            onClick={handleCopySummary}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-pink-600/30 active:scale-95 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Wrapped Summary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

