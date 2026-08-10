import type { Locale } from "./locales";
import { defaultLocale } from "./locales";

/** Prefix a path for the active locale. English stays unprefixed. */
export function localePath(locale: Locale, path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized === "" ? "/" : normalized;
  }
  if (normalized === "/") {
    return `/${locale}/`;
  }
  return `/${locale}${normalized}`;
}

export function stripLocaleFromPathname(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, "") || "/";
  if (cleaned === "/zh" || cleaned.startsWith("/zh/")) {
    const rest = cleaned.slice(3);
    return rest === "" ? "/" : rest.startsWith("/") ? rest : `/${rest}`;
  }
  return cleaned === "" ? "/" : cleaned;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

/**
 * Build the alternate-locale URL for the language switcher.
 * When a translated blog post slug is known, prefer that over a same-path swap.
 */
export function alternateLocalePath(
  locale: Locale,
  pathname: string,
  options?: { translationPath?: string | null },
): string | null {
  const target: Locale = locale === "en" ? "zh" : "en";

  if (options?.translationPath) {
    return localePath(target, options.translationPath);
  }

  const basePath = stripLocaleFromPathname(pathname);
  // Hide blog post links when we do not know a translation exists.
  if (/^\/blog\/[^/]+\/?$/.test(basePath) && !options?.translationPath) {
    return null;
  }

  return localePath(target, basePath);
}

export function blogPostPath(locale: Locale, slug: string): string {
  return localePath(locale, `/blog/${slug}/`);
}

export function blogTagPath(locale: Locale, tag: string): string {
  return localePath(locale, `/blog/tag/${encodeURIComponent(tag)}/`);
}

export function rssPath(locale: Locale): string {
  return localePath(locale, "/rss.xml");
}
