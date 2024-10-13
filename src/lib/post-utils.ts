import type { CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export const published = ({ data }: Post) => !data.draft;
