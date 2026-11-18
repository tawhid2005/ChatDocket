import { writeFile } from 'node:fs/promises';

const seeds = ['whatsapp chat to pdf', 'whatsapp chat proof for spouse visa', 'whatsapp chat evidence for court', 'export whatsapp chat'];
const modifiers = ['with', 'without', 'for', 'iphone', 'android', 'zip', 'txt', 'photos', 'vs', 'alternative'];
const queries = new Set(seeds.flatMap((seed) => [
  seed, ...Array.from('abcdefghijklmnopqrstuvwxyz', (letter) => seed + ' ' + letter),
  ...modifiers.map((word) => seed + ' ' + word),
  ...['how to', 'best', 'free', 'fix'].map((word) => word + ' ' + seed),
]));
const tasks = [...queries];
const responses = [];
const errors = [];
const suggestions = new Map();
await Promise.all(Array.from({ length: 4 }, async () => {
  while (tasks.length) {
    const query = tasks.shift();
    const url = new URL('https://suggestqueries.google.com/complete/search');
    url.search = new URLSearchParams({ client: 'firefox', hl: 'en', gl: 'us', q: query });
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const [, values] = await response.json();
      if (!Array.isArray(values)) throw new Error('Unexpected response');
      responses.push({ query, suggestions: values });
      for (const term of values) {
        if (!suggestions.has(term)) suggestions.set(term, []);
        suggestions.get(term).push(query);
      }
    } catch (error) {
      errors.push({ query, error: error.message, cause: error.cause?.code });
    }
  }
}));

function classify(term) {
  if (/\b(?:vs|alternative|best|pricing|free)\b/.test(term)) return 'Commercial';
  if (/\b(?:not working|error|missing|fix|failed|limit)\b/.test(term)) return 'Problem-Solving';
  if (/\b(?:buy|download|paid)\b/.test(term)) return 'Transactional';
  if (/^(?:how|what|why|can|does)\b/.test(term)) return 'Informational';
  return /\b(?:pdf|convert|converter|export|print)\b/.test(term) ? 'Tool' : 'Informational';
}

const clusters = [
  ['B', '/', /pdf.*without (?:media|photos|images|pictures)/],
  ['B', '/guide/how-to-export-whatsapp-chat-iphone-android', /not working|error|missing|failed|limit|advanced chat privacy/],
  ['C', '/guide/whatsapp-chat-to-pdf-with-photos', /pdf.*(?:photo|media|picture|image)|(?:photo|media|picture|image).*pdf/],
  ['A', '/guide/whatsapp-chat-proof-uscis-i130', /uscis|i.?130|cr1/],
  ['A', '/guide/whatsapp-evidence-canada-ircc', /canada|ircc/],
  ['A', '/guide/whatsapp-proof-australia-partner-visa', /australia/],
  ['A', '/guide/whatsapp-to-pdf-uk-spouse-visa', /ukvi|uk spouse/],
  ['A', '/guide/whatsapp-chat-court-evidence-bates-stamping', /court|bates|legal evidence/],
  ['B', '/guide', /visa|immigration|relationship evidence/],
  ['A', '/guide/how-to-export-whatsapp-chat-iphone-android', /iphone|android|export whatsapp chat/],
];

const keywords = [...suggestions].sort(([a], [b]) => a.localeCompare(b)).map(([term, sources]) => {
  const intent = classify(term);
  const cluster = clusters.find(([, , pattern]) => pattern.test(term));
  const [bucket, route] = cluster ?? [intent === 'Informational' ? 'B' : 'A', '/'];
  return { term, intent, bucket, route, sources: sources.sort() };
});
await writeFile(new URL('./02_master_keyword_universe.json', import.meta.url), JSON.stringify({
  capturedAt: new Date().toISOString(), source: 'Google Autocomplete (en-US)', seeds, queries: queries.size,
  completeResponses: responses.length, distinctSuggestions: keywords.length, errors, keywords,
}, null, 2) + '\n');
console.log({ queries: queries.size, responses: responses.length, suggestions: keywords.length, errors: errors.length });
if (!responses.length) process.exitCode = 1;
