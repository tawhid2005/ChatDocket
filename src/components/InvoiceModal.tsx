'use client';

import React from 'react';
import { X, CheckCircle2, Download, Printer, ShieldCheck, Key, Copy, Check } from 'lucide-react';
import { PaymentOrder } from '@/types/auth';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: PaymentOrder | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, order }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !order) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(order.licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative max-w-lg w-full rounded-3xl overflow-hidden border border-emerald-500/30 bg-[#090d16] shadow-2xl text-white">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 font-black flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Payment Successful &amp; Activated</h3>
              <p className="text-[11px] text-emerald-300">Order ID: {order.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* License Key Card */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-emerald-500/40 space-y-2">
            <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider block">
              Your Personal License Key:
            </span>
            <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-xl font-mono text-sm text-emerald-300 font-bold border border-white/[0.1]">
              <span>{order.licenseKey}</span>
              <button
                onClick={handleCopyKey}
                className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              License is automatically bound to your account ({order.userEmail}). All exported PDFs are now 100% white-label and watermark-free!
            </p>
          </div>

          {/* Receipt Table */}
          <div className="border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.02]">
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-white/[0.06]">
                <tr>
                  <td className="p-2.5 text-slate-400 font-medium">Billed To:</td>
                  <td className="p-2.5 text-white font-bold text-right">{order.userName} ({order.userEmail})</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400 font-medium">Plan Purchased:</td>
                  <td className="p-2.5 text-white font-bold text-right">{order.planName}</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400 font-medium">Date &amp; Time:</td>
                  <td className="p-2.5 text-slate-300 text-right">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-400 font-medium">Payment Method:</td>
                  <td className="p-2.5 text-slate-300 capitalize text-right">{order.paymentMethod.replace('_', ' ')}</td>
                </tr>
                {order.discount > 0 && (
                  <tr>
                    <td className="p-2.5 text-emerald-400 font-medium">Discount Applied:</td>
                    <td className="p-2.5 text-emerald-400 font-bold text-right">-${order.discount.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="bg-white/[0.04] font-bold">
                  <td className="p-2.5 text-white">Total Amount Paid:</td>
                  <td className="p-2.5 text-emerald-400 text-base font-black text-right">${order.finalAmount.toFixed(2)} USD</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Money Back note */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes full invoice receipt and 30-day money back guarantee.</span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs transition border border-white/[0.1] flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-400 text-slate-950 font-black text-xs hover:opacity-90 transition active:scale-95"
            >
              Return to Project &amp; Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

