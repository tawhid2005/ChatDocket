# Chat Docket - Lemon Squeezy Professional Product Setup Guide

Use this copy-paste guide to set up your products on [Lemon Squeezy](https://lemonsqueezy.com) in less than 5 minutes. Once set up, copy the generated checkout URLs into your `.env.local` file to start receiving direct payments into your bank account.

---

## 📦 PRODUCT 1: Visa & Court Single Case Pass ($12.00 One-Time)

### 1. General Details
* **Product Name:** `Chat Docket - Visa & Court Single Case Pass`
* **Slug:** `visa-case-pass`
* **Pricing Model:** `Single payment (One-time)`
* **Price:** `$12.00 USD`
* **Tax Category:** `Digital Good / Software (SaaS)`

### 2. Product Description (Copy & Paste this Markdown / Rich Text):
```markdown
### Official Embassy & Court Evidence Dossier (100% Watermark-Free)

Turn raw WhatsApp `.zip` or `.txt` chats into an official, paginated, adjudicator-compliant PDF exhibit packet for your spouse visa petition or civil court proceedings.

#### What's Included:
- **100% Watermark-Free Vector A4 / US Letter PDF** export
- **Unlimited Messages & Photos:** No page caps, complete chronological archive
- **Relationship Analytics Cover Page:** Interactive communication timeline, monthly volume chart & contact proof
- **Official Call Log Schedule:** Missed, answered, and video call duration logs
- **Photo Evidence Grid:** Date/time stamped photo corroboration
- **Forensic SHA-256 Hash Integrity Stamp:** Tamper-proof cryptographic validation header
- **Certified Translator Declaration Block:** UKVI (Appendix FM) & USCIS compliant foreign translation attestations
- **100% Client-Side RAM Privacy:** Zero server uploads, your intimate messages never leave your computer
- **30-Day Money-Back Guarantee:** If rejected by caseworker or court
```

### 3. Files & License Keys
* **Generate License Keys:** Toggle **ON**
* **License Key Format:** Prefix: `CDK-VISA-`
* **Activation Limit:** `3 Activations` (allows client to export across devices)

### 4. Confirmation & Redirect URLs
* **Redirect after purchase:** `https://yourdomain.com/?checkout=success&plan=visa_pass`
* **Receipt Button Text:** `Access My Docket & Download PDF`

---

## 🏢 PRODUCT 2: Law Firm & Agency Pro ($39.00 / Month Recurring)

### 1. General Details
* **Product Name:** `Chat Docket - Law Firm & Agency Pro Plan`
* **Slug:** `agency-pro`
* **Pricing Model:** `Subscription (Recurring)`
* **Billing Interval:** `Monthly`
* **Price:** `$39.00 USD / month`
* **Free Trial:** `None` or `3 Days`

### 2. Product Description (Copy & Paste this Markdown / Rich Text):
```markdown
### Designed for Immigration Solicitors, Barristers & Legal Consultancies

Unlimited client case exports, white-label legal branding, automated Bates stamping, and forensic evidentiary compliance for law practices.

#### Enterprise Features Included:
- **Unlimited Client Cases:** Process unlimited spouse visas, family law disputes, and civil litigations
- **Custom Law Firm Header & Official Seal:** Brand all A4/Letter dossiers with your firm's name and case reference
- **Automated Sequential Bates Stamping:** Sequential numbering (`Exhibit A - Page 001`, `#0001` message indices)
- **1-Click Bulk PII Auto-Redaction:** Instant masking of bank digits, passport numbers, emails, and phone numbers
- **Solicitor Statement of Truth:** Formatted to Civil Procedure Rules (CPR Part 32)
- **Forensic Verification Certificate (.txt):** Downloadable SHA-256 cryptographic audit trail for court admissibility
- **Dual International Standard Sizing:** 1-Click switch between ISO A4 (UK/EU/Canada) and US Letter (USCIS/US Courts)
- **Priority Solicitor Support:** Direct WhatsApp & Email SLA
```

### 3. Files & License Keys
* **Generate License Keys:** Toggle **ON**
* **License Key Format:** Prefix: `CDK-AGENCY-`
* **Activation Limit:** `Unlimited`

### 4. Confirmation & Redirect URLs
* **Redirect after purchase:** `https://yourdomain.com/?checkout=success&plan=agency_pro`
* **Receipt Button Text:** `Open Agency Portal & Activate License`

---

## 🌐 WEBHOOK CONFIGURATION (Automatic License Activation)

In your Lemon Squeezy Dashboard, navigate to **Settings ➔ Webhooks ➔ Add Webhook**:

1. **Callback URL:**
   ```
   https://yourdomain.com/api/webhook/lemonsqueezy
   ```
2. **Signing Secret:** Choose a secure random string (e.g. `ls_sec_chatdocket_99482716`)
3. **Events to Select (Check these boxes):**
   - [x] `order_created`
   - [x] `subscription_created`
   - [x] `subscription_updated`
   - [x] `subscription_cancelled`
   - [x] `license_key_created`

---

## 🔑 CONNECTING TO YOUR PROJECT

Once products and webhooks are created on Lemon Squeezy:
1. Open `.env.local` in `whatsapp-legal-pdf`
2. Paste the live checkout links:
   ```env
   NEXT_PUBLIC_LEMON_SQUEEZY_VISA_URL=https://chatdocket.lemonsqueezy.com/buy/your-actual-visa-link
   NEXT_PUBLIC_LEMON_SQUEEZY_AGENCY_URL=https://chatdocket.lemonsqueezy.com/buy/your-actual-agency-link
   LEMON_SQUEEZY_WEBHOOK_SECRET=ls_sec_chatdocket_99482716
   ```
3. Deploy to Vercel or Cloudflare Pages with these environment variables.

