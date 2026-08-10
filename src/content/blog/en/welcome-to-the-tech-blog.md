---
title: "Welcome to the tech blog"
description: "A starter post demonstrating Markdown frontmatter, tags, and syntax highlighting."
pubDate: 2026-08-01
heroImage: "/post_img.webp"
badge: "Intro"
tags: ["astro", "cloudflare", "blogging"]
translationKey: "welcome-post"
---

This site is a bilingual resume and technical blog. Posts live in Markdown/MDX under `src/content/blog/`.

## Why this stack

- **Astro** for fast static pages with almost no client JavaScript
- **Tailwind CSS + daisyUI** for a clean, responsive Astrofy-style layout
- **Cloudflare Pages** for global CDN hosting with Git-based deploys
- **Giscus** for comments backed by GitHub Discussions

## Code sample

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Cloudflare"));
```

```bash
npm install
npm run dev
```

Replace this starter post with your own writing, keep `translationKey` aligned across languages when a Chinese version exists, and update Giscus IDs in `src/config.ts`.
