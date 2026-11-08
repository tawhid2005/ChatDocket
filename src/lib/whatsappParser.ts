import JSZip from 'jszip';
import { ParsedMessage, CallEntry, ChatMetadata, MediaType, ParticipantStats } from '@/types/chat';

// Universal Line Regex for messages with sender:
// Matches iOS: [25/08/23, 14:32:05] John Doe: Hello
// Matches Android: 25/08/2023, 14:32 - John Doe: Hello
// Matches 12-hour: 8/25/23, 2:32:05 PM - John Doe: Hello
// Matches variations with dashes, slashes, periods, spaces
const MESSAGE_REGEX = /^\[?(\d{1,4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]?(?:\s*-\s*|\s*:?\s*)([^:]+?):\s*([\s\S]*)$/;

// System message regex (no sender colon):
// e.g.: 25/08/2023, 14:30 - Messages and calls are end-to-end encrypted.
const SYSTEM_REGEX = /^\[?(\d{1,4}[\/\.\-]\d{1,2}[\/\.\-]\d{1,4})[,\s]+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[APap][Mm])?)\]?(?:\s*-\s*|\s+)([\s\S]*)$/;

export interface ParseResult {
  messages: ParsedMessage[];
  calls: CallEntry[];
  metadata: ChatMetadata;
  mediaFiles: Map<string, string>; // filename -> blobUrl
}

// Clean invisible control characters and normalize spaces
export function cleanWhatsAppText(text: string): string {
  return text
    .replace(/[\u200e\u200f\u202a-\u202e\uFEFF\u200b]/g, '')
    .replace(/[\u202f\u00a0]/g, ' ')
    .trim();
}

// Parse dates flexibly: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, YY/MM/DD
export function parseWhatsAppTimestamp(dateStr: string, timeStr: string, isMonthFirst = false): Date {
  try {
    const cleanDate = dateStr.replace(/[^\d\/\.\-]/g, '');
    const cleanTime = timeStr.trim();

    const parts = cleanDate.split(/[\/\.\-]/).map((p) => parseInt(p, 10));
    let day = 1;
    let month = 0; // 0-indexed in JS Date
    let year = new Date().getFullYear();

    if (parts.length === 3) {
      if (parts[0] > 1000) {
        // YYYY-MM-DD
        year = parts[0];
        month = parts[1] - 1;
        day = parts[2];
      } else if (parts[2] > 1000 || parts[2] < 100) {
        // DD/MM/YY(YY) or MM/DD/YY(YY)
        year = parts[2] < 100 ? 2000 + parts[2] : parts[2];
        if (isMonthFirst || (parts[0] <= 12 && parts[1] > 12)) {
          month = parts[0] - 1;
          day = parts[1];
        } else {
          day = parts[0];
          month = parts[1] - 1;
        }
      }
    }

    // Time parsing: HH:MM or HH:MM:SS with optional AM/PM
    const isPM = /pm/i.test(cleanTime);
    const isAM = /am/i.test(cleanTime);
    const timeDigits = cleanTime.replace(/[^\d:]/g, '').split(':').map((t) => parseInt(t, 10));

    let hours = timeDigits[0] || 0;
    const minutes = timeDigits[1] || 0;
    const seconds = timeDigits[2] || 0;

    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    const parsed = new Date(year, month, day, hours, minutes, seconds);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  } catch {
    return new Date();
  }
}

// Compute SHA-256 for cryptographic evidence integrity
export async function calculateSHA256(data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Detect media type from filename or WhatsApp text pattern
export function detectMediaType(text: string): { isMedia: boolean; type?: MediaType; filename?: string } {
  const clean = text.trim();

  // Pattern 1: iOS format <attached: filename.ext>
  const iosMatch = clean.match(/<attached:\s*([^>]+)>/i);
  if (iosMatch) {
    const filename = iosMatch[1].trim();
    return { isMedia: true, type: getMediaTypeFromExtension(filename), filename };
  }

  // Pattern 2: Android format filename.ext (file attached)
  const androidMatch = clean.match(/([a-zA-Z0-9_\-.]+\.(?:jpg|jpeg|png|webp|mp4|opus|m4a|mp3|pdf|doc|docx|mov))\s*\((?:file\s+attached|archivo\s+adjunto)\)/i);
  if (androidMatch) {
    const filename = androidMatch[1].trim();
    return { isMedia: true, type: getMediaTypeFromExtension(filename), filename };
  }

  // Pattern 3: Omitted media placeholders
  if (/image omitted|foto omitida|photo omitted/i.test(clean)) {
    return { isMedia: true, type: 'image' };
  }
  if (/video omitted|video omitido/i.test(clean)) {
    return { isMedia: true, type: 'video' };
  }
  if (/audio omitted|audio omitido/i.test(clean)) {
    return { isMedia: true, type: 'audio' };
  }
  if (/document omitted|documento omitido|sticker omitted/i.test(clean)) {
    return { isMedia: true, type: 'document' };
  }

  return { isMedia: false };
}

function getMediaTypeFromExtension(filename: string): MediaType {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
    case 'heic':
    case 'gif':
      return 'image';
    case 'mp4':
    case 'mov':
    case 'm4v':
    case 'avi':
      return 'video';
    case 'opus':
    case 'm4a':
    case 'mp3':
    case 'ogg':
    case 'wav':
      return 'audio';
    case 'pdf':
    case 'doc':
    case 'docx':
      return 'document';
    default:
      return 'other';
  }
}

// Detect WhatsApp call logs
export function detectCallEntry(
  text: string,
  sender: string,
  timestamp: Date,
  rawTimestamp: string,
  id: string
): { isCall: boolean; callEntry?: CallEntry; callType?: 'voice' | 'video'; callDuration?: string } {
  const clean = text.toLowerCase();

  const isCall = /call|llamada|videollamada/i.test(clean);
  if (!isCall) return { isCall: false };

  const isVideo = /video\s*call|videollamada/i.test(clean);
  const callType: 'voice' | 'video' = isVideo ? 'video' : 'voice';

  let status: 'answered' | 'missed' | 'declined' = 'answered';
  if (/missed|perdida/i.test(clean)) {
    status = 'missed';
  } else if (/declined|rechazada|cancelled|cancelada/i.test(clean)) {
    status = 'declined';
  }

  // Extract duration if present
  let duration = '0 mins';
  const durationMatch = text.match(/(?:,\s*|\(\s*)((\d+\s*(?:hr|hour|hrs|hours|min|mins|minutes|sec|secs|seconds|m|s)[\s,]*)+)/i);
  if (durationMatch) {
    duration = durationMatch[1].trim();
  } else if (status === 'missed' || status === 'declined') {
    duration = '0 mins (No Answer)';
  } else {
    duration = 'Completed';
  }

  const callEntry: CallEntry = {
    id: `call-${id}`,
    timestamp,
    rawTimestamp,
    caller: sender,
    type: callType,
    duration,
    status,
  };

  return { isCall: true, callEntry, callType, callDuration: duration };
}

// Check if message is a deleted message placeholder
export function isDeletedMessage(text: string): boolean {
  return /this message was deleted|you deleted this message|este mensaje fue eliminado|eliminaste este mensaje/i.test(
    text
  );
}

// Check if message is a WhatsApp system alert
export function isSystemNotification(text: string): boolean {
  return (
    /messages and calls are end-to-end encrypted/i.test(text) ||
    /security code changed/i.test(text) ||
    /created group/i.test(text) ||
    /changed the subject/i.test(text) ||
    /added you/i.test(text) ||
    /left the group/i.test(text) ||
    /joined using this group's invite link/i.test(text) ||
    /disappearing messages/i.test(text)
  );
}

// Primary Parser for raw WhatsApp Text
export function parseWhatsAppRawText(
  rawContent: string,
  mediaMap: Map<string, string> = new Map()
): { messages: ParsedMessage[]; calls: CallEntry[]; metadata: ChatMetadata } {
  const lines = rawContent.split(/\r?\n/);
  const messages: ParsedMessage[] = [];
  const calls: CallEntry[] = [];
  const participantStats: Record<string, ParticipantStats> = {};
  const participantsSet = new Set<string>();

  // Determine dominant date format (DD/MM vs MM/DD)
  let monthFirstVotes = 0;
  let dayFirstVotes = 0;
  for (let i = 0; i < Math.min(lines.length, 300); i++) {
    const cleaned = cleanWhatsAppText(lines[i]);
    const match = cleaned.match(MESSAGE_REGEX);
    if (match) {
      const parts = match[1].split(/[\/\.\-]/).map((p) => parseInt(p, 10));
      if (parts.length >= 2) {
        if (parts[0] > 12 && parts[1] <= 12) dayFirstVotes++;
        else if (parts[1] > 12 && parts[0] <= 12) monthFirstVotes++;
      }
    }
  }
  const isMonthFirst = monthFirstVotes > dayFirstVotes;

  let currentMsg: ParsedMessage | null = null;
  let lineCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    lineCounter++;

    if (!rawLine.trim()) continue;

    // Clean invisible unicode per line before regex
    const cleanLine = cleanWhatsAppText(rawLine);

    // 1. Try standard message match
    const msgMatch = cleanLine.match(MESSAGE_REGEX);
    if (msgMatch) {
      if (currentMsg) {
        finalizeMessage(currentMsg, calls, participantStats, participantsSet);
        messages.push(currentMsg);
      }

      const rawDate = msgMatch[1];
      const rawTime = msgMatch[2];
      const sender = cleanWhatsAppText(msgMatch[3]);
      const body = msgMatch[4] ? msgMatch[4].trim() : '';
      const timestamp = parseWhatsAppTimestamp(rawDate, rawTime, isMonthFirst);

      const mediaInfo = detectMediaType(body);
      const callInfo = detectCallEntry(body, sender, timestamp, `${rawDate}, ${rawTime}`, `msg-${lineCounter}`);
      const deleted = isDeletedMessage(body);
      const system = isSystemNotification(body);

      // Match media blob URL if filename found
      let mediaBlobUrl: string | undefined = undefined;
      if (mediaInfo.filename) {
        if (mediaMap.has(mediaInfo.filename)) {
          mediaBlobUrl = mediaMap.get(mediaInfo.filename);
        } else {
          for (const [k, url] of mediaMap.entries()) {
            if (k.toLowerCase() === mediaInfo.filename.toLowerCase() || k.endsWith(mediaInfo.filename)) {
              mediaBlobUrl = url;
              break;
            }
          }
        }
      }

      currentMsg = {
        id: `msg-${lineCounter}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        lineIndex: lineCounter,
        rawTimestamp: `${rawDate}, ${rawTime}`,
        timestamp,
        sender,
        content: body,
        isMedia: mediaInfo.isMedia,
        mediaType: mediaInfo.type,
        mediaFileName: mediaInfo.filename,
        mediaBlobUrl,
        isCall: callInfo.isCall,
        callType: callInfo.callType,
        callDuration: callInfo.callDuration,
        isDeleted: deleted,
        isSystem: system,
      };

      if (callInfo.callEntry) {
        calls.push(callInfo.callEntry);
      }

      continue;
    }

    // 2. Try system notification match
    const sysMatch = cleanLine.match(SYSTEM_REGEX);
    if (sysMatch && isSystemNotification(sysMatch[3])) {
      if (currentMsg) {
        finalizeMessage(currentMsg, calls, participantStats, participantsSet);
        messages.push(currentMsg);
      }

      const rawDate = sysMatch[1];
      const rawTime = sysMatch[2];
      const body = sysMatch[3].trim();
      const timestamp = parseWhatsAppTimestamp(rawDate, rawTime, isMonthFirst);

      currentMsg = {
        id: `sys-${lineCounter}-${Math.random().toString(36).substring(2, 7)}`,
        lineIndex: lineCounter,
        rawTimestamp: `${rawDate}, ${rawTime}`,
        timestamp,
        sender: 'System',
        content: body,
        isMedia: false,
        isCall: false,
        isDeleted: false,
        isSystem: true,
      };
      continue;
    }

    // 3. Multi-line message continuation
    if (currentMsg) {
      currentMsg.content += `\n${rawLine}`;
    }
  }

  // Push final pending message
  if (currentMsg) {
    finalizeMessage(currentMsg, calls, participantStats, participantsSet);
    messages.push(currentMsg);
  }

  // Metadata calculations
  const participants = Array.from(participantsSet).filter((p) => p !== 'System');
  const validMessages = messages.filter((m) => !m.isSystem);

  const startDate = validMessages.length > 0 ? validMessages[0].timestamp : null;
  const endDate = validMessages.length > 0 ? validMessages[validMessages.length - 1].timestamp : null;

  let timeSpanMonths = 0;
  if (startDate && endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    timeSpanMonths = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.4375)));
  }

  const metadata: ChatMetadata = {
    fileName: 'WhatsApp_Chat_Export.txt',
    fileSizeBytes: rawContent.length,
    sha256Hash: '',
    totalLines: lineCounter,
    parsedMessagesCount: messages.length,
    startDate,
    endDate,
    participants,
    participantStats,
    totalCalls: calls.length,
    totalMedia: messages.filter((m) => m.isMedia).length,
    timeSpanMonths,
  };

  return { messages, calls, metadata };
}

function finalizeMessage(
  msg: ParsedMessage,
  _calls: CallEntry[],
  stats: Record<string, ParticipantStats>,
  participantsSet: Set<string>
) {
  if (msg.isSystem) return;

  participantsSet.add(msg.sender);
  if (!stats[msg.sender]) {
    stats[msg.sender] = {
      messageCount: 0,
      wordCount: 0,
      mediaCount: 0,
      callCount: 0,
      firstMessageDate: msg.timestamp,
      lastMessageDate: msg.timestamp,
    };
  }

  const p = stats[msg.sender];
  p.messageCount++;
  p.lastMessageDate = msg.timestamp;

  if (msg.isMedia) {
    p.mediaCount++;
  }

  if (msg.isCall) {
    p.callCount++;
  }

  if (msg.content) {
    const words = msg.content.trim().split(/\s+/).filter(Boolean).length;
    p.wordCount += words;
  }
}

// Extract Zip file containing _chat.txt and media files (100% in browser memory)
export async function extractWhatsAppZip(zipFile: File): Promise<ParseResult> {
  const arrayBuffer = await zipFile.arrayBuffer();
  const sha256Hash = await calculateSHA256(arrayBuffer);

  const zip = await JSZip.loadAsync(arrayBuffer);
  const mediaMap = new Map<string, string>();

  let chatTxtContent = '';
  let chatFileName = 'WhatsApp_Chat.txt';

  const fileNames = Object.keys(zip.files);

  // 1. Locate the chat text file: _chat.txt or any .txt
  const txtCandidates = fileNames.filter(
    (name) =>
      name.toLowerCase().endsWith('.txt') &&
      !name.startsWith('__MACOSX') &&
      !name.includes('/._') &&
      !name.startsWith('._')
  );

  let targetTxt = txtCandidates.find((name) => name.toLowerCase().includes('_chat.txt'));
  if (!targetTxt) {
    targetTxt = txtCandidates.find((name) => name.toLowerCase().includes('chat'));
  }
  if (!targetTxt && txtCandidates.length > 0) {
    targetTxt = txtCandidates[0];
  }

  if (targetTxt) {
    chatFileName = targetTxt.split('/').pop() || targetTxt;
    const uint8 = await zip.files[targetTxt].async('uint8array');
    chatTxtContent = new TextDecoder('utf-8', { fatal: false, ignoreBOM: true }).decode(uint8);
  }

  // 2. Extract media attachments into memory Blob URLs
  const mediaExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.opus', '.m4a', '.mp3', '.pdf'];
  for (const name of fileNames) {
    if (name.startsWith('__MACOSX') || name.startsWith('._') || zip.files[name].dir) continue;

    const lower = name.toLowerCase();
    const isMedia = mediaExtensions.some((ext) => lower.endsWith(ext));
    if (isMedia) {
      const blob = await zip.files[name].async('blob');
      const blobUrl = URL.createObjectURL(blob);
      const baseName = name.split('/').pop() || name;
      mediaMap.set(baseName, blobUrl);
      mediaMap.set(name, blobUrl);
    }
  }

  if (!chatTxtContent && txtCandidates.length === 0) {
    throw new Error(
      'Could not find a WhatsApp chat text file (.txt or _chat.txt) inside this ZIP. Please verify you selected "Export Chat" in WhatsApp.'
    );
  }

  // 3. Parse the chat contents
  const parsed = parseWhatsAppRawText(chatTxtContent, mediaMap);
  parsed.metadata.fileName = zipFile.name || chatFileName;
  parsed.metadata.fileSizeBytes = zipFile.size;
  parsed.metadata.sha256Hash = sha256Hash;

  return {
    messages: parsed.messages,
    calls: parsed.calls,
    metadata: parsed.metadata,
    mediaFiles: mediaMap,
  };
}

// Handle single .txt file upload directly
export async function parseSingleWhatsAppTxt(txtFile: File): Promise<ParseResult> {
  const arrayBuffer = await txtFile.arrayBuffer();
  const sha256Hash = await calculateSHA256(arrayBuffer);
  const text = new TextDecoder('utf-8', { fatal: false, ignoreBOM: true }).decode(arrayBuffer);

  const parsed = parseWhatsAppRawText(text);
  parsed.metadata.fileName = txtFile.name;
  parsed.metadata.fileSizeBytes = txtFile.size;
  parsed.metadata.sha256Hash = sha256Hash;

  return {
    messages: parsed.messages,
    calls: parsed.calls,
    metadata: parsed.metadata,
    mediaFiles: new Map(),
  };
}

// Multi-Archive Merger: Combines multiple WhatsApp exports chronologically and deduplicates
export function mergeWhatsAppArchives(archives: ParseResult[]): ParseResult {
  if (archives.length === 0) {
    throw new Error('No archives provided for merging.');
  }
  if (archives.length === 1) {
    return archives[0];
  }

  // 1. Combine all media maps
  const combinedMedia = new Map<string, string>();
  for (const archive of archives) {
    archive.mediaFiles.forEach((val, key) => {
      combinedMedia.set(key, val);
    });
  }

  // 2. Combine and deduplicate messages
  const seenMessageKeys = new Set<string>();
  const allMessages: ParsedMessage[] = [];

  for (const archive of archives) {
    for (const msg of archive.messages) {
      // Key: timestamp ISO + sender + first 60 chars of text
      const key = `${msg.timestamp.toISOString()}|${msg.sender}|${msg.content.slice(0, 60)}`;
      if (!seenMessageKeys.has(key)) {
        seenMessageKeys.add(key);
        let mediaBlobUrl = msg.mediaBlobUrl;
        if (!mediaBlobUrl && msg.mediaFileName && combinedMedia.has(msg.mediaFileName)) {
          mediaBlobUrl = combinedMedia.get(msg.mediaFileName);
        }
        allMessages.push({ ...msg, mediaBlobUrl });
      }
    }
  }

  // Sort chronologically
  allMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  allMessages.forEach((msg, idx) => {
    msg.id = `msg-${idx + 1}`;
  });

  // 3. Combine and deduplicate calls
  const seenCallKeys = new Set<string>();
  const allCalls: CallEntry[] = [];
  for (const archive of archives) {
    for (const call of archive.calls) {
      const key = `${call.timestamp.toISOString()}|${call.caller}|${call.type}|${call.status}`;
      if (!seenCallKeys.has(key)) {
        seenCallKeys.add(key);
        allCalls.push(call);
      }
    }
  }
  allCalls.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  allCalls.forEach((call, idx) => {
    call.id = `call-${idx + 1}`;
  });

  // 4. Recalculate stats & metadata
  const participantMap = new Map<string, ParticipantStats>();
  const participantsSet = new Set<string>();
  let totalMediaCount = 0;

  for (const msg of allMessages) {
    if (msg.isSystem) continue;
    participantsSet.add(msg.sender);
    const existing = participantMap.get(msg.sender) || {
      messageCount: 0,
      wordCount: 0,
      mediaCount: 0,
      callCount: 0,
      firstMessageDate: msg.timestamp,
      lastMessageDate: msg.timestamp,
    };
    existing.messageCount += 1;
    existing.wordCount += msg.content.trim().split(/\s+/).filter(Boolean).length;
    if (msg.isMedia) {
      existing.mediaCount += 1;
      totalMediaCount += 1;
    }
    if (!existing.firstMessageDate || msg.timestamp < existing.firstMessageDate) {
      existing.firstMessageDate = msg.timestamp;
    }
    if (!existing.lastMessageDate || msg.timestamp > existing.lastMessageDate) {
      existing.lastMessageDate = msg.timestamp;
    }
    participantMap.set(msg.sender, existing);
  }

  for (const call of allCalls) {
    const existing = participantMap.get(call.caller);
    if (existing) {
      existing.callCount += 1;
    }
  }

  const participantStatsRecord: Record<string, ParticipantStats> = {};
  for (const [sender, stats] of participantMap.entries()) {
    participantStatsRecord[sender] = stats;
  }

  const participants = Array.from(participantsSet);
  const firstMsg = allMessages[0];
  const lastMsg = allMessages[allMessages.length - 1];
  const earliestDate = firstMsg ? firstMsg.timestamp : new Date();
  const latestDate = lastMsg ? lastMsg.timestamp : new Date();

  const totalSize = archives.reduce((sum, a) => sum + a.metadata.fileSizeBytes, 0);
  const fileNames = archives.map((a) => a.metadata.fileName).join(' + ');

  const timeSpanMonths = Math.max(
    1,
    Math.round((latestDate.getTime() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4))
  );

  const mergedMetadata: ChatMetadata = {
    fileName: `Merged (${archives.length} Archives): ${fileNames}`,
    fileSizeBytes: totalSize,
    sha256Hash: archives.map((a) => a.metadata.sha256Hash.slice(0, 8)).join('-'),
    totalLines: archives.reduce((sum, a) => sum + a.metadata.totalLines, 0),
    parsedMessagesCount: allMessages.length,
    startDate: earliestDate,
    endDate: latestDate,
    participants,
    participantStats: participantStatsRecord,
    totalCalls: allCalls.length,
    totalMedia: totalMediaCount,
    timeSpanMonths,
  };

  return {
    messages: allMessages,
    calls: allCalls,
    metadata: mergedMetadata,
    mediaFiles: combinedMedia,
  };

  return {
    messages: allMessages,
    calls: allCalls,
    metadata: mergedMetadata,
    mediaFiles: combinedMedia,
  };
}
