# ChatDocket SEO verification

Audit date: 18 November 2026

## Evidence

- [Live baseline](01_current_site_audit.json) records the HTML served by the current deployment for 13 sitemap URLs and the payment confirmation page.
- [Google Autocomplete sample](02_master_keyword_universe.json) records 164 successful en-US query variants, 405 distinct suggestions, their source queries and suggested content destinations. Suggestions do not measure volume, rank or CTR.
- [Five competitor pages](03_competitor_blueprint.json) records direct HTML captures of ChatToPDF, Tuul, Circles, WhatSync and ChatToPaper. The sample comes from public search results for converter and photo intent. Direct Google requests for three clusters returned HTTP 200 but no extractable result headings. Google rankings and People Also Ask positions could not be verified.
- [Production-build verification](04_production_verification.json) records the local production HTTP check and page-level rubric.

## Changes

| Check | Public baseline | Updated production build |
| --- | --- | --- |
| Sitemap URL count | 13 | 14 |
| Canonical host | 13 public canonicals pointed to the apex domain, which redirected to www | Public canonicals, social URLs and sitemap use www |
| Open Graph image | Present on 1 of 13 public pages | Present on all 14 public pages |
| Twitter cards | Shared home metadata on guide and policy pages | Each public page uses its own title and description |
| Sitemap modification dates | All 13 entries emitted the build date | Dates on the homepage, new photos guide and updated IRCC guide |
| Payment confirmation | Blocked in robots.txt while carrying noindex and the home canonical | Reachable for noindex discovery, omitted from sitemap, no canonical |
| Structured data | Application, FAQ, HowTo and breadcrumb blocks repeated across routes | Application schema on the homepage, with article and breadcrumb data on applicable guides |

## Search intent and competitor notes

The sampled converter pages generally lead with ZIP or TXT conversion, export steps, photos and browser privacy. ChatToPDF uses preview and pricing language. Tuul and Circles document export steps and photos. WhatSync and ChatToPaper explain what the export can preserve. Their captured titles span 47–68 characters, descriptions span 152–172 characters, and HTML text estimates span 387–4,266 words. These counts include navigation and other visible page text and do not measure content quality.

Suggestions such as “whatsapp chat to pdf with media” and “how to export whatsapp chat to pdf with media” informed the new photos guide. The guide covers ZIP requirements, missing media, preview checks and preserving the original export. The homepage serves general converter intent and links to the photo, export, visa and court guides. The IRCC page now distinguishes the product's sampling controls from the official maximum of ten pages for all proof of communication. [IRCC Guide IMM 5289](https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5289-sponsor-your-spouse-common-law-partner-conjugal-partner-dependent-child-complete-guide.html)

## Final result

The Next.js production build and TypeScript checks passed. All 14 public pages scored 100/100 on the technical rubric. All 15 audited routes returned HTTP 200, there were zero broken internal links in the sampled rendered pages, and the social image returned HTTP 200 with image/png. Targeted ESLint still flagged two pre-existing errors in the homepage payment and error handling code, along with ten pre-existing onboarding warnings.

## How to reproduce

Run the production build, start Next on port 4174 and execute:

```bash
node _seo_live_lab/verify_domination.mjs http://127.0.0.1:4174 _seo_live_lab/04_production_verification.json check
```

The technical score gives 10 points each for HTTP 200, a title, a description, self-canonical, Open Graph, Twitter metadata, one H1, alt coverage, JSON-LD parsing and response/link crawlability. Site-level checks cover sitemap and robots consistency, payment exclusion, metadata uniqueness and broken internal links. An equivalent slash at the origin root is normalized before canonical comparisons. The score does not estimate Google placement, click-through or Core Web Vitals.

IndexNow submissions require a matching verified key file hosted at the canonical origin. The utility validates the key file before posting explicitly supplied changed URLs. No URLs were submitted during this audit. [IndexNow documentation](https://www.indexnow.org/documentation)

```bash
node _seo_live_lab/indexnow.mjs https://www.chatdocket.xyz / /guide/whatsapp-chat-to-pdf-with-photos
```

No deployment was made during this audit. Ranking, indexed coverage, Core Web Vitals and post-deployment search performance remain unmeasured.
