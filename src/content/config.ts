import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const site_title = z
  .string()
  .max(60, "Title should be <= 60 chars for optimal OG display.");

const site_description = z
  .string()
  .max(155, "Description should be <= 155 chars for optimal OG display.");

/**
 * remove the max 3 if you do not
 * want to limit the # of tags on a post.
 */
const post_tags = z
  .array(z.string())
  .max(3, "Too many tags (3+), less is more my friend. Tag wisely!")
  .default([]);

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z
    .object({
      title: site_title,
      description: site_description,
      tags: post_tags,
      draft: z.boolean().optional(),
      // An optional frontmatter property. Very common!
      footnote: z.string().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
    })
    .strict(),
});

export const collections = { blog };
