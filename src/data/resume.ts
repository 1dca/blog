import type { Locale } from "../i18n/locales";

export type AboutSection = {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
};

export type AboutData = {
  /** Short opening under the page title */
  lead: Record<Locale, string>;
  sections: AboutSection[];
  /** Soft chips — tools, topics, interests */
  into: Record<Locale, string[]>;
};

/**
 * Casual "About me" copy. Edit this file to update /about and /zh/about.
 */
export const about: AboutData = {
  lead: {
    en: "Hey — I'm Rick. I spend most of my days deep in networks: designing them, breaking them (on purpose), fixing them, and writing down what I learn.",
    zh: "你好，我是 Rick。日常基本都泡在网络里：设计、排障、偶尔故意折腾一下，再把学到的东西记下来。",
  },
  sections: [
    {
      title: {
        en: "What I do",
        zh: "我在做什么",
      },
      body: {
        en: "I'm a network engineer focused on data center and campus environments. The work I enjoy most is complex design, clean implementation, and the kind of troubleshooting that feels like a puzzle.",
        zh: "我是一名偏数据中心和校园网的网络工程师。最喜欢的部分是复杂设计、落地实施，以及那种像解谜一样的故障排查。",
      },
    },
    {
      title: {
        en: "Where I am now",
        zh: "现在在哪",
      },
      body: {
        en: "I work at HKBN as a Lead Specialist (Network). Day to day that means helping shape network solutions and staying close to the messy, real-world problems that show up in production.",
        zh: "目前在香港宽频做网络专家（Lead Specialist）。日常就是参与网络方案，并跟生产环境里那些真实、棘手的问题较劲。",
      },
    },
    {
      title: {
        en: "A bit of background",
        zh: "一点背景",
      },
      body: {
        en: "I studied Information and Systems at The Hong Kong Polytechnic University. That mix of systems thinking and hands-on curiosity still shapes how I approach networking work today.",
        zh: "我在香港理工大学读的是信息与系统。系统和动手这块的训练，到现在也还影响着我看网络问题的方式。",
      },
    },
  ],
  into: {
    en: [
      "Routing & switching",
      "Network architecture",
      "Data center",
      "Campus network",
      "Automation",
      "Packet captures",
      "Troubleshooting",
    ],
    zh: [
      "路由交换",
      "网络架构",
      "数据中心",
      "校园网",
      "自动化",
      "抓包分析",
      "故障排查",
    ],
  },
};

/** @deprecated Use `about` — kept for any old imports. */
export const resume = about;
