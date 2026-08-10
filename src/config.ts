export const SITE = {
  name: "Rick Cao",
  title: {
    en: "Rick Cao | Network Engineer",
    zh: "Rick Cao | 网络工程师",
  },
  description: {
    en: "Personal resume and technical blog covering networking, automation and other things I interest in.",
    zh: "个人简历与技术博客，分享网络、自动化和其他我感兴趣的内容。",
  },
  /** Canonical site URL used for sitemap, RSS, and Open Graph. Update before production deploy. */
  url: "https://noerror.cc",
  email: "rick.cao@gmail.com",
  author: {
    en: "Rick Cao",
    zh: "Rick Cao",
  },
  tagline: {
    en: "Network Engineer",
    zh: "网络工程师",
  },
  intro: {
    en: "I'm a network engineer with a passion for networking, automation and other things I interest in. This site hosts a bit about me, selected projects, and technical notes.",
    zh: "我是一个网络工程师，热衷于网络、自动化和其他我感兴趣的内容。这里有一点关于我、精选项目与技术笔记。",
  },
  profileImage: "/profile.webp",
  socialImage: "/social_img.webp",
  socials: {
    github: "https://github.com/1dca",
    linkedin: "https://www.linkedin.com/in/rick-cao-networking/",
    email: "rick.cao@gmail.com",
  },
} as const;

/**
 * Giscus settings.
 * Fill these after enabling GitHub Discussions and installing the Giscus app:
 * https://giscus.app
 */
export const GISCUS = {
  repo: "1dca/blog",
  repoId: "R_kgDOT0ZNXg",
  category: "Announcements",
  categoryId: "DIC_kwDOT0ZNXs4DDFLI",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  loading: "lazy",
} as const;

export const GENERATE_SLUG_FROM_TITLE = false;
export const TRANSITION_API = true;
export const BLOG_PAGE_SIZE = 10;

/** @deprecated Prefer SITE.title / SITE.description helpers via i18n. */
export const SITE_TITLE = SITE.title.en;
/** @deprecated Prefer SITE.description helpers via i18n. */
export const SITE_DESCRIPTION = SITE.description.en;
