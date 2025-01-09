import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel"; // ✅ Import Vercel adapter

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // add yur domain name here
  site: "https://fzyvzn.com",
  compressHTML: true,
  integrations: [sitemap()],
  output: "server",
  adapter: vercel(),
  middleware: "src/middleware.ts",
});
