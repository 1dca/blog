# Project Specification: Personal Resume & Tech Blog

## 1. Project Overview
Build a fast, responsive, bilingual (English + 简体中文) "Resume + Blog" portfolio website. The site serves as a professional landing page for career history, skills, and projects, alongside a technical blog with comments.

## 2. Tech Stack
* **Core Framework:** Astro 7
* **Starting Template:** Astrofy (design/structure inspiration)
* **Styling:** Tailwind CSS 4 + daisyUI 5 (`@tailwindcss/vite`)
* **Content Format:** Markdown (`.md` / `.mdx`) for blog posts
* **Commenting System:** Giscus (GitHub Discussions API)
* **Hosting & Deployment:** Cloudflare Pages (native Git integration)
* **Package Manager:** npm
* **Node:** 22+

## 3. Locales & Routes
* English (default): `/`, `/projects`, `/cv`, `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`
* Simplified Chinese: `/zh/`, `/zh/projects`, `/zh/cv`, `/zh/blog`, ...
* Blog posts may exist in one or both languages; language switcher only links when a translation exists (`translationKey`)

## 4. Core Features
* Homepage hero + featured projects + latest posts
* Projects page with cards (title, description, thumbnail, link)
* CV/resume page (profile, education, experience, certifications, skills)
* Blog listing, tag archives, syntax highlighting, RSS per locale
* Giscus comments on post pages via `src/components/Comments.astro`

## 5. Deployment Configuration
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Node Version:** 22 (`NODE_VERSION=22` on Cloudflare Pages)

## 6. Implementation Rules
* Leverage Astrofy layout/sidebar patterns and Tailwind/daisyUI classes
* Prefer `.astro` components; minimize client JS
* Static assets in `/public`; follow Astro image guidance for optimized assets
* Customize content in `src/config.ts`, `src/data/`, and `src/content/blog/`
