import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/locales";
import { GENERATE_SLUG_FROM_TITLE } from "../config";

export type BlogPost = CollectionEntry<"blog">;

function parseBlogId(id: string): { locale: Locale; slug: string } {
  const [locale, ...rest] = id.split("/");
  if ((locale !== "en" && locale !== "zh") || rest.length === 0) {
    throw new Error(`Unexpected blog entry id: ${id}`);
  }
  return {
    locale,
    slug: rest.join("/").replace(/\.(md|mdx)$/, ""),
  };
}

export function getPostLocale(post: BlogPost): Locale {
  return parseBlogId(post.id).locale;
}

export function getPostSlug(post: BlogPost): string {
  const { slug } = parseBlogId(post.id);
  if (!GENERATE_SLUG_FROM_TITLE) {
    return slug;
  }
  return post.data.title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/^-+|-+$/g, "");
}

export async function getPostsByLocale(locale: Locale): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data, id }) => {
    if (data.draft) return false;
    return parseBlogId(id).locale === locale;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function findTranslation(
  post: BlogPost,
  targetLocale: Locale,
): Promise<BlogPost | undefined> {
  const key = post.data.translationKey;
  if (!key) return undefined;
  const candidates = await getPostsByLocale(targetLocale);
  return candidates.find((entry) => entry.data.translationKey === key);
}

export async function getTranslationPath(
  post: BlogPost,
  targetLocale: Locale,
): Promise<string | null> {
  const translation = await findTranslation(post, targetLocale);
  if (!translation) return null;
  return `/blog/${getPostSlug(translation)}/`;
}
