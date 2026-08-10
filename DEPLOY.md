# Cloudflare Pages deployment

This project is a **static** Astro site. Connect the GitHub repository with Cloudflare Pages native Git integration. You do **not** need `@astrojs/cloudflare` for this setup.

## Dashboard settings

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro (optional) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leave empty / repository root)* |
| Environment variable | `NODE_VERSION` = `22` |

The repository also includes `.nvmrc` and `.node-version` set to `22`.

## After first deploy

1. Update `SITE.url` in [`src/config.ts`](src/config.ts) to your `*.pages.dev` or custom domain.
2. Update `site` in [`astro.config.mjs`](astro.config.mjs) to the same canonical URL.
3. Enable GitHub Discussions on the public repo, install [Giscus](https://giscus.app), and paste `repoId` / `categoryId` into `GISCUS` in `src/config.ts`.
4. Replace resume, projects, profile image, and starter posts with your final bilingual content.

## Local production check

```bash
npm run build
npm run preview
```
