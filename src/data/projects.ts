import type { Locale } from "../i18n/locales";

export type Project = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  image: string;
  url: string;
  badge?: Record<Locale, string>;
  featured?: boolean;
};

/**
 * Replace these entries with your final bilingual project portfolio.
 */
export const projects: Project[] = [
  {
    id: "personal-blog",
    title: {
      en: "Personal Blog Platform",
      zh: "个人博客站点",
    },
    description: {
      en: "A bilingual resume and tech blog deployed on Cloudflare Pages with Markdown content and Giscus comments.",
      zh: "部署在 Cloudflare Pages 上的双语简历与技术博客，支持 Markdown 内容与 Giscus 评论。",
    },
    image: "/post_img.webp",
    url: "https://github.com/your-github/blog",
    badge: { en: "Featured", zh: "精选" },
    featured: true,
  },
  {
    id: "api-toolkit",
    title: {
      en: "API Toolkit",
      zh: "API 工具集",
    },
    description: {
      en: "Utilities and templates for designing, documenting, and testing HTTP APIs with consistent conventions.",
      zh: "用于设计、文档化与测试 HTTP API 的工具与模板，强调一致的工程约定。",
    },
    image: "/post_img.webp",
    url: "https://github.com/your-github/api-toolkit",
    featured: true,
  },
  {
    id: "dev-dashboard",
    title: {
      en: "Developer Dashboard",
      zh: "开发者仪表盘",
    },
    description: {
      en: "A lightweight dashboard for monitoring build health, deploy status, and documentation freshness.",
      zh: "轻量级仪表盘，用于监控构建健康度、部署状态与文档新鲜度。",
    },
    image: "/post_img.webp",
    url: "https://github.com/your-github/dev-dashboard",
    badge: { en: "OSS", zh: "开源" },
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
