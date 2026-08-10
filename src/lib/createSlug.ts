import { GENERATE_SLUG_FROM_TITLE } from "../config";

/** @deprecated Prefer getPostSlug from src/lib/blog.ts */
export default function createSlug(title: string, staticSlug: string) {
  return !GENERATE_SLUG_FROM_TITLE
    ? staticSlug
    : title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .replace(/^-+|-+$/g, "");
}
