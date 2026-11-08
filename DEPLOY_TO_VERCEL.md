# How to Deploy ChatDocket Live (Free in 2 Minutes on Vercel)

ChatDocket is 100% client-side and fully optimized for **Vercel** or **Cloudflare Pages** (zero server configuration needed).

---

### Step 1: Push Project to GitHub
Open your terminal in `whatsapp-legal-pdf` and run:
```bash
git init
git add .
git commit -m "feat: launch ChatDocket Micro-SaaS"
git branch -M main
```
Create a new private or public repository on [GitHub](https://github.com/new) named `chatdocket`, then connect and push:
```bash
git remote add origin https://github.com/yourusername/chatdocket.git
git push -u origin main
```

---

### Step 2: Deploy on Vercel (100% Free)
1. Go to **[vercel.com](https://vercel.com)** and sign in with your GitHub account.
2. Click **"Add New..." ➔ "Project"**.
3. You will see your `chatdocket` repository. Click **"Import"**.
4. In the Project Configuration:
   * **Framework Preset:** `Next.js` (detected automatically)
   * **Root Directory:** `./`
5. Click **"Deploy"**!

---

### Step 3: Your Site is LIVE!
* In ~60 seconds, Vercel will give you a live production URL:  
  👉 **`https://chatdocket.vercel.app`** (with free automatic SSL & global CDN).
* You can connect your custom domain (e.g. `chatdocket.com` or `chatdocket.app`) under **Project Settings ➔ Domains** for free.

---

### Step 4: Adding Gumroad Payment Later (When You Are Ready)
Whenever you want to activate payments:
1. In Vercel, go to **Settings ➔ Environment Variables**.
2. Add:
   * **Key:** `NEXT_PUBLIC_PAYMENT_URL_VISA`
   * **Value:** `https://gumroad.com/l/your-gumroad-link`
3. Click **Save** and trigger a redeployment. Payments will now instantly open your Gumroad checkout!

