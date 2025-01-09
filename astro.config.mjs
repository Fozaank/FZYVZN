import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import middleware from "./src/middleware.ts";
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // add yur domain name here
  site: "https://fzyvzn.com",
  compressHTML: true,
  integrations: [sitemap()],
  output: "server",
});

