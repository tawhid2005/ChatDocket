# Gumroad 2-Minute Easy Payment Setup (No Coding, No Webhooks)

If Lemon Squeezy feels too complicated with too many fields, **Gumroad (gumroad.com)** is the easiest and most beginner-friendly solution in the world.

---

### Step 1: Create a Free Account
1. Go to **[gumroad.com](https://gumroad.com)**
2. Click **Start Selling** and sign up with your email.

---

### Step 2: Create Your $12 Product (Takes 60 seconds)
1. On the left sidebar, click **Products** ➔ **New Product**.
2. Select **Digital product**.
3. Fill in just 2 fields:
   * **Name:** `Chat Docket - Spouse Visa & Court Evidence Pass`
   * **Price:** `$12`
4. Click **Next: Customize** (top right corner).
5. (Optional) In Description, write:
   > Convert WhatsApp chats into official, watermark-free PDF dossiers for spouse visa and legal evidence.
6. Click **Publish & Continue**.
7. Copy your link: `https://gumroad.com/l/your-link`

---

### Step 3: Link Your Bank or Payoneer
1. Go to **Settings ➔ Payouts** in Gumroad.
2. Link your **Payoneer** or **Direct Bank Account**.
3. Gumroad deposits your earnings automatically every Friday!

---

### Step 4: Put the link in your project
Open `.env.local` in this folder and paste your Gumroad link:
```env
NEXT_PUBLIC_PAYMENT_URL_VISA=https://gumroad.com/l/your-actual-gumroad-link
```

That's it! When any customer clicks **Pay** on your website, it opens your clean Gumroad page, takes payment via credit card or PayPal, and sends the dollars straight to your account.

