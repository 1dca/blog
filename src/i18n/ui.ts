import type { Locale } from "./locales";

const ui = {
  en: {
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    cv: "CV",
    contact: "Contact",
    latestProjects: "My latest projects",
    latestBlog: "Latest from blog",
    readMore: "Read more",
    projectsHeader: "Projects",
    profile: "Profile",
    education: "Education",
    experience: "Experience",
    certifications: "Certifications",
    skills: "Skills",
    blogEmptyTitle: "Sorry!",
    blogEmptyBody: "There are no blog posts to show at the moment. Check back later!",
    recentPosts: "Recent posts",
    olderPosts: "Older posts",
    lastUpdated: "Last updated on",
    comments: "Comments",
    language: "Language",
    connect: "Let's connect",
    viewGithub: "View on GitHub",
    liveDemo: "Live demo",
    footerCredit: "Built with Astrofy-inspired layout on Astro + Tailwind.",
    switchTo: "中文",
  },
  zh: {
    home: "首页",
    projects: "项目",
    blog: "博客",
    cv: "简历",
    contact: "联系",
    latestProjects: "最近项目",
    latestBlog: "最新博文",
    readMore: "阅读全文",
    projectsHeader: "项目",
    profile: "简介",
    education: "教育经历",
    experience: "工作经历",
    certifications: "证书资质",
    skills: "技能",
    blogEmptyTitle: "暂无内容",
    blogEmptyBody: "目前还没有可展示的博文，请稍后再来查看。",
    recentPosts: "较新文章",
    olderPosts: "更早文章",
    lastUpdated: "最后更新于",
    comments: "评论",
    language: "语言",
    connect: "与我联系",
    viewGithub: "查看 GitHub",
    liveDemo: "在线演示",
    footerCredit: "基于 Astro + Tailwind，沿用 Astrofy 风格布局。",
    switchTo: "English",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];

export function t(locale: Locale, key: UIKey): string {
  return ui[locale][key];
}

export function pickLocalized<T extends Record<Locale, string>>(
  locale: Locale,
  values: T,
): string {
  return values[locale];
}
