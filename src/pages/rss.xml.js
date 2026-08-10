import rss from "@astrojs/rss";
import { SITE } from "../config";
import { blogPostPath } from "../i18n/utils";
import { getPostSlug, getPostsByLocale } from "../lib/blog";

export async function GET(context) {
  const posts = await getPostsByLocale("en");
  return rss({
    title: SITE.title.en,
    description: SITE.description.en,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogPostPath("en", getPostSlug(post)),
    })),
  });
}
