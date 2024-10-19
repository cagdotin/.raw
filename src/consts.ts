// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { Home, LayoutDashboard, File, SquareMenu } from "lucide-react";

export const site_config = {
  title: ".raw",
  description:
    ".raw is an opinionated static blogging template built with Astro, Tailwind , and shadcn/ui.",
  socials: {
    twitter: "https://x.com/cagdotin",
    github: "https://github.com/cagdotin/.raw",
    rss: "https://example.com/rss",
  },
  main_nav: [
    { title: "home", href: "/", Icon: Home },
    { title: "about", href: "/about", Icon: File },
    { title: "blog", href: "/blog", Icon: SquareMenu },
    { title: "components", href: "/blog/components", Icon: LayoutDashboard },
  ],
};
