# Custom Domain Deployment (Squarespace + GitHub Pages) & Cookieless Analytics Guide

This guide walks you through hosting your website **100% free on GitHub Pages**, connecting your **Squarespace custom domain**, and setting up **Cloudflare Web Analytics** (zero cookies, no cookie banner needed).

---

## 🛠️ Quick Troubleshooting: Fixing the macOS Xcode Git Error

If running `git status` gives you this error:
> `You have not agreed to the Xcode license agreements. Please run 'sudo xcodebuild -license' from within a Terminal window...`

### Why this happens:
On macOS, the system `git` command relies on Apple's Command Line Developer Tools. Whenever macOS or Xcode updates, Apple requires agreeing to their software license before terminal developer tools can run.

### The 5-Second Fix:
Open your Mac Terminal and run:
```bash
sudo xcodebuild -license accept
```
*Type your Mac administrator password when prompted (the letters won't show on screen as you type, which is normal) and press Enter.*

Once accepted, `git status`, `git add`, and all git commands will work immediately.

---

## 1. Hosting Architecture Overview

- **Squarespace Role**: Domain Registrar only (points DNS to GitHub). You do **not** need to buy a Squarespace website plan.
- **GitHub Pages Role**: Web Host & Global CDN. GitHub builds your Vite app, serves static files worldwide, and provisions a free Let's Encrypt SSL certificate.
- **Monthly Cost**: **$0.00 / month**.

---

## 2. Selected Analytics: Cloudflare Web Analytics

We have selected **Cloudflare Web Analytics** as your traffic monitoring platform.

### Why it bypasses cookie consent banners:
1. **Zero Client Storage:** It places **0 cookies**, no `localStorage`, and no `sessionStorage` on your visitors' devices.
2. **No Cross-Site Tracking:** It does not track users across websites or build ad profiles.
3. **Daily Rotating Salt:** Cloudflare calculates unique visits by hashing the visitor's IP + User Agent with a cryptographic salt that **rotates every 24 hours**. Raw IPs are discarded immediately.
4. **Legal Exemption:** Because no data is stored or accessed on the user's terminal equipment, privacy authorities (including EU GDPR / ePrivacy Directive regulators and California CCPA) treat it as **exempt from cookie consent banner mandates**.

### What you CAN see:
- **Total Pageviews & Unique Visits** (hourly, daily, weekly, or custom date ranges).
- **Referrers:** Where visitors came from (e.g., Google Search, LinkedIn, Reddit, school links, direct).
- **Top Pages:** Most viewed sections/paths on your site.
- **Geography:** Visitor country breakdown.
- **Devices & Browsers:** Mobile vs. Desktop vs. Tablet; Safari, Chrome, iOS, Android, etc.
- **Core Web Vitals:** Real-world page load speed and responsiveness metrics.

### What you MISS OUT ON (compared to Google Analytics):
- Multi-day user journey tracking (e.g., tracking the same visitor over multiple weeks).
- Demographic profiling (age brackets, gender, ad affinities).
- Ad retargeting (building custom audiences for Facebook/Google Ads).

---

## 3. Step-by-Step Setup Instructions

### Step 1: Set Up Cloudflare Web Analytics ✅ (Completed)

Your token `83673657724f4b21ac3347b276b9f068` is now embedded into `index.html`.

---

### Step 2: Codebase Configuration ✅ (Completed)

1. `public/CNAME` and root `CNAME` have been created and set to `arvonentutoring.com`.
2. Open Graph and canonical URLs in `index.html` have been updated to `https://arvonentutoring.com/`.
3. The site builds cleanly via Vite (`npm run build`).

To push these updates to GitHub:
```bash
git add .
git commit -m "Configure arvonentutoring.com custom domain and Cloudflare Web Analytics"
git push origin main
```
*(If you run into an Xcode license prompt on Mac, run `sudo xcodebuild -license accept` once).*

---

### Step 3: Configure Squarespace DNS Records

1. Log into **Squarespace** &rarr; click **Domains** &rarr; select **arvonentutoring.com**.
2. Click **DNS Settings** (or **Edit DNS**).
3. Delete any default parking records that conflict with the root `@` record.
4. Under **Custom Records**, add **4 Apex `A` Records** pointing to GitHub Pages:
   - **Host / Name**: `@` (or leave blank depending on Squarespace UI)
   - **Type**: `A`
   - **IP Addresses**:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

5. Add **1 `CNAME` Record** pointing `www` to your GitHub username:
   - **Host / Name**: `www`
   - **Type**: `CNAME`
   - **Data / Points To**: `<your-github-username>.github.io`

6. Click **Save**.

---

### Step 4: Configure GitHub Pages

1. In your GitHub repository, navigate to **Settings** &rarr; **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`.
3. Under **Custom domain**:
   - Enter `arvonentutoring.com` and click **Save**.
4. GitHub will verify DNS. Once verified (usually 5–30 minutes):
   - Check the box for **Enforce HTTPS** (GitHub automatically generates a free SSL certificate).
