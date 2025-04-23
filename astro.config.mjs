// @ts-check
import { defineConfig } from 'astro/config';
import {i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration"
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
});