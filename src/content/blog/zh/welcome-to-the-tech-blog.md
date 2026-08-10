---
title: "欢迎来到技术博客"
description: "示例博文：演示 Markdown frontmatter、标签与代码高亮。"
pubDate: 2026-08-01
heroImage: "/post_img.webp"
badge: "简介"
tags: ["astro", "cloudflare", "blogging"]
translationKey: "welcome-post"
---

这是一个双语简历与技术博客站点。文章以 Markdown/MDX 存放在 `src/content/blog/` 目录。

## 为什么选择这个技术栈

- **Astro**：静态优先，默认几乎零客户端 JavaScript
- **Tailwind CSS + daisyUI**：保留 Astrofy 风格的响应式布局
- **Cloudflare Pages**：全球 CDN，配合 Git 自动部署
- **Giscus**：基于 GitHub Discussions 的评论系统

## 代码示例

```ts
export function greet(name: string): string {
  return `你好，${name}！`;
}

console.log(greet("Cloudflare"));
```

```bash
npm install
npm run dev
```

请用你的正式内容替换这篇示例文章；若存在对应英文版本，请保持两边的 `translationKey` 一致，并在 `src/config.ts` 中填写 Giscus 配置。
