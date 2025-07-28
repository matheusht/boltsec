"use client";

import { useState, useEffect } from "react";
import { getLocaleUrl } from "astro-i18n-aut";

interface LanguageSwitcherProps {
  autoDetect?: boolean;
  rememberPreference?: boolean;
  className?: string;
}

const COOKIE_NAME = "preferred-language";
const AUTO_REDIRECT_COOKIE = "auto-redirect-complete";

export default function LanguageSwitcher({ 
  autoDetect = true, 
  rememberPreference = true,
  className = ""
}: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useState("pt-BR");
  const [hasAutoRedirected, setHasAutoRedirected] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const savedLang = document.cookie
      .split("; ")
      .find(row => row.startsWith(COOKIE_NAME))
      ?.split("=")[1];

    if (savedLang && ["pt-BR", "en"].includes(savedLang)) {
      setCurrentLocale(savedLang);
      return;
    }

    // Auto-detect browser language
    if (autoDetect) {
      const browserLang = navigator.language || navigator.languages?.[0] || "pt-BR";
      
      // Check if we've already auto-redirected
      const hasRedirected = document.cookie
        .split("; ")
        .find(row => row.startsWith(AUTO_REDIRECT_COOKIE));

      if (!hasRedirected && browserLang.startsWith("en")) {
        // Redirect to English version
        const currentPath = window.location.pathname;
        const englishPath = getLocaleUrl(currentPath, "en");
        window.location.href = englishPath;
        setHasAutoRedirected(true);
        
        // Set cookie to prevent future redirects
        document.cookie = `${AUTO_REDIRECT_COOKIE}=true; path=/; max-age=3600`;
      }
    }
  }, [autoDetect]);

  const handleLanguageChange = (locale: string) => {
    const currentPath = window.location.pathname;
    const newPath = getLocaleUrl(currentPath, locale);
    
    if (rememberPreference) {
      document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000`; // 1 year
    }
    
    window.location.href = newPath;
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => handleLanguageChange("pt-BR")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLocale === "pt-BR"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        PT
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          currentLocale === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        EN
      </button>
    </div>
  );
} 