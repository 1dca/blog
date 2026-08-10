# Personal Resume & Tech Blog

Bilingual (English + 简体中文) personal resume and technical blog built from the [Astrofy](https://github.com/manuelernestog/astrofy) design, modernized to **Astro 7** and **Tailwind CSS 4**, and ready for **Cloudflare Pages**.

## Features

- English at root routes (`/`, `/blog`, `/projects`, `/cv`)
- Simplified Chinese under `/zh/`
- Markdown/MDX blog with syntax highlighting and tag archives
- Giscus comments component (configure IDs in `src/config.ts`)
- Locale-specific RSS feeds (`/rss.xml`, `/zh/rss.xml`)
- Static output for Cloudflare Pages (no SSR adapter required)

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Requires **Node.js 22.12+** (pinned via `.nvmrc` / `.node-version`).

## Customize content

| What | Where |
| --- | --- |
| Site name, SEO, socials, Giscus | [`src/config.ts`](src/config.ts) |
| Resume / CV copy | [`src/data/resume.ts`](src/data/resume.ts) |
| Projects | [`src/data/projects.ts`](src/data/projects.ts) |
| UI strings | [`src/i18n/ui.ts`](src/i18n/ui.ts) |
| Blog posts | [`src/content/blog/en/`](src/content/blog/en/) and [`src/content/blog/zh/`](src/content/blog/zh/) |
| Profile & social images | [`public/`](public/) |

Link EN/ZH posts with the same `translationKey` frontmatter value. If a translation is missing, the language switcher is hidden on that post.

## Cloudflare Pages

See [DEPLOY.md](DEPLOY.md) for dashboard settings.

## License

Astrofy template portions retain their original license. Your content remains yours.
