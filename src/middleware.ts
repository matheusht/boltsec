import { defineMiddleware } from "astro:middleware";
import { getLocaleUrl } from "astro-i18n-aut";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url } = context;
  const pathname = url.pathname;

  // Skip if this is an asset or API route
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return next();
  }

  // Check for saved language preference
  const savedLang = request.headers.get('cookie')
    ?.split('; ')
    .find(row => row.startsWith('preferred-language='))
    ?.split('=')[1];

  if (savedLang && ['pt-BR', 'en'].includes(savedLang)) {
    // User has a saved preference, respect it
    return next();
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLang = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => lang.startsWith('en'));

    if (preferredLang && !pathname.startsWith('/en/')) {
      // Redirect to English version
      const englishPath = getLocaleUrl(pathname, 'en');
      return context.redirect(englishPath);
    }
  }

  return next();
}); 