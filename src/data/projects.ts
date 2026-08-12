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
      en: "A prototype tool for solving repetitive task in production. The tool collects ARP, MAC, and LLDP/CDP neighbor data from multi-vendor devices, stores them as SQLite snapshots, and traces endpoint attachment by combining ARP resolution, MAC-table filtering, and constrained topology traversal. ",
      zh: "一个用于解决生产环境重复性任务的工具原型。该工具从多厂商设备收集 ARP、MAC 和 LLDP/CDP 邻居数据，并存储为 SQLite 快照，通过结合 ARP 解析、MAC 表过滤和受限拓扑遍历，追踪终端设备的连接关系。",
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
