// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

import { figures } from './src/markdown/figures.mjs';

import videoPosters from './src/integrations/video_posters.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://tzainten.github.io',
  integrations: [videoPosters()],
  markdown: {
    processor: satteri({ hastPlugins: [figures] }),
    shikiConfig: {
      themes: {
        light: 'light-plus',
        dark: 'dark-plus'
      }
    }
  },
});
