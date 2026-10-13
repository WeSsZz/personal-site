// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wesszz.github.io',
  base: '/personal-site',
  trailingSlash: 'always',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
