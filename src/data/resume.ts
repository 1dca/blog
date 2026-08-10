import type { Locale } from "../i18n/locales";

export type TimelineItem = {
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  body?: Record<Locale, string>;
};

export type ResumeData = {
  profile: Record<Locale, string>;
  education: TimelineItem[];
  experience: TimelineItem[];
  certifications: { label: Record<Locale, string>; url?: string }[];
  skills: Record<Locale, string[]>;
};

/**
 * Replace these entries with your final bilingual resume content.
 */
export const resume: ResumeData = {
  profile: {
    en: "Software engineer focused on shipping maintainable full-stack products. I enjoy clean architecture, developer experience, and clear technical writing.",
    zh: "专注于交付可维护全栈产品的软件工程师。我关注清晰架构、开发者体验与高质量技术写作。",
  },
  education: [
    {
      title: {
        en: "B.S. in Computer Science",
        zh: "计算机科学学士",
      },
      subtitle: {
        en: "2016 to 2020 at Example University, City, Country",
        zh: "2016–2020，示例大学，城市，国家",
      },
    },
  ],
  experience: [
    {
      title: {
        en: "Software Engineer at Example Company",
        zh: "软件工程师 · 示例公司",
      },
      subtitle: {
        en: "From 2022 to Present at Example Company, City, Country",
        zh: "2022 至今 · 示例公司 · 城市 · 国家",
      },
      body: {
        en: "Built and maintained production web applications, improved CI/CD reliability, and collaborated with product teams on roadmap delivery.",
        zh: "负责生产级 Web 应用的设计与维护，提升 CI/CD 稳定性，并与产品团队协作推进路线图交付。",
      },
    },
    {
      title: {
        en: "Junior Developer at Startup Co",
        zh: "初级开发工程师 · Startup Co",
      },
      subtitle: {
        en: "From 2020 to 2022 at Startup Co, City, Country",
        zh: "2020–2022 · Startup Co · 城市 · 国家",
      },
      body: {
        en: "Delivered frontend features, wrote automated tests, and documented internal APIs for a growing engineering team.",
        zh: "交付前端功能，编写自动化测试，并为成长中的工程团队完善内部 API 文档。",
      },
    },
  ],
  certifications: [
    {
      label: {
        en: "Example Cloud Practitioner",
        zh: "示例云从业者认证",
      },
      url: "https://example.com/cert",
    },
  ],
  skills: {
    en: [
      "TypeScript",
      "Python",
      "Astro",
      "React",
      "Node.js",
      "Cloudflare",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Technical Writing",
    ],
    zh: [
      "TypeScript",
      "Python",
      "Astro",
      "React",
      "Node.js",
      "Cloudflare",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "技术写作",
    ],
  },
};
