'use client';

import React, { useState, useEffect } from 'react';
import { X, Languages, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { ParsedMessage } from '@/types/chat';

interface TranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ParsedMessage | null;
  onSaveTranslation: (messageId: string, translation: string) => void;
}

export const TranslationModal: React.FC<TranslationModalProps> = ({
  isOpen,
  onClose,
  message,
  onSaveTranslation,
}) => {
  const [translationText, setTranslationText] = useState('');

  useEffect(() => {
    if (message) {
      setTranslationText(message.translation || '');
    }
  }, [message]);

  if (!isOpen || !message) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveTranslation(message.id, translationText.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="bg-[#0b0f19] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-white/[0.1] text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 text-slate-950 flex items-center justify-center">
              <Languages className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Add Certified English Translation</h3>
              <p className="text-[11px] text-slate-400">Required by UKVI, USCIS, and IRCC for foreign language messages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Original Message Box */}
          <div className="p-3.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl space-y-1">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
              <span>Original Message by {message.sender}</span>
              <span className="font-mono">{message.rawTimestamp}</span>
            </div>
            <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed italic">
              &quot;{message.content}&quot;
            </p>
          </div>

          {/* Translation Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 block">
              Certified English Translation:
            </label>
            <textarea
              rows={4}
              required
              value={translationText}
              onChange={(e) => setTranslationText(e.target.value)}
              placeholder="Enter faithful English translation as verified by certified translator..."
              className="w-full p-3 bg-slate-900 border border-white/[0.15] rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Legal Notice */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-tight">
              Translations will appear directly under the original message in the PDF with a certified translation notice on the cover page.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-bold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 text-xs font-black hover:opacity-90 transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              Save Translation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

