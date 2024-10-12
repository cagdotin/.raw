import { defineCollection, z } from "astro:content";

const author = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().url(),
    website: z.string().url().optional(),
    email: z.string().url().optional(),
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
      .max(3, "Too many tags (3+), less is more my friend. Tag wisely!")
      .optional(),
    authors: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { author, blog };
