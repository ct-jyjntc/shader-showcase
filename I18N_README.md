# Internationalization (i18n) Documentation

This project uses `next-intl` for internationalization support in Next.js 15 App Router.

## Supported Languages

- 🇺🇸 English (en) - Default
- 🇨🇳 Chinese (zh)
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr)

## Project Structure

```
project/
├── app/
│   ├── layout.tsx              # Root layout with locale detection
│   └── [locale]/               # Locale-specific routes
│       ├── layout.tsx          # Locale layout with NextIntlClientProvider
│       └── page.tsx            # Main page (localized)
├── components/
│   ├── header.tsx              # Header with navigation (localized)
│   ├── hero-content.tsx        # Hero content (localized)
│   ├── pulsing-circle.tsx      # Pulsing circle with text (localized)
│   └── language-switcher.tsx   # Language switcher dropdown
├── i18n/
│   ├── request.ts              # i18n request configuration
│   └── routing.ts              # Routing configuration with locales
├── messages/
│   ├── en.json                 # English translations
│   ├── zh.json                 # Chinese translations
│   ├── es.json                 # Spanish translations
│   └── fr.json                 # French translations
├── middleware.ts               # Locale detection middleware
└── next.config.mjs             # Next.js config with next-intl plugin
```

## Usage

### In Client Components

```tsx
"use client"

import { useTranslations } from "next-intl"

export default function MyComponent() {
  const t = useTranslations("namespace")
  
  return <h1>{t("title")}</h1>
}
```

### In Server Components

```tsx
import { getTranslations } from "next-intl/server"

export default async function MyServerComponent() {
  const t = await getTranslations("namespace")
  
  return <h1>{t("title")}</h1>
}
```

### Using the Language Switcher

The language switcher is automatically included in the header component. Users can click the language dropdown to switch between available languages.

### Navigation with Locales

```tsx
import { Link, useRouter } from "@/i18n/routing"

// Using Link
<Link href="/about">About</Link>

// Using Router
const router = useRouter()
router.push("/about")
```

## Adding a New Language

1. Create a new translation file in `messages/` (e.g., `de.json` for German)
2. Add translations following the existing structure
3. Update `i18n/routing.ts` to include the new locale:
   ```ts
   export const routing = {
     locales: ["en", "zh", "es", "fr", "de"],
     defaultLocale: "en",
   }
   ```
4. Update `components/language-switcher.tsx` to include the new language:
   ```ts
   const languages = [
     // ...existing languages
     { code: "de", name: "Deutsch", flag: "🇩🇪" },
   ]
   ```

## Translation File Structure

```json
{
  "metadata": {
    "title": "Page title",
    "description": "Page description"
  },
  "header": {
    "navigation": {
      "features": "Features",
      "pricing": "Pricing",
      "docs": "Docs"
    },
    "login": "Login"
  },
  "hero": {
    "badge": "Badge text",
    "heading": {
      "beautiful": "Beautiful",
      "shader": "Shader",
      "experiences": "Experiences"
    },
    "description": "Description text",
    "buttons": {
      "pricing": "Pricing",
      "getStarted": "Get Started"
    }
  },
  "pulsing": {
    "text": "Text for rotating circle"
  }
}
```

## URL Structure

The application uses locale prefixes in URLs:
- English (default): `/en/`
- Chinese: `/zh/`
- Spanish: `/es/`
- French: `/fr/`

The middleware automatically detects and redirects users to the appropriate locale based on their browser preferences.

## Features

- ✅ Automatic locale detection from browser settings
- ✅ Locale switching without page reload
- ✅ SEO-friendly URLs with locale prefixes
- ✅ Type-safe translations
- ✅ Static generation support for all locales
- ✅ Server and client component support
- ✅ Beautiful language switcher UI

## Configuration Files

### `middleware.ts`
Handles locale detection and routing. Matches all routes except API routes and static files.

### `i18n/request.ts`
Configures how translations are loaded for each locale.

### `i18n/routing.ts`
Defines available locales, default locale, and provides type-safe navigation utilities.

### `next.config.mjs`
Integrates next-intl plugin for build-time optimizations.

## Best Practices

1. Always use the `useTranslations` hook or `getTranslations` function instead of hardcoding text
2. Keep translation keys organized by feature/component
3. Use nested objects in translation files for better organization
4. Test all translations after adding new content
5. Use the language switcher component for consistent UX across the app

## Resources

- [next-intl Documentation](https://next-intl.dev)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
