import { defineCollection, reference, z } from "astro:content";

const site_title = z
  .string()
  .max(60, "Title should be <= 60 chars for optimal OG display.");

const site_description = z
  .string()
  .max(155, "Description should be <= 155 chars for optimal OG display.");

const post_tags = z
  .array(z.string())
  // remove the following if you do not want to limit the # of tags on a post.
  .max(3, "Too many tags (3+), less is more my friend. Tag wisely!")
  .default([]);

const local_avatar = z
  .string()
  // replace .refine(...) with .url() if you are gonna using external sources for avatar.
  .refine((value) => value.startsWith("/images/authors/"));

const authors = defineCollection({
  type: "data",
  schema: z
    .object({
      name: z.string(),
      bio: z.string(),
      avatar: local_avatar,
      website: z.string().url(),
      email: z.string().email().optional(),
      socials: z.object({
        twitter: z.string().url().optional(),
        github: z.string().url().optional(),
      }),
    })
    .strict(),
});

const blog = defineCollection({
  type: "content",
  schema: z
    .object({
      title: site_title,
      description: site_description,
      tags: post_tags,
      author: reference("authors"),
      draft: z.boolean().optional(),
      // An optional frontmatter property. Very common!
      footnote: z.string().optional(),
      // ---
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

export const collections = { authors, blog };
