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
    id: "",
    title: {
      en: "Network Endpoint Tracer",
      zh: "网络设备端口追踪器",
    },
    description: {
      en: "A tool for quickly finding the physical switch port to which a specific device (identified by its IP or MAC address) is connected.",
      zh: "一个快速查找特定设备（通过 IP 或 MAC 地址识别）连接到的物理交换机端口的工具。",
    },
    image: "/post_img.webp",
    url: "https://github.com/1dca/endpoint_tracer",
    badge: { en: "network tools", zh: "网络工具集" },
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
