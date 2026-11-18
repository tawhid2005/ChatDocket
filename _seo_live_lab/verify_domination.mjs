import { writeFile } from 'node:fs/promises';

const [origin, output, mode] = process.argv.slice(2);
if (!origin || !output) throw new Error('Usage: node verify_domination.mjs ORIGIN OUTPUT [check|competitors]');

const plain = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|nbsp|quot|#x27|#39);/g, ' ').replace(/\s+/g, ' ').trim();
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, name, double, single]) => [name, double ?? single]));
const equivalentUrls = (first, second) => Boolean(first && second && new URL(first).href === new URL(second).href);
const tags = (html, name) => [...html.matchAll(new RegExp('<' + name + '\\b[^>]*>', 'gi'))].map(([tag]) => attributes(tag));

async function fetchPage(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(18000) });
  return { status: response.status, url: response.url, text: await response.text() };
}

async function audit(url) {
  try {
    const page = await fetchPage(url);
    const html = page.text;
    const body = (html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html)
      .replace(/<(script|style|template|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
    const meta = Object.fromEntries(tags(html, 'meta').map((tag) => [tag.name ?? tag.property, tag.content]).filter(([key]) => key));
    const images = tags(body, 'img');
    const links = [];
    for (const { href } of tags(body, 'a')) {
      if (!href || href.startsWith('#')) continue;
      const target = new URL(href.replaceAll('&amp;', '&'), page.url);
      if (target.origin === new URL(page.url).origin) links.push(target.pathname + target.search);
    }
    const graph = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
      .filter(([, tag]) => attributes(tag).type === 'application/ld+json')
      .map(([, , value]) => {
        try { return JSON.parse(value); } catch { return { parseError: true }; }
      });
    const text = plain(body);
    const terms = {};
    for (const match of text.toLowerCase().matchAll(/\b[a-z][a-z-]{3,}\b/g)) {
      const term = match[0];
      if (['this','with','that','your','from','will','have','they','what','which','into','when','about','more','here','them','there','then','make','only','some','also','their','each','than','where'].includes(term)) continue;
      terms[term] = (terms[term] ?? 0) + 1;
    }
    return {
      url, finalUrl: page.url, status: page.status,
      title: plain(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]),
      canonical: tags(html, 'link').filter((tag) => tag.rel === 'canonical').map((tag) => tag.href),
      description: meta.description, robots: meta.robots,
      openGraph: Object.fromEntries(Object.entries(meta).filter(([key]) => key.startsWith('og:'))),
      twitter: Object.fromEntries(Object.entries(meta).filter(([key]) => key.startsWith('twitter:'))),
      headings: [...body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(([, level, content]) => ({ level: Number(level), text: plain(content) })),
      wordCount: text.split(/\s+/).filter(Boolean).length,
      internalLinkCount: links.length,
      internalLinks: [...new Set(links)],
      images: { total: images.length, withAlt: images.filter((tag) => 'alt' in tag).length, withDimensions: images.filter((tag) => tag.width && tag.height).length },
      graph,
      frequentTerms: Object.fromEntries(Object.entries(terms).sort((a, b) => b[1] - a[1]).slice(0, 40)),
      features: { tables: tags(body, 'table').length, orderedLists: tags(body, 'ol').length, unorderedLists: tags(body, 'ul').length, forms: tags(body, 'form').length },
    };
  } catch (error) {
    return { url, error: error.message, cause: error.cause?.code };
  }
}

const competitors = [
  'https://chattopdf.app/',
  'https://tuul.io/whatsapp-chat-to-pdf/',
  'https://usecircles.app/en/tools/whatsapp-chat-to-pdf',
  'https://whatsync.app/tools/whatsapp-chat-to-pdf',
  'https://chattopaper.com/whatsapp-to-pdf/',
];
const report = { capturedAt: new Date().toISOString() };
if (mode === 'competitors') {
  report.method = 'Direct HTML sample of five web-search results for converter and photo intent; ordering does not represent Google rankings.';
  report.pages = await Promise.all(competitors.map(audit));
} else {
  const [sitemap, robots] = await Promise.all(['/sitemap.xml', '/robots.txt'].map((path) => fetchPage(new URL(path, origin))));
  const locations = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  report.audience = ['People exporting WhatsApp chats', 'Visa applicants preparing relationship records', 'People organizing court or dispute exhibits'];
  report.sitemap = { status: sitemap.status, locations, lastmodCount: [...sitemap.text.matchAll(/<lastmod>/g)].length };
  report.robots = { status: robots.status, text: robots.text };
  report.pages = await Promise.all([...locations.map((url) => new URL(new URL(url).pathname, origin).href), new URL('/payment-success', origin).href].map(audit));
  if (mode === 'check') {
    const payment = report.pages.at(-1);
    const publicPages = report.pages.slice(0, -1);
    const brokenLinks = [];
    const known = new Set(publicPages.map((page) => new URL(page.url).pathname));
    const targets = [...new Set(publicPages.flatMap((page) => page.internalLinks ?? []))].filter((path) => !known.has(path));
    await Promise.all(targets.map(async (path) => {
      try {
        const result = await fetchPage(new URL(path, origin));
        if (result.status >= 400) brokenLinks.push({ path, status: result.status });
      } catch (error) {
        brokenLinks.push({ path, error: error.message });
      }
    }));
    report.checks = {
      sitemapAndRobots: sitemap.status === 200 && robots.status === 200 && locations.length > 0 && new Set(locations).size === locations.length && robots.text.includes(new URL('/sitemap.xml', locations[0]).href),
      paymentNoindex: payment.status === 200 && payment.robots?.includes('noindex') && payment.canonical.length === 0 && !robots.text.includes('/payment-success') && !locations.some((url) => new URL(url).pathname === '/payment-success'),
      uniqueTitlesAndDescriptions: ['title', 'description'].every((key) => new Set(publicPages.map((page) => page[key])).size === publicPages.length),
      brokenLinks,
    };
    report.scorecards = publicPages.map((page, index) => {
      const rules = {
        http200: page.status === 200,
        title: Boolean(page.title),
        description: Boolean(page.description),
        selfCanonical: page.canonical?.length === 1 && equivalentUrls(page.canonical[0], locations[index]),
        openGraph: equivalentUrls(page.openGraph?.['og:url'], locations[index]) && ['title', 'description', 'image'].every((field) => page.openGraph?.['og:' + field]),
        twitter: ['title', 'description', 'image'].every((field) => page.twitter?.['twitter:' + field]),
        singleH1: page.headings?.filter(({ level }) => level === 1).length === 1,
        imageAlt: Boolean(page.images && page.images.total === page.images.withAlt),
        jsonLd: Boolean(page.graph?.length && page.graph.every((node) => !node.parseError)),
        crawlable: Boolean(page.status === 200 && !page.robots?.includes('noindex') && !page.internalLinks?.some((path) => brokenLinks.some((link) => link.path === path))),
      };
      return { url: page.url, score: Object.values(rules).filter(Boolean).length * 10, rules };
    });
    if (report.scorecards.some(({ score }) => score !== 100) || Object.values(report.checks).includes(false) || brokenLinks.length) process.exitCode = 1;
  }
}
await writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ pages: report.pages.map(({ url, status, error }) => ({ url, status, error })), checks: report.checks, scores: report.scorecards?.map(({ score }) => score) }, null, 2));
