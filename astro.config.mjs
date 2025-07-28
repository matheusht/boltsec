// @ts-check
import { defineConfig } from 'astro/config';
import {i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration"
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// Debug logging
console.log('=== ASTRO CONFIG DEBUG ===');
console.log('Importing astro-i18n-aut integration...');

const i18nConfig = {
  defaultLocale: "pt-BR",
  locales: {
    "pt-BR": "pt-BR",
    "en": "en"
  },
  names: {
    "pt-BR": "Português",
    "en": "English"
  },
  fallback: {
    "pt-BR": "en"
  }
};

console.log('i18nConfig:', JSON.stringify(i18nConfig, null, 2));
console.log('Locales object:', i18nConfig.locales);
console.log('Default locale:', i18nConfig.defaultLocale);
console.log('Default locale in locales object:', i18nConfig.defaultLocale in i18nConfig.locales);

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    react(), 
    i18n(i18nConfig),
    sitemap({
      filter: filterSitemapByDefaultLocale({ defaultLocale: "pt-BR" })
    })
  ],
});