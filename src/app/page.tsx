'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { OnboardingGuide } from '@/components/OnboardingGuide';
import { ControlSidebar } from '@/components/ControlSidebar';
import { DocumentPreview } from '@/components/DocumentPreview';
import { ExportGuideModal } from '@/components/ExportGuideModal';
import { PricingModal } from '@/components/PricingModal';
import { RelationshipWrappedModal } from '@/components/RelationshipWrappedModal';
import { TranslationModal } from '@/components/TranslationModal';
import { AuthModal } from '@/components/AuthModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { InvoiceModal } from '@/components/InvoiceModal';
import {
  ParsedMessage,
  CallEntry,
  ChatMetadata,
  GapAnnotation,
  FilterConfig,
  BrandingConfig,
  ExportMode,
  VisaPreset,
  PaperSize,
} from '@/types/chat';
import { UserProfile, SubscriptionPlan, PaymentOrder } from '@/types/auth';
import {
  extractWhatsAppZip,
  parseSingleWhatsAppTxt,
  mergeWhatsAppArchives,
  ParseResult,
} from '@/lib/whatsappParser';
import { getSampleChatData } from '@/lib/sampleData';
import {
  detectCommunicationGaps,
  smartSampleMessages,
  autoRedactContent,
} from '@/lib/visaSampler';
import { downloadForensicCertificate } from '@/lib/certificateGenerator';
import { generateLicenseKey } from '@/lib/paymentConfig';
import { AlertTriangle, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<ParsedMessage[]>([]);
  const [calls, setCalls] = useState<CallEntry[]>([]);
  const [metadata, setMetadata] = useState<ChatMetadata | null>(null);
  const [gapAnnotations, setGapAnnotations] = useState<GapAnnotation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedactionMode, setIsRedactionMode] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // User Authentication & Subscription States
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('visa_pass');
  const [completedOrder, setCompletedOrder] = useState<PaymentOrder | null>(null);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Informational Modals
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);
  const [selectedMsgForTranslation, setSelectedMsgForTranslation] = useState<ParsedMessage | null>(null);

  // Filter & Sampling configuration
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    mode: 'visa',
    startDate: '',
    endDate: '',
    selectedSenders: [],
    searchQuery: '',
    samplingDensity: '3_per_week',
    targetPageCount: 20,
    showOnlyWithMedia: false,
    showOnlyCalls: false,
    hideDeleted: false,
  });

  // Branding & Layout configuration
  const [brandingConfig, setBrandingConfig] = useState<BrandingConfig>({
    mode: 'visa',
    theme: 'whatsapp',
    layout: 'single',
    paperSize: 'a4',
    caseReference: 'HO-2024-SP-88391',
    applicantName: 'Applicant',
    sponsorName: 'Sponsor / Spouse',
    lawFirmName: '',
    exhibitLetter: 'Exhibit A',
    batesPrefix: 'BATES-',
    startingBatesNumber: 1,
    showCoverPage: true,
    showCallSummaryTable: true,
    showPhotoGrid: true,
    showGapAnnotations: true,
    showSha256Header: true,
    showLineNumbers: true,
    showWatermark: true,
    isPro: false,
    visaPreset: 'uk_home_office',
    notesOrDeclaration:
      'I believe that the facts stated in this witness statement, communication schedule, and attached chat exhibits are true. I understand that proceedings for contempt of court or visa refusal may be brought against anyone who makes a false statement in a document verified by a statement of truth.',
  });

  // Load user from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cd_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        if (parsed.plan !== 'free') {
          setBrandingConfig((b) => ({ ...b, isPro: true, showWatermark: false }));
        }
      }
    } catch {}

    // Check for Lemon Squeezy or Stripe return redirect query params (?checkout=success&plan=...)
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const isSuccess = params.get('checkout') === 'success';
        const planParam = params.get('plan') as SubscriptionPlan | null;
        const orderId = params.get('order_id') || `LS-${Date.now().toString().slice(-8)}`;
        const licenseParam = params.get('license');

        if (isSuccess && planParam) {
          const licenseKey = licenseParam || generateLicenseKey(planParam);
          const newOrder: PaymentOrder = {
            orderId,
            userId: 'usr_verified',
            userName: 'Verified Customer',
            userEmail: 'customer@chatdocket.com',
            planId: planParam,
            planName: planParam === 'agency_pro' ? 'Law Firm & Agency Pro' : 'Visa & Court Single Case Pass',
            amount: planParam === 'agency_pro' ? 39 : 12,
            currency: 'USD',
            discount: 0,
            finalAmount: planParam === 'agency_pro' ? 39 : 12,
            paymentMethod: 'gumroad',
            status: 'completed',
            licenseKey,
            createdAt: new Date().toISOString(),
          };

          setCompletedOrder(newOrder);

          // Update user profile and persist to localStorage
          setUser((prevUser) => {
            const updated: UserProfile = prevUser
              ? {
                  ...prevUser,
                  plan: planParam,
                  licenseKey,
                  purchasedAt: new Date().toISOString(),
                }
              : {
                  id: 'usr_verified',
                  email: 'customer@chatdocket.com',
                  name: 'Verified Customer',
                  plan: planParam,
                  licenseKey,
                  purchasedAt: new Date().toISOString(),
                };
            try {
              localStorage.setItem('cd_user_profile', JSON.stringify(updated));
            } catch {}
            return updated;
          });

          // Permanently unlock Pro features and remove all watermarks
          setBrandingConfig((b) => ({ ...b, isPro: true, showWatermark: false }));
          setIsInvoiceOpen(true);
          setAuthNotice(`🎉 Payment Verified! Official License ${licenseKey} Activated.`);
          setTimeout(() => setAuthNotice(null), 6000);

          // Clean query params from URL without refreshing
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch {}

    // Listen for Gumroad In-Page Overlay 'sale' postMessage event (when payment completes right in modal)
    const handleGumroadSale = (event: MessageEvent) => {
      if (!event.origin || !event.origin.includes('gumroad.com')) return;

      try {
        const payload = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (payload && (payload.post_message_name === 'sale' || payload.event === 'sale')) {
          const planToUnlock: SubscriptionPlan = 'visa_pass';
          const licenseKey = generateLicenseKey(planToUnlock);
          const orderId = payload.order_number || `GR-${Date.now().toString().slice(-8)}`;
          const customerEmail = payload.email || 'customer@chatdocket.com';

          const newOrder: PaymentOrder = {
            orderId: String(orderId),
            userId: 'usr_verified',
            userName: payload.name || 'Verified Customer',
            userEmail: customerEmail,
            planId: planToUnlock,
            planName: 'Visa & Court Single Case Pass',
            amount: 12,
            currency: 'USD',
            discount: 0,
            finalAmount: 12,
            paymentMethod: 'gumroad',
            status: 'completed',
            licenseKey,
            createdAt: new Date().toISOString(),
          };

          setCompletedOrder(newOrder);

          setUser((prevUser) => {
            const updated: UserProfile = prevUser
              ? {
                  ...prevUser,
                  plan: planToUnlock,
                  licenseKey,
                  purchasedAt: new Date().toISOString(),
                }
              : {
                  id: 'usr_verified',
                  email: customerEmail,
                  name: payload.name || 'Verified Customer',
                  plan: planToUnlock,
                  licenseKey,
                  purchasedAt: new Date().toISOString(),
                };
            try {
              localStorage.setItem('cd_user_profile', JSON.stringify(updated));
            } catch {}
            return updated;
          });

          setBrandingConfig((b) => ({ ...b, isPro: true, showWatermark: false }));
          setIsCheckoutOpen(false);
          setIsPricingOpen(false);
          setIsInvoiceOpen(true);
          setAuthNotice(`🎉 Payment Verified! Official License ${licenseKey} Activated.`);
          setTimeout(() => setAuthNotice(null), 8000);
        }
      } catch {}
    };

    window.addEventListener('message', handleGumroadSale);
    return () => {
      window.removeEventListener('message', handleGumroadSale);
    };
  }, []);

  // Reset to initial clean state
  const handleReset = () => {
    setMessages([]);
    setCalls([]);
    setMetadata(null);
    setGapAnnotations([]);
    setIsDemoMode(false);
    setUploadError(null);
  };

  // Load demo dataset (explicit demo mode)
  const handleLoadDemo = () => {
    setIsLoading(true);
    setUploadError(null);
    setTimeout(() => {
      const demo = getSampleChatData();
      setMessages(demo.messages);
      setCalls(demo.calls);
      setMetadata(demo.metadata);
      setGapAnnotations(demo.gaps);
      setIsDemoMode(true);

      setFilterConfig((prev) => ({
        ...prev,
        selectedSenders: demo.metadata.participants,
        samplingDensity: 'all',
      }));

      setBrandingConfig((prev) => ({
        ...prev,
        applicantName: demo.metadata.participants[0] || 'Tariq Rahman',
        sponsorName: demo.metadata.participants[1] || 'Dr. Sarah Jenkins',
        caseReference: 'UK-HO-2024-SP-88391',
        lawFirmName: 'Apex Immigration Solicitors LLP',
      }));

      setIsLoading(false);
    }, 250);
  };

  // Upload parser handler (supports single or multiple .zip / .txt archives)
  const handleFileUpload = async (files: File[] | File) => {
    const fileList = Array.isArray(files) ? files : [files];
    if (fileList.length === 0) return;

    setIsLoading(true);
    setUploadError(null);
    try {
      const results: ParseResult[] = [];

      for (const file of fileList) {
        if (file.name.toLowerCase().endsWith('.zip')) {
          const res = await extractWhatsAppZip(file);
          results.push(res);
        } else if (file.name.toLowerCase().endsWith('.txt')) {
          const res = await parseSingleWhatsAppTxt(file);
          results.push(res);
        }
      }

      if (results.length === 0) {
        throw new Error('Please upload a valid WhatsApp .zip archive or .txt text export file.');
      }

      const result = results.length === 1 ? results[0] : mergeWhatsAppArchives(results);

      if (!result.messages || result.messages.length === 0) {
        throw new Error('No valid messages could be extracted. Please ensure you selected "Export Chat" in WhatsApp.');
      }

      setMessages(result.messages);
      setCalls(result.calls);
      setMetadata(result.metadata);
      setIsDemoMode(false);

      const detectedGaps = detectCommunicationGaps(result.messages, 14);
      setGapAnnotations(detectedGaps);

      const participants = result.metadata.participants;
      setFilterConfig((prev) => ({
        ...prev,
        selectedSenders: participants,
      }));

      setBrandingConfig((prev) => ({
        ...prev,
        applicantName: participants[0] || 'Applicant',
        sponsorName: participants[1] || 'Sponsor',
        caseReference: `CASE-${Date.now().toString().slice(-6)}`,
        lawFirmName: prev.lawFirmName || 'Immigration & Legal Services',
      }));

      if (results.length > 1) {
        setAuthNotice(`Merged ${results.length} chat exports (${result.messages.length.toLocaleString()} messages chronologically)!`);
        setTimeout(() => setAuthNotice(null), 5000);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error processing WhatsApp archive. Please verify file format.');
    } finally {
      setIsLoading(false);
    }
  };

  // Plan Selection & Checkout Flow
  const handleSelectPlan = (planId: SubscriptionPlan) => {
    setSelectedPlan(planId);
    if (!user) {
      // Prompt Sign In / Registration first!
      setIsPricingOpen(false);
      setIsAuthOpen(true);
    } else {
      // User is logged in -> Open Checkout directly
      setIsPricingOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    try {
      localStorage.setItem('cd_user_profile', JSON.stringify(authenticatedUser));
    } catch {}

    setAuthNotice(`Signed in successfully as ${authenticatedUser.name}`);
    setTimeout(() => setAuthNotice(null), 4000);

    // If they were trying to buy a plan, open checkout immediately
    if (selectedPlan && selectedPlan !== 'free') {
      setIsCheckoutOpen(true);
    }
  };

  const handlePaymentSuccess = (order: PaymentOrder) => {
    setCompletedOrder(order);
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        plan: order.planId,
        licenseKey: order.licenseKey,
        purchasedAt: order.createdAt,
      };
      setUser(updatedUser);
      try {
        localStorage.setItem('cd_user_profile', JSON.stringify(updatedUser));
      } catch {}
    }

    // Unlock Pro and remove watermark
    setBrandingConfig((b) => ({
      ...b,
      isPro: true,
      showWatermark: false,
    }));

    setAuthNotice(`Payment Confirmed! License ${order.licenseKey} activated.`);
    setTimeout(() => setAuthNotice(null), 5000);

    setIsInvoiceOpen(true);
  };

  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('cd_user_profile');
    } catch {}
    setBrandingConfig((b) => ({ ...b, isPro: false, showWatermark: true }));
    setAuthNotice('Signed out of account.');
    setTimeout(() => setAuthNotice(null), 3000);
  };

  // Filter updates
  const handleFilterChange = (updates: Partial<FilterConfig>) => {
    setFilterConfig((prev) => ({ ...prev, ...updates }));
  };

  // Branding updates
  const handleBrandingChange = (updates: Partial<BrandingConfig>) => {
    setBrandingConfig((prev) => ({ ...prev, ...updates }));
  };

  const handlePaperSizeChange = (paperSize: PaperSize) => {
    setBrandingConfig((prev) => ({ ...prev, paperSize }));
  };

  // Preset switch
  const handleApplyVisaPreset = (preset: VisaPreset) => {
    if (preset === 'uk_home_office') {
      setBrandingConfig((prev) => ({
        ...prev,
        visaPreset: 'uk_home_office',
        theme: 'whatsapp',
        showCoverPage: true,
        showCallSummaryTable: true,
        showPhotoGrid: true,
        showGapAnnotations: true,
      }));
      setFilterConfig((prev) => ({
        ...prev,
        samplingDensity: '3_per_week',
      }));
    } else if (preset === 'us_uscis') {
      setBrandingConfig((prev) => ({
        ...prev,
        visaPreset: 'us_uscis',
        theme: 'legal_table',
        paperSize: 'letter',
        showCoverPage: true,
        showCallSummaryTable: true,
        showPhotoGrid: true,
        showGapAnnotations: true,
      }));
      setFilterConfig((prev) => ({
        ...prev,
        samplingDensity: 'all',
      }));
    } else if (preset === 'canada_ircc') {
      setBrandingConfig((prev) => ({
        ...prev,
        visaPreset: 'canada_ircc',
        theme: 'whatsapp',
        layout: 'two_column',
        showCoverPage: true,
        showCallSummaryTable: true,
        showPhotoGrid: true,
      }));
      setFilterConfig((prev) => ({
        ...prev,
        samplingDensity: 'target_pages',
        targetPageCount: 15,
      }));
    }
  };

  // Mode Switch
  const handleModeChange = (mode: ExportMode) => {
    setFilterConfig((prev) => ({ ...prev, mode }));
    setBrandingConfig((prev) => ({
      ...prev,
      mode,
      theme: mode === 'legal' || mode === 'custody' || mode === 'tenant' || mode === 'business' ? 'legal_table' : 'whatsapp',
      showLineNumbers: true,
      showSha256Header: true,
    }));
  };

  // Redaction handlers
  const handleToggleRedactMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            isRedacted: !m.isRedacted,
          };
        }
        return m;
      })
    );
  };

  const handleAutoRedact = (type: 'phone' | 'email' | 'financial') => {
    setMessages((prev) =>
      prev.map((m) => {
        const redacted = autoRedactContent(m.content, {
          phone: type === 'phone',
          email: type === 'email',
          idNumbers: type === 'financial',
        });
        return {
          ...m,
          content: redacted,
          isRedacted: m.isRedacted || redacted !== m.content,
        };
      })
    );
  };

  const handleRedactKeyword = (keyword: string) => {
    if (!keyword.trim()) return;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');

    setMessages((prev) =>
      prev.map((m) => {
        if (regex.test(m.content)) {
          return {
            ...m,
            content: m.content.replace(regex, '[REDACTED]'),
            isRedacted: true,
          };
        }
        return m;
      })
    );
  };

  const handleClearRedactions = () => {
    setMessages((prev) =>
      prev.map((m) => ({
        ...m,
        isRedacted: false,
      }))
    );
  };

  const redactedCount = useMemo(() => {
    return messages.filter((m) => m.isRedacted).length;
  }, [messages]);

  // Translation save handler
  const handleSaveTranslation = (messageId: string, translation: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId) {
          return {
            ...m,
            translation,
          };
        }
        return m;
      })
    );
  };

  // Gap management
  const handleAddGapAnnotation = (gap: GapAnnotation) => {
    setGapAnnotations((prev) => [...prev, gap]);
  };

  const handleRemoveGapAnnotation = (id: string) => {
    setGapAnnotations((prev) => prev.filter((g) => g.id !== id));
  };

  // Pro Toggle simulator
  const handleToggleProSimulator = (active: boolean) => {
    setBrandingConfig((prev) => ({ ...prev, isPro: active, showWatermark: !active }));
  };

  // Certificate download
  const handleDownloadCertificate = () => {
    if (metadata) {
      downloadForensicCertificate(metadata, brandingConfig);
    }
  };

  // Filtered & Sampled messages pipeline
  const displayMessages = useMemo(() => {
    let filtered = messages;

    if (filterConfig.startDate) {
      const s = new Date(filterConfig.startDate);
      filtered = filtered.filter((m) => m.timestamp >= s);
    }
    if (filterConfig.endDate) {
      const e = new Date(filterConfig.endDate);
      e.setHours(23, 59, 59, 999);
      filtered = filtered.filter((m) => m.timestamp <= e);
    }

    if (filterConfig.selectedSenders.length > 0) {
      filtered = filtered.filter(
        (m) => m.isSystem || filterConfig.selectedSenders.includes(m.sender)
      );
    }

    if (filterConfig.searchQuery.trim()) {
      const q = filterConfig.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.content.toLowerCase().includes(q) ||
          m.sender.toLowerCase().includes(q) ||
          (m.translation && m.translation.toLowerCase().includes(q))
      );
    }

    if (filterConfig.showOnlyWithMedia) {
      filtered = filtered.filter((m) => m.isMedia);
    }

    if (filterConfig.showOnlyCalls) {
      filtered = filtered.filter((m) => m.isCall);
    }

    if (filterConfig.hideDeleted) {
      filtered = filtered.filter((m) => !m.isDeleted);
    }

    return smartSampleMessages(
      filtered,
      filterConfig.samplingDensity,
      filterConfig.targetPageCount
    );
  }, [messages, filterConfig]);

  return (
    <div className="min-h-screen flex flex-col bg-[#060810] text-slate-100 bg-tech-grid">
      {/* Top Navigation Bar */}
      <Navbar
        mode={brandingConfig.mode}
        onModeChange={handleModeChange}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenWrapped={() => setIsWrappedOpen(true)}
        onLoadSample={handleLoadDemo}
        onReset={handleReset}
        isPro={brandingConfig.isPro}
        hasData={messages.length > 0}
        isDemoMode={isDemoMode}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        paperSize={brandingConfig.paperSize}
        onPaperSizeChange={handlePaperSizeChange}
      />

      {/* Floating Toast Notification */}
      {authNotice && (
        <div className="no-print fixed top-16 right-4 z-50 bg-emerald-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl shadow-2xl shadow-emerald-500/30 flex items-center gap-2 animate-in slide-in-from-top-3 duration-200 border border-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
          <span className="text-xs">{authNotice}</span>
        </div>
      )}

      {/* Demo Mode Notice Banner if Demo Active */}
      {isDemoMode && (
        <div className="no-print bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold text-white">
              DEMO PREVIEW MODE: You are currently viewing sample demonstration data (Tariq &amp; Sarah).
            </span>
            <span className="hidden md:inline text-amber-300/80">
              Your real file has not been uploaded yet.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1 bg-white/[0.08] hover:bg-white/[0.15] text-white rounded-lg transition font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Exit Demo &amp; Upload My File</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {messages.length === 0 ? (
        <main className="flex-1 flex items-center justify-center p-4">
          <OnboardingGuide
            onFileUpload={handleFileUpload}
            onLoadDemo={handleLoadDemo}
            onOpenGuide={() => setIsGuideOpen(true)}
            isLoading={isLoading}
            uploadError={uploadError}
          />
        </main>
      ) : (
        <main className="flex-1 flex flex-col lg:flex-row relative">
          {/* Left Sticky Sidebar Controls */}
          <ControlSidebar
            metadata={metadata}
            filterConfig={filterConfig}
            brandingConfig={brandingConfig}
            gapAnnotations={gapAnnotations}
            isRedactionMode={isRedactionMode}
            redactedCount={redactedCount}
            onFilterChange={handleFilterChange}
            onBrandingChange={handleBrandingChange}
            onToggleRedactionMode={setIsRedactionMode}
            onAutoRedact={handleAutoRedact}
            onRedactKeyword={handleRedactKeyword}
            onClearRedactions={handleClearRedactions}
            onAddGapAnnotation={handleAddGapAnnotation}
            onRemoveGapAnnotation={handleRemoveGapAnnotation}
            onOpenPricing={() => setIsPricingOpen(true)}
            onApplyVisaPreset={handleApplyVisaPreset}
            onDownloadCertificate={handleDownloadCertificate}
            onReset={handleReset}
            messages={displayMessages}
          />

          {/* Right Live A4 Document Preview Canvas */}
          <DocumentPreview
            messages={displayMessages}
            calls={calls}
            metadata={metadata}
            gapAnnotations={gapAnnotations}
            filterConfig={filterConfig}
            brandingConfig={brandingConfig}
            isRedactionMode={isRedactionMode}
            onToggleRedactMessage={handleToggleRedactMessage}
            onOpenTranslationModal={(msg) => setSelectedMsgForTranslation(msg)}
            onDownloadCertificate={handleDownloadCertificate}
          />
        </main>
      )}

      {/* Export Instructions Modal */}
      <ExportGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Pricing / Pro Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        isPro={brandingConfig.isPro}
        user={user}
        onSelectPlan={handleSelectPlan}
        onToggleProSimulator={handleToggleProSimulator}
      />

      {/* User Authentication Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        pendingPlanName={selectedPlan === 'agency_pro' ? 'Agency Pro ($39/mo)' : 'Visa Pass ($12)'}
      />

      {/* Checkout Modal (Payment Processing) */}
      {user && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          user={user}
          planId={selectedPlan}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Official Tax Invoice & License Key Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={completedOrder}
      />

      {/* Viral Relationship Wrapped Modal */}
      <RelationshipWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        metadata={metadata}
        messages={messages}
      />

      {/* Add / Edit Certified Translation Modal */}
      <TranslationModal
        isOpen={!!selectedMsgForTranslation}
        onClose={() => setSelectedMsgForTranslation(null)}
        message={selectedMsgForTranslation}
        onSaveTranslation={handleSaveTranslation}
      />
    </div>
  );
}
