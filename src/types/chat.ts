export type MediaType = 'image' | 'video' | 'audio' | 'document' | 'other';

export interface ParsedMessage {
  id: string;
  lineIndex: number;
  rawTimestamp: string;
  timestamp: Date;
  sender: string;
  content: string;
  isMedia: boolean;
  mediaType?: MediaType;
  mediaFileName?: string;
  mediaBlobUrl?: string;
  isCall: boolean;
  callType?: 'voice' | 'video';
  callDuration?: string;
  isDeleted: boolean;
  isSystem: boolean;
  isRedacted?: boolean;
  originalContent?: string;
  translation?: string;
  voiceTranscript?: string;
  audioDuration?: string;
  batesNumber?: string;
}

export interface CallEntry {
  id: string;
  timestamp: Date;
  rawTimestamp: string;
  caller: string;
  receiver?: string;
  type: 'voice' | 'video';
  duration: string;
  status: 'answered' | 'missed' | 'declined';
}

export interface ParticipantStats {
  messageCount: number;
  wordCount: number;
  mediaCount: number;
  callCount: number;
  firstMessageDate?: Date;
  lastMessageDate?: Date;
}

export interface MonthlyStat {
  month: string;
  count: number;
}

export interface ChatMetadata {
  fileName: string;
  fileSizeBytes: number;
  sha256Hash: string;
  totalLines: number;
  parsedMessagesCount: number;
  startDate: Date | null;
  endDate: Date | null;
  participants: string[];
  participantStats: Record<string, ParticipantStats>;
  totalCalls: number;
  totalMedia: number;
  timeSpanMonths: number;
  monthlyStats?: MonthlyStat[];
}

export interface GapAnnotation {
  id: string;
  startDate: string;
  endDate: string;
  gapDays: number;
  explanation: string;
}

export type ExportMode =
  | 'visa'
  | 'legal'
  | 'custody'
  | 'tenant'
  | 'business'
  | 'keepsake';

export type SamplingDensity = 'all' | '3_per_week' | '5_per_month' | 'target_pages';
export type VisaPreset = 'uk_home_office' | 'us_uscis' | 'canada_ircc' | 'australia_dha' | 'custom';
export type DocumentTheme = 'whatsapp' | 'legal_table';
export type DocumentLayout = 'single' | 'two_column';
export type PaperSize = 'a4' | 'letter';

export interface FilterConfig {
  mode: ExportMode;
  startDate: string;
  endDate: string;
  selectedSenders: string[];
  searchQuery: string;
  samplingDensity: SamplingDensity;
  targetPageCount: number;
  showOnlyWithMedia: boolean;
  showOnlyCalls: boolean;
  hideDeleted: boolean;
}

export interface BrandingConfig {
  mode: ExportMode;
  theme: DocumentTheme;
  layout: DocumentLayout;
  paperSize: PaperSize;
  caseReference: string;
  applicantName: string;
  sponsorName: string;
  lawFirmName: string;
  exhibitLetter: string;
  batesPrefix: string;
  startingBatesNumber: number;
  showCoverPage: boolean;
  showCallSummaryTable: boolean;
  showPhotoGrid: boolean;
  showGapAnnotations: boolean;
  showSha256Header: boolean;
  showLineNumbers: boolean;
  showWatermark: boolean;
  isPro: boolean;
  visaPreset: VisaPreset;
  notesOrDeclaration?: string;
}
