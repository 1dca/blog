# Content checklist

Replace the starter values before going live:

1. [`src/config.ts`](src/config.ts) — name, titles, descriptions, email, social URLs, canonical `SITE.url`, Giscus IDs
2. [`astro.config.mjs`](astro.config.mjs) — `site` must match `SITE.url`
3. [`src/data/resume.ts`](src/data/resume.ts) — bilingual profile, education, experience, certifications, skills
4. [`src/data/projects.ts`](src/data/projects.ts) — bilingual project cards and links
5. [`public/profile.webp`](public/profile.webp), [`public/social_img.webp`](public/social_img.webp), favicon — your images
6. [`src/content/blog/en/`](src/content/blog/en/) and [`src/content/blog/zh/`](src/content/blog/zh/) — real posts; pair translations with the same `translationKey`
7. [`public/robots.txt`](public/robots.txt) — sitemap URL host

Starter posts and resume/project copy are intentionally generic so the site builds and previews cleanly until your final materials are ready.
