// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { getEntry } from "astro:content";

const author = await getEntry("authors", "cagin");
const { socials } = author.data;

export const site_config = {
  title: ".raw",
  description:
    "Astro.js template in brutalist style, focusing on raw simplicity and functionality. Minimalist design for developers who appreciate the bare essentials.",
  socials: {
    twitter: socials.twitter,
    github: socials.github,
    rss: "https://example.com/rss",
  },
};
