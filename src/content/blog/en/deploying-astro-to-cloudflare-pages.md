---
title: "Deploying an Astro blog to Cloudflare Pages"
description: "Build settings, Node version pinning, and a practical checklist for Git-connected Cloudflare Pages."
pubDate: 2026-08-05
heroImage: "/post_img.webp"
tags: ["astro", "cloudflare", "devops"]
translationKey: "cloudflare-pages-deploy"
---

Cloudflare Pages works well for static Astro sites. You do **not** need the Cloudflare adapter unless you enable SSR.

## Recommended build settings

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |
| Environment variable | `NODE_VERSION=22` |

Pin Node in the repo with `.nvmrc` / `.node-version` so local and CI builds stay aligned.

## Checklist

1. Push the project to a public GitHub repository.
2. In Cloudflare, create a Pages project and connect the repository.
3. Confirm the first deploy succeeds.
4. Set your custom domain and update `SITE.url` in `src/config.ts`.
5. Enable GitHub Discussions and configure Giscus.

```js
// astro.config.mjs (static output by default)
export default defineConfig({
  site: "https://your-domain.example",
  integrations: [mdx(), sitemap()],
});
```
