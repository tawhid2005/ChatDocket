import { ParsedMessage, CallEntry, ChatMetadata, GapAnnotation } from '@/types/chat';

// Realistic SVG Data URIs for demo photo evidence
const SVG_PHOTOS = {
  arrival: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e3a8a"/><stop offset="100%" stop-color="%233b82f6"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g1)"/><rect x="40" y="40" width="520" height="320" rx="12" fill="%23ffffff" fill-opacity="0.1" stroke="%23ffffff" stroke-width="2"/><text x="300" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">AIRPORT ARRIVAL &amp; REUNION</text><text x="300" y="200" font-family="Arial,sans-serif" font-size="16" fill="%23e2e8f0" text-anchor="middle">London Heathrow Terminal 2 (Flight BA144)</text><circle cx="300" cy="270" r="35" fill="%2310b981"/><path d="M288 270 l8 8 l16 -16" stroke="%23ffffff" stroke-width="4" fill="none" stroke-linecap="round"/><text x="300" y="340" font-family="Arial,sans-serif" font-size="13" fill="%23cbd5e1" text-anchor="middle">Timestamp: 12-Oct-2023 18:45 GMT | Exhibit Ref: IMG-001</text></svg>`,

  engagement: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23701a75"/><stop offset="100%" stop-color="%23ec4899"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g2)"/><rect x="40" y="40" width="520" height="320" rx="12" fill="%23ffffff" fill-opacity="0.1" stroke="%23ffffff" stroke-width="2"/><text x="300" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">ENGAGEMENT DINNER CELEBRATION</text><text x="300" y="200" font-family="Arial,sans-serif" font-size="16" fill="%23fce7f3" text-anchor="middle">The Shard, London - Ring Exchange &amp; Family Dinner</text><circle cx="300" cy="265" r="32" fill="%23f59e0b"/><polygon points="300,245 306,260 322,260 309,270 314,285 300,275 286,285 291,270 278,260 294,260" fill="%23ffffff"/><text x="300" y="338" font-family="Arial,sans-serif" font-size="13" fill="%23fdf2f8" text-anchor="middle">Timestamp: 28-Nov-2023 20:30 GMT | Exhibit Ref: IMG-002</text></svg>`,

  tenancy: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23064e3b"/><stop offset="100%" stop-color="%23059669"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g3)"/><rect x="40" y="40" width="520" height="320" rx="12" fill="%23ffffff" fill-opacity="0.1" stroke="%23ffffff" stroke-width="2"/><text x="300" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">JOINT RESIDENCE TENANCY AGREEMENT</text><text x="300" y="200" font-family="Arial,sans-serif" font-size="16" fill="%23d1fae5" text-anchor="middle">Signed Lease for 42 Kensington Gardens, London W8</text><rect x="270" y="240" width="60" height="50" rx="4" fill="%23ffffff"/><line x1="280" y1="255" x2="320" y2="255" stroke="%23065f46" stroke-width="3"/><line x1="280" y1="265" x2="315" y2="265" stroke="%23065f46" stroke-width="3"/><line x1="280" y1="275" x2="305" y2="275" stroke="%23065f46" stroke-width="3"/><text x="300" y="338" font-family="Arial,sans-serif" font-size="13" fill="%23ecfdf5" text-anchor="middle">Timestamp: 15-Jan-2024 14:15 GMT | Exhibit Ref: IMG-003</text></svg>`,

  family: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%237c2d12"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g4)"/><rect x="40" y="40" width="520" height="320" rx="12" fill="%23ffffff" fill-opacity="0.1" stroke="%23ffffff" stroke-width="2"/><text x="300" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">FAMILY GATHERING &amp; CELEBRATION</text><text x="300" y="200" font-family="Arial,sans-serif" font-size="16" fill="%23ffedd5" text-anchor="middle">Joint Family Holiday Dinner with Parents and Siblings</text><circle cx="260" cy="265" r="24" fill="%23fed7aa"/><circle cx="340" cy="265" r="24" fill="%23fed7aa"/><circle cx="300" cy="255" r="28" fill="%23fdba74"/><text x="300" y="338" font-family="Arial,sans-serif" font-size="13" fill="%23fff7ed" text-anchor="middle">Timestamp: 18-Feb-2024 19:40 GMT | Exhibit Ref: IMG-004</text></svg>`,

  wedding: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23111827"/><stop offset="100%" stop-color="%23374151"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g5)"/><rect x="40" y="40" width="520" height="320" rx="12" fill="%23ffffff" fill-opacity="0.1" stroke="%23f59e0b" stroke-width="2"/><text x="300" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="%23fbbf24" text-anchor="middle">MARRIAGE CEREMONY &amp; VOWS</text><text x="300" y="200" font-family="Arial,sans-serif" font-size="16" fill="%23f3f4f6" text-anchor="middle">Official Civil Partnership &amp; Marriage Registration</text><circle cx="285" cy="265" r="22" fill="none" stroke="%23fbbf24" stroke-width="6"/><circle cx="315" cy="265" r="22" fill="none" stroke="%23fbbf24" stroke-width="6"/><text x="300" y="338" font-family="Arial,sans-serif" font-size="13" fill="%23e5e7eb" text-anchor="middle">Timestamp: 20-Mar-2024 11:30 GMT | Exhibit Ref: IMG-005</text></svg>`,
};

export const SAMPLE_PARTICIPANTS = {
  applicant: 'Tariq Rahman',
  sponsor: 'Dr. Sarah Jenkins',
};

export function getSampleChatData(): {
  messages: ParsedMessage[];
  calls: CallEntry[];
  metadata: ChatMetadata;
  gaps: GapAnnotation[];
} {
  const p1 = SAMPLE_PARTICIPANTS.applicant;
  const p2 = SAMPLE_PARTICIPANTS.sponsor;

  const rawSampleMessages: Array<{
    dateStr: string;
    sender: string;
    content: string;
    isMedia?: boolean;
    mediaType?: 'image' | 'video' | 'audio' | 'document';
    mediaFileName?: string;
    mediaBlobUrl?: string;
    isCall?: boolean;
    callType?: 'voice' | 'video';
    callDuration?: string;
    callStatus?: 'answered' | 'missed' | 'declined';
    isDeleted?: boolean;
    translation?: string;
  }> = [
    // Month 1: October 2023 - Arrival & Reconnection
    {
      dateStr: '2023-10-01T08:30:00',
      sender: p1,
      content: 'Good morning Sarah! I just checked my packing list for London. Can’t believe flight is in 10 days.',
    },
    {
      dateStr: '2023-10-01T08:32:00',
      sender: p2,
      content: 'Morning sweetheart! So excited. I have already cleaned up the guest room and stocked your favorite Earl Grey tea.',
    },
    {
      dateStr: '2023-10-04T19:15:00',
      sender: p1,
      content: 'Tumi kemon acho shona? Flight er ticket confirm hoye geche! British Airways BA144, arriving LHR 18:30.',
      translation: 'How are you darling? The flight ticket has been confirmed! British Airways BA144, arriving LHR 18:30.',
    },
    {
      dateStr: '2023-10-04T19:18:00',
      sender: p2,
      content: 'Aww perfect! I will drive over to Terminal 2 right after hospital clinic rounds.',
    },
    {
      dateStr: '2023-10-06T21:00:00',
      sender: p2,
      content: 'Video call, 42 mins',
      isCall: true,
      callType: 'video',
      callDuration: '42 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2023-10-12T18:45:00',
      sender: p1,
      content: 'arrival_heathrow.jpg (file attached)\nJust landed and cleared UK Border Control! Waiting by the Costa Coffee in Arrivals.',
      isMedia: true,
      mediaType: 'image',
      mediaFileName: 'arrival_heathrow.jpg',
      mediaBlobUrl: SVG_PHOTOS.arrival,
    },
    {
      dateStr: '2023-10-12T18:48:00',
      sender: p2,
      content: 'I see you waving! Walking up right now ❤️',
    },
    {
      dateStr: '2023-10-18T14:20:00',
      sender: p2,
      content: 'Tariq, remember to bring the umbrella today when you walk over from Hyde Park.',
    },
    {
      dateStr: '2023-10-18T14:25:00',
      sender: p1,
      content: 'Haha already took it. London weather never changes! Meeting you at South Kensington station at 5pm.',
    },
    {
      dateStr: '2023-10-25T20:10:00',
      sender: p1,
      content: 'Voice call, 35 mins',
      isCall: true,
      callType: 'voice',
      callDuration: '35 mins',
      callStatus: 'answered',
    },

    // Month 2: November 2023 - Deepening Relationship & Engagement
    {
      dateStr: '2023-11-02T09:40:00',
      sender: p1,
      content: 'Shob kichu khub shundor lagche. Mom called from Dhaka this morning and sent her blessings.',
      translation: 'Everything feels so wonderful. Mom called from Dhaka this morning and sent her blessings.',
    },
    {
      dateStr: '2023-11-02T09:45:00',
      sender: p2,
      content: 'Please send her my warmest salam and love. Can’t wait for her to visit us in the summer.',
    },
    {
      dateStr: '2023-11-10T12:00:00',
      sender: p1,
      content: 'This message was deleted',
      isDeleted: true,
    },
    {
      dateStr: '2023-11-10T12:02:00',
      sender: p1,
      content: 'Oops typed in wrong window! Meant to send you the restaurant menu for Saturday.',
    },
    {
      dateStr: '2023-11-15T22:30:00',
      sender: p2,
      content: 'Video call, 1 hr 12 mins',
      isCall: true,
      callType: 'video',
      callDuration: '1 hr 12 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2023-11-28T20:30:00',
      sender: p2,
      content: 'engagement_dinner.jpg (file attached)\nThe most unforgettable evening of my life. YES a thousand times over! 💍✨',
      isMedia: true,
      mediaType: 'image',
      mediaFileName: 'engagement_dinner.jpg',
      mediaBlobUrl: SVG_PHOTOS.engagement,
    },
    {
      dateStr: '2023-11-28T20:35:00',
      sender: p1,
      content: 'Amar shobcheye shukh er din. You make me the happiest person in the world.',
      translation: 'The happiest day of my life. You make me the happiest person in the world.',
    },
    {
      dateStr: '2023-12-04T11:00:00',
      sender: p1,
      content: 'Taking the train out to the NGO rural relief mission headquarters now. Signal might be very weak or unavailable for next 2-3 weeks.',
    },
    {
      dateStr: '2023-12-04T11:05:00',
      sender: p2,
      content: 'Stay safe my love! Do great work. I know communication will be spotty, keep me in your prayers and message whenever you reach an outpost.',
    },

    // 20-Day Inactivity Gap here (Dec 4 to Dec 24)

    // Month 3: December 2023 - Return from mission & Holiday plans
    {
      dateStr: '2023-12-24T16:15:00',
      sender: p1,
      content: 'Back in cellular range finally! Missing you so much Sarah. How have you been?',
    },
    {
      dateStr: '2023-12-24T16:17:00',
      sender: p2,
      content: 'Tariq! Thank goodness! I was counting down the days. Calling you right now!',
    },
    {
      dateStr: '2023-12-24T16:20:00',
      sender: p2,
      content: 'Video call, 1 hr 45 mins',
      isCall: true,
      callType: 'video',
      callDuration: '1 hr 45 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2023-12-31T23:55:00',
      sender: p1,
      content: 'Happy New Year 2024 shona! 2024 is going to be our wedding year and spouse visa year.',
      translation: 'Happy New Year 2024 darling! 2024 is going to be our wedding year and spouse visa year.',
    },
    {
      dateStr: '2024-01-01T00:02:00',
      sender: p2,
      content: 'Happy New Year my future husband! Ready for everything ahead together.',
    },

    // Month 4: January 2024 - Tenancy & Visa Document Gathering
    {
      dateStr: '2024-01-08T10:15:00',
      sender: p2,
      content: 'The landlord approved our joint tenancy application for the 2-bed apartment in Kensington!',
    },
    {
      dateStr: '2024-01-08T10:18:00',
      sender: p1,
      content: 'Khub bhalo khobor! Both our names will be on the official council tax and utility bills.',
      translation: 'Such great news! Both our names will be on the official council tax and utility bills.',
    },
    {
      dateStr: '2024-01-15T14:15:00',
      sender: p1,
      content: 'tenancy_agreement.jpg (file attached)\nExecuted joint tenancy lease signed by both of us and landlord witness.',
      isMedia: true,
      mediaType: 'image',
      mediaFileName: 'tenancy_agreement.jpg',
      mediaBlobUrl: SVG_PHOTOS.tenancy,
    },
    {
      dateStr: '2024-01-19T18:00:00',
      sender: p1,
      content: 'Missed video call',
      isCall: true,
      callType: 'video',
      callDuration: '0 mins',
      callStatus: 'missed',
    },
    {
      dateStr: '2024-01-19T18:25:00',
      sender: p2,
      content: 'Sorry was with an ICU emergency patient! Free now, calling back.',
    },
    {
      dateStr: '2024-01-19T18:26:00',
      sender: p2,
      content: 'Voice call, 55 mins',
      isCall: true,
      callType: 'voice',
      callDuration: '55 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2024-01-26T21:10:00',
      sender: p1,
      content: 'Solicitor advised us to keep all WhatsApp chat logs, flight boarding passes, and call records neatly archived for Appendix FM.',
    },
    {
      dateStr: '2024-01-26T21:14:00',
      sender: p2,
      content: 'Yes! That’s why we are organizing this digital docket so the Home Office caseworker has zero doubts about our genuine relationship.',
    },

    // Month 5: February 2024 - Family Meet & Celebrations
    {
      dateStr: '2024-02-05T08:50:00',
      sender: p2,
      content: 'My parents are driving down from Edinburgh this weekend. Dad already bought fresh Scottish salmon for our dinner!',
    },
    {
      dateStr: '2024-02-05T08:55:00',
      sender: p1,
      content: 'I will prepare sweet Bengali desserts (Mishti doi) so they can taste both traditions!',
    },
    {
      dateStr: '2024-02-18T19:40:00',
      sender: p2,
      content: 'family_gathering.jpg (file attached)\nLook how happy everyone was around the dinner table! Mom absolutely adored the mishti doi.',
      isMedia: true,
      mediaType: 'image',
      mediaFileName: 'family_gathering.jpg',
      mediaBlobUrl: SVG_PHOTOS.family,
    },
    {
      dateStr: '2024-02-23T20:15:00',
      sender: p1,
      content: 'Voice call, 1 hr 05 mins',
      isCall: true,
      callType: 'voice',
      callDuration: '1 hr 05 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2024-02-28T16:00:00',
      sender: p1,
      content: 'Bank statement for the 6-month financial requirement (Cat A £29,000 threshold) downloaded and stamped.',
    },
    {
      dateStr: '2024-02-28T16:05:00',
      sender: p2,
      content: 'My NHS employer letter and 6 months of payslips are also ready from HR payroll.',
    },

    // Month 6: March & April 2024 - Wedding & Final Visa Submission
    {
      dateStr: '2024-03-12T11:20:00',
      sender: p2,
      content: 'Notice of Marriage given at the Register Office! 28-day notice period completed smoothly.',
    },
    {
      dateStr: '2024-03-20T11:30:00',
      sender: p1,
      content: 'wedding_ceremony.jpg (file attached)\nOfficially Mr. & Mrs.! The happiest day of our lives together.',
      isMedia: true,
      mediaType: 'image',
      mediaFileName: 'wedding_ceremony.jpg',
      mediaBlobUrl: SVG_PHOTOS.wedding,
    },
    {
      dateStr: '2024-03-20T11:35:00',
      sender: p2,
      content: 'Forever grateful for our journey. You are my home, Tariq ❤️',
    },
    {
      dateStr: '2024-03-28T21:40:00',
      sender: p2,
      content: 'Video call, 2 hrs 14 mins',
      isCall: true,
      callType: 'video',
      callDuration: '2 hrs 14 mins',
      callStatus: 'answered',
    },
    {
      dateStr: '2024-04-05T15:00:00',
      sender: p1,
      content: 'TB test certificate received, English CEFR B1 certificate received, and all exhibits numbered sequentially.',
    },
    {
      dateStr: '2024-04-10T17:30:00',
      sender: p2,
      content: 'Everything is assembled. Ready to export our Chat Docket PDF and submit with our solicitor!',
    },
    {
      dateStr: '2024-04-10T17:35:00',
      sender: p1,
      content: 'InshaAllah everything will be approved quickly. See you tonight at home! ❤️',
    },
  ];

  const messages: ParsedMessage[] = [];
  const calls: CallEntry[] = [];
  const stats: Record<string, { messageCount: number; wordCount: number; mediaCount: number; callCount: number }> = {
    [p1]: { messageCount: 0, wordCount: 0, mediaCount: 0, callCount: 0 },
    [p2]: { messageCount: 0, wordCount: 0, mediaCount: 0, callCount: 0 },
  };

  rawSampleMessages.forEach((raw, idx) => {
    const timestamp = new Date(raw.dateStr);
    const dateFormatted = timestamp.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeFormatted = timestamp.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const rawTimestamp = `${dateFormatted}, ${timeFormatted}`;

    const msg: ParsedMessage = {
      id: `sample-msg-${idx + 1}`,
      lineIndex: idx + 1,
      rawTimestamp,
      timestamp,
      sender: raw.sender,
      content: raw.content,
      isMedia: !!raw.isMedia,
      mediaType: raw.mediaType,
      mediaFileName: raw.mediaFileName,
      mediaBlobUrl: raw.mediaBlobUrl,
      isCall: !!raw.isCall,
      callType: raw.callType,
      callDuration: raw.callDuration,
      isDeleted: !!raw.isDeleted,
      isSystem: false,
      translation: raw.translation,
    };

    messages.push(msg);

    // Call entry
    if (raw.isCall) {
      calls.push({
        id: `sample-call-${idx + 1}`,
        timestamp,
        rawTimestamp,
        caller: raw.sender,
        receiver: raw.sender === p1 ? p2 : p1,
        type: raw.callType || 'voice',
        duration: raw.callDuration || 'Completed',
        status: raw.callStatus || 'answered',
      });
    }

    // Stats
    if (stats[raw.sender]) {
      stats[raw.sender].messageCount++;
      if (raw.isMedia) stats[raw.sender].mediaCount++;
      if (raw.isCall) stats[raw.sender].callCount++;
      stats[raw.sender].wordCount += raw.content.split(/\s+/).filter(Boolean).length;
    }
  });

  const startDate = messages[0].timestamp;
  const endDate = messages[messages.length - 1].timestamp;

  const metadata: ChatMetadata = {
    fileName: 'WhatsApp_Chat_Tariq_Sarah_2023_2024.zip',
    fileSizeBytes: 4829104, // ~4.8 MB
    sha256Hash: '9e41b2fa384c568910d54fa028bc71901a8849b2ef189d27301cfa8506da3f71',
    totalLines: 248,
    parsedMessagesCount: messages.length,
    startDate,
    endDate,
    participants: [p1, p2],
    participantStats: stats,
    totalCalls: calls.length,
    totalMedia: messages.filter((m) => m.isMedia).length,
    timeSpanMonths: 7,
  };

  const gaps: GapAnnotation[] = [
    {
      id: 'sample-gap-1',
      startDate: '04 Dec 2023',
      endDate: '24 Dec 2023',
      gapDays: 20,
      explanation:
        'Tariq was deployed on emergency field relief in remote sub-district with restricted cellular/internet connectivity. Regular in-person communication resumed immediately on 24 Dec 2023 upon arrival back in Dhaka.',
    },
  ];

  return { messages, calls, metadata, gaps };
}

