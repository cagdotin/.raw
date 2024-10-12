import { defineCollection, reference, z } from "astro:content";

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    // replace .refine(...) with .url() if you are gonna using external sources for avatar.
    avatar: z.string().refine((value) => value.startsWith("/images/authors/")),
    website: z.string().url(),
    email: z.string().email().optional(),
    socials: z.object({
      twitter: z.string().url().optional(),
      github: z.string().url().optional(),
    }),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(
        60,
        "Title should be 60 or less chars for optimal OpenGraph display."
      ),
    description: z
      .string()
      .max(
        155,
        "Description should be 155 or less chars for optimal OpenGraph display."
      ),
    tags: z
      .array(z.string())
      // remove the following if you do not want to limit the # of tags on a post.
      .max(3, "Too many tags (3+), less is more my friend. Tag wisely!")
      .default([]),
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
  }),
});

export const collections = { authors, blog };
