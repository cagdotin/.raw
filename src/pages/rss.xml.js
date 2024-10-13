import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site_config } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: site_config.title,
    description: site_config.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      content: post.content,
      link: `/blog/${post.slug}/`,
    })),
  });
}
