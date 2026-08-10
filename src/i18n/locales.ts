export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export const astroLocale: Record<Locale, string> = {
  en: "en",
  zh: "zh-cn",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "zh";
}
