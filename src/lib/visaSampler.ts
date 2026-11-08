import { ParsedMessage, GapAnnotation, SamplingDensity } from '@/types/chat';

// Detect periods of inactivity > thresholdDays (typically 14 days for immigration scrutiny)
export function detectCommunicationGaps(
  messages: ParsedMessage[],
  thresholdDays = 14
): GapAnnotation[] {
  const gaps: GapAnnotation[] = [];
  if (messages.length < 2) return gaps;

  // Filter out system notifications for gap calculation
  const validMessages = messages
    .filter((m) => !m.isSystem)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  for (let i = 0; i < validMessages.length - 1; i++) {
    const current = validMessages[i];
    const next = validMessages[i + 1];

    const diffMs = next.timestamp.getTime() - current.timestamp.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= thresholdDays) {
      const startStr = current.timestamp.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const endStr = next.timestamp.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      gaps.push({
        id: `gap-${i}-${current.timestamp.getTime()}`,
        startDate: startStr,
        endDate: endStr,
        gapDays: diffDays,
        explanation: `Communication break of ${diffDays} days during relationship timeline (e.g. in-person travel visit, medical mission, or limited network accessibility).`,
      });
    }
  }

  return gaps;
}

// Get ISO week string: "YYYY-Www"
function getISOWeekKey(d: Date): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// Get Month key: "YYYY-MM"
function getMonthKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Score a message for visa evidentiary value
function scoreMessageForEvidence(msg: ParsedMessage): number {
  let score = 1;
  if (msg.isMedia) score += 10;
  if (msg.isCall) score += 8;
  if (msg.translation) score += 3;
  if (msg.content) {
    const len = msg.content.length;
    if (len > 30) score += 2;
    if (len > 80) score += 3;
    // Common visa keywords
    if (/flight|ticket|visa|embassy|home|love|wedding|hotel|travel|family|mum|mom|dad/i.test(msg.content)) {
      score += 4;
    }
  }
  return score;
}

// Smart sampling based on density setting
export function smartSampleMessages(
  messages: ParsedMessage[],
  density: SamplingDensity,
  targetPageCount = 20
): ParsedMessage[] {
  if (density === 'all' || messages.length === 0) {
    return messages;
  }

  // Preserve non-system messages in chronological order
  const validMessages = messages.filter((m) => !m.isSystem);
  if (validMessages.length === 0) return messages;

  if (density === '3_per_week') {
    const weekGroups = new Map<string, ParsedMessage[]>();
    for (const msg of validMessages) {
      const key = getISOWeekKey(msg.timestamp);
      if (!weekGroups.has(key)) weekGroups.set(key, []);
      weekGroups.get(key)!.push(msg);
    }

    const sampled: ParsedMessage[] = [];
    for (const [, msgs] of weekGroups.entries()) {
      if (msgs.length <= 3) {
        sampled.push(...msgs);
      } else {
        // Sort by evidence score descending, pick top 3, then re-sort chronologically
        const ranked = [...msgs].sort((a, b) => scoreMessageForEvidence(b) - scoreMessageForEvidence(a));
        const top3 = ranked.slice(0, 3).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        sampled.push(...top3);
      }
    }
    return sampled;
  }

  if (density === '5_per_month') {
    const monthGroups = new Map<string, ParsedMessage[]>();
    for (const msg of validMessages) {
      const key = getMonthKey(msg.timestamp);
      if (!monthGroups.has(key)) monthGroups.set(key, []);
      monthGroups.get(key)!.push(msg);
    }

    const sampled: ParsedMessage[] = [];
    for (const [, msgs] of monthGroups.entries()) {
      if (msgs.length <= 5) {
        sampled.push(...msgs);
      } else {
        // Pick 5 distributed across the month
        const ranked = [...msgs].sort((a, b) => scoreMessageForEvidence(b) - scoreMessageForEvidence(a));
        const top5 = ranked.slice(0, 5).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        sampled.push(...top5);
      }
    }
    return sampled;
  }

  if (density === 'target_pages') {
    // A4 page holds approximately 12-15 messages in single column mode
    const estimatedMessagesPerPage = 14;
    const targetCount = Math.max(20, targetPageCount * estimatedMessagesPerPage);

    if (validMessages.length <= targetCount) {
      return validMessages;
    }

    // Proportional stride sampling with evidence scoring
    const step = validMessages.length / targetCount;
    const selected: ParsedMessage[] = [];

    for (let i = 0; i < targetCount; i++) {
      const startIdx = Math.floor(i * step);
      const endIdx = Math.min(validMessages.length, Math.floor((i + 1) * step));
      const window = validMessages.slice(startIdx, endIdx);

      if (window.length > 0) {
        // Pick best evidence in this window
        let best = window[0];
        let bestScore = scoreMessageForEvidence(best);
        for (let j = 1; j < window.length; j++) {
          const score = scoreMessageForEvidence(window[j]);
          if (score > bestScore) {
            best = window[j];
            bestScore = score;
          }
        }
        selected.push(best);
      }
    }

    return selected;
  }

  return validMessages;
}

// Auto-redact sensitive PII (phones, emails, credit card / bank / passport numbers)
export function autoRedactContent(
  text: string,
  options: { phone?: boolean; email?: boolean; idNumbers?: boolean } = {
    phone: true,
    email: true,
    idNumbers: true,
  }
): string {
  let result = text;

  if (options.email) {
    // Matches emails
    result = result.replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '[REDACTED EMAIL]'
    );
  }

  if (options.phone) {
    // Matches international phone numbers
    result = result.replace(
      /(?:\+?\d{1,4}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}(?:[-.\s]?\d{1,4})?/g,
      (match) => {
        // Avoid replacing short numbers or single years like 2024
        const digitsOnly = match.replace(/\D/g, '');
        if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
          return '[REDACTED PHONE]';
        }
        return match;
      }
    );
  }

  if (options.idNumbers) {
    // Matches 12-16 digit bank/card numbers or passport-like patterns
    result = result.replace(/\b(?:\d[ -]*?){13,16}\b/g, '[REDACTED FINANCIAL/ID]');
  }

  return result;
}

