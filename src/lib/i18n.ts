import { getLocale, getLocaleUrl } from "astro-i18n-aut";

export function getLocaleFromURL(url: URL): string {
  return getLocale(url.pathname);
}

export function getPathWithoutLocale(pathname: string): string {
  // Remove locale prefix if present
  if (pathname.startsWith('/en/')) {
    return pathname.replace('/en/', '/');
  }
  return pathname;
}

export function getLocaleUrlForPath(path: string, locale: string): string {
  return getLocaleUrl(path, locale);
}

// Helper function to get translation from JSON files
export async function getTranslation(locale: string, key: string): Promise<string> {
  try {
    const translations = await import(`../i18n/${locale}.json`);
    return key.split('.').reduce((obj, k) => obj?.[k], translations.default) || key;
  } catch (error) {
    console.warn(`Translation not found for key: ${key} in locale: ${locale}`);
    return key;
  }
}

// Helper function to get all translations for a locale
export async function getTranslations(locale: string): Promise<Record<string, any>> {
  try {
    const translations = await import(`../i18n/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Translations not found for locale: ${locale}`);
    return {};
  }
} 