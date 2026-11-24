# Austin STEM, Math & CS Tutoring Website

A high-performance, well-organized, SEO-optimized tutoring website for **UT Austin ECE PhD Student**. Built with **Vite, HTML5, Vanilla CSS, and JavaScript**.

---

## 🚀 Quick Start (Local Development)

To preview and edit the site on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
```

Open your browser at `http://localhost:5173` to view the website live with instant hot-reloading!

---

## 📦 Building for Production

To compile the production build manually:

```bash
npm run build
```

This creates an optimized, static `dist/` folder ready for static web hosting.

---

## 🌐 Deploying to GitHub Pages & Custom Squarespace Domain

### Step 1: Initialize Git & Push to GitHub

In your project directory, run:

```bash
git init
git add .
git commit -m "Initial commit - Austin STEM Tutoring website"
```

Create a new repository on GitHub (e.g., `tutoring-website`), then connect and push your code:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/tutoring-website.git
git push -u origin main
```

*(The included `.github/workflows/deploy.yml` workflow will automatically build and deploy your site to GitHub Pages whenever you push to `main`!)*

---

### Step 2: Configure GitHub Pages Settings

1. On GitHub, go to your repository **Settings** → **Pages** (under Code and automation).
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Once the GitHub Action workflow completes, your site will be live at `https://YOUR_GITHUB_USERNAME.github.io/tutoring-website/`.

---

### Step 3: Link Your Custom Domain Purchased from Squarespace

Yes! You can host your site **100% free on GitHub Pages** using a custom domain bought from Squarespace. Here is how:

#### A. In GitHub Repository:
1. `public/CNAME` is configured with `arvonentutoring.com`.
2. Go to Repository **Settings** → **Pages** → **Custom domain**, type `arvonentutoring.com`, and click **Save**.
3. Check the box **Enforce HTTPS** (GitHub will automatically issue a free SSL security certificate!).

#### B. In Squarespace Domain Settings (DNS Management):
1. Log in to **Squarespace** → Go to **Domains** → Select your domain → **DNS Settings**.
2. Under **Custom Records**, add **4 A Records** pointing `@` (or leave hostname blank) to GitHub Pages IP addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add **1 CNAME Record** for `www`:
   - **Host / Name:** `www`
   - **Type:** `CNAME`
   - **Data / Target:** `YOUR_GITHUB_USERNAME.github.io`
4. Save DNS records. (DNS propagation usually takes 5-30 minutes).

---

## 📷 Replacing Placeholder Photos with Your Photos

- To update your profile headshot, simply copy your photo into `public/assets/profile.jpg` (replacing the placeholder).
- To update the header/banner image, replace `public/assets/banner.jpg`.

---

## 📧 Updating Contact Information

- To update the target recipient email for contact inquiries, open `src/main.js` and change `cja3342@utexas.edu` to your preferred email address.
