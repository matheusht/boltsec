# Internationalization (i18n) Setup

This project uses `astro-i18n-aut` for internationalization with Portuguese (Brazil) as the default language and English as secondary.

## Configuration

### Astro Config (`astro.config.mjs`)
The i18n integration is configured with:
- **Default locale**: `pt-br` (Portuguese Brazil)
- **Secondary locale**: `en` (English)
- **URL structure**: 
  - Portuguese: `/` (default, no prefix)
  - English: `/en/` (with prefix)

### Translation Files

Translation files are located in `src/i18n/`:
- `pt-br.json` - Portuguese (Brazil) translations
- `en.json` - English translations

## Automatic Language Detection

The project includes multiple levels of automatic language detection:

### 1. Server-Side Detection (`src/middleware.ts`)
- Checks `Accept-Language` header from browser
- Respects saved cookie preferences
- Automatically redirects users to their preferred language
- Only runs on first visit to avoid redirect loops

### 2. Client-Side Detection (`LanguageSwitcher.tsx`)
- Detects browser language preferences
- Remembers user choices in cookies
- Provides smooth language switching

### 3. Configuration Options

```tsx
// In your components
<LanguageSwitcher 
  autoDetect={true}           // Enable automatic detection
  rememberPreference={true}   // Save user preferences
  className="your-classes"    // Custom styling
/>
```

## How to Use Translations

### 1. In Astro Pages

```astro
---
import { getTranslation, getLocaleFromURL } from "../lib/i18n";

// Get current locale from URL
const locale = getLocaleFromURL(Astro.url);

// Get specific translations
const title = await getTranslation(locale, "home.hero.title");
const subtitle = await getTranslation(locale, "home.hero.subtitle");
---

<h1>{title}</h1>
<p>{subtitle}</p>
```

### 2. In React Components

```tsx
"use client";

import { useState, useEffect } from "react";
import { getTranslation } from "../lib/i18n";

const MyComponent = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const loadTranslation = async () => {
      const locale = "pt-br"; // or get from context/URL
      const translatedTitle = await getTranslation(locale, "home.hero.title");
      setTitle(translatedTitle);
    };
    
    loadTranslation();
  }, []);

  return <h1>{title}</h1>;
};
```

### 3. Language Switching

The `LanguageSwitcher` component is included in the header and allows users to switch between languages:

```astro
---
import LanguageSwitcher from "../components/LanguageSwitcher";
---

<LanguageSwitcher client:load />
```

## Automatic Detection Features

### Browser Language Detection
- Automatically detects user's browser language
- Redirects English-speaking users to `/en/` routes
- Keeps Portuguese-speaking users on default routes

### Cookie-Based Preferences
- Saves user's language choice in cookies
- Remembers preferences across sessions
- Respects user's manual language selection

### Server-Side Redirects
- Handles language detection before page loads
- Prevents unnecessary client-side redirects
- Improves performance and SEO

## Adding New Translations

### 1. Add to Translation Files

Add new keys to both `src/i18n/pt-br.json` and `src/i18n/en.json`:

```json
{
  "navigation": {
    "home": "Início",
    "about": "Sobre Nós"
  },
  "newSection": {
    "title": "Novo Título",
    "description": "Nova descrição"
  }
}
```

### 2. Use in Components

```astro
---
const newTitle = await getTranslation(locale, "newSection.title");
const newDesc = await getTranslation(locale, "newSection.description");
---

<h2>{newTitle}</h2>
<p>{newDesc}</p>
```

## URL Structure

- **Portuguese (default)**: `https://yoursite.com/`
- **English**: `https://yoursite.com/en/`
- **Portuguese pages**: `https://yoursite.com/about-us`
- **English pages**: `https://yoursite.com/en/about-us`

## Available Utility Functions

### `getLocaleFromURL(url: URL): string`
Gets the current locale from the URL.

### `getLocaleUrlForPath(path: string, locale: string): string`
Generates a localized URL for a given path and locale.

### `getTranslation(locale: string, key: string): Promise<string>`
Gets a translation for a specific key and locale.

### `getTranslations(locale: string): Promise<Record<string, any>>`
Gets all translations for a specific locale.

## Example Pages

- `/example` - Demonstrates translation usage
- `/en/example` - English version of the example page

## Testing

1. Start the development server: `pnpm dev`
2. Visit `http://localhost:4321/example` (Portuguese)
3. Visit `http://localhost:4321/en/example` (English)
4. Use the language switcher in the header to test switching
5. Test automatic detection by changing browser language settings

## Automatic Detection Testing

### Test Browser Language Detection:
1. Change your browser language to English
2. Visit `http://localhost:4321/` 
3. Should automatically redirect to `http://localhost:4321/en/`

### Test Cookie Preferences:
1. Switch language using the switcher
2. Refresh the page
3. Should stay on the selected language

### Test Server-Side Detection:
1. Clear cookies
2. Set browser language to English
3. Visit any page - should redirect to English version

## Best Practices

1. **Always use translation keys** instead of hardcoded text
2. **Keep translation keys organized** by section (navigation, home, about, etc.)
3. **Use nested keys** for better organization (e.g., `home.hero.title`)
4. **Test both languages** to ensure all content is translated
5. **Use the language switcher** to verify URL changes work correctly
6. **Test automatic detection** with different browser language settings
7. **Respect user preferences** - don't override manual language selections 