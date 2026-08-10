import rss from "@astrojs/rss";
import { SITE } from "../../config";
import { blogPostPath } from "../../i18n/utils";
import { getPostSlug, getPostsByLocale } from "../../lib/blog";

export async function GET(context) {
  const posts = await getPostsByLocale("zh");
  return rss({
    title: SITE.title.zh,
    description: SITE.description.zh,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogPostPath("zh", getPostSlug(post)),
    })),
  });
}
