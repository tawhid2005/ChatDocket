'use client';

import React, { useState } from 'react';
import { X, Smartphone, Apple, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExportGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportGuideModal: React.FC<ExportGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="bg-[#0b0f19] rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-white/[0.1] text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-white/[0.02]">
          <div>
            <h3 className="font-extrabold text-lg text-white">How to Export WhatsApp Chat</h3>
            <p className="text-xs text-slate-400">Official step-by-step export instructions for iPhone (iOS) &amp; Android</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-white/[0.08] bg-black/40 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'ios'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone (iOS)</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold border-b-2 transition ${
              activeTab === 'android'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {activeTab === 'ios' ? (
            <div className="space-y-3.5">
              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Open Chat &amp; Tap Contact Name</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Open WhatsApp, select the conversation with your spouse or client, and tap the contact’s name at the very top of the screen.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Scroll Down to &quot;Export Chat&quot;</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Scroll down towards the bottom of the contact profile and tap the option labeled <strong>Export Chat</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Select &quot;Attach Media&quot;</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose <strong>Attach Media</strong> so your photos, voice call records, and documents are included for the Photo Evidence Grid.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Save or AirDrop the .zip File</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tap <strong>Save to Files</strong> (or AirDrop to your Mac/PC). Drag and drop the resulting <code>.zip</code> file directly into Chat Docket!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Open Chat &amp; Tap ⋮ Menu</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Open the chat in WhatsApp and tap the three vertical dots (<strong>⋮</strong>) in the top-right corner.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tap &quot;More&quot; &gt; &quot;Export Chat&quot;</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    In the menu dropdown, tap <strong>More</strong>, then tap <strong>Export chat</strong>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Choose &quot;Include Media&quot;</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select <strong>Include Media</strong> to include photos, call logs, and attachments for official evidence.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Save the Archive</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Save to Google Drive, email to yourself, or copy to your Downloads folder. Drop it directly into Chat Docket!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy tip */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white">100% Private &amp; Offline-Safe</p>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Chat Docket extracts and processes your WhatsApp zip entirely within your computer&apos;s WebAssembly / browser memory. No messages or media ever leave your device.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/40 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-slate-950 text-xs font-black rounded-xl transition"
          >
            Got it, take me back
          </button>
        </div>
      </div>
    </div>
  );
};
