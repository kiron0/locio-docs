import { defineConfig } from "vitepress";

export default defineConfig({
  title: "LocIO",
  description:
    "A fast CLI tool to count lines and files in directories with powerful filters and rich statistics.",

  base: "/",
  srcDir: "src",

  appearance: true,
  cleanUrls: true,
  metaChunk: true,

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:title",
        content: "LocIO - Fast Lines of Code & File Statistics",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "A fast, Rust-powered CLI to count files and lines with flexible filtering and detailed stats.",
      },
    ],
    ["meta", { property: "og:image", content: "/og-image.png" }],
    ["meta", { property: "og:url", content: "https://locio.js.org" }],
    // Twitter
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "LocIO - Fast Lines of Code & File Statistics",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "A fast, Rust-powered CLI to count files and lines with flexible filtering and detailed stats.",
      },
    ],
    ["meta", { name: "twitter:image", content: "/og-image.png" }],
  ],

  themeConfig: {
    logo: {
      src: "/logo.png",
      alt: "LocIO Logo",
    },

    nav: [
      { text: "Get Started", link: "/get-started" },
      { text: "Usage", link: "/usage" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [{ text: "Getting Started", link: "/guide/getting-started" }],
        },
      ],
      "/cli/": [
        {
          text: "CLI",
          items: [{ text: "Usage", link: "/cli/usage" }],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/kiron0/locio" }],
  },
});
