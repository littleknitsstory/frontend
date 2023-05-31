"use client";
import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageToggler() {
  const pathname = usePathname();
  const locales = i18n.locales;
  const currentLanguage = pathname.split("/")[1] as Locale;

  const togglerText = {
    en: "English",
    ru: "Русский",
  };

  function toggleLanguages() {
    let nextLanguage: string;

    const currentLanguageIndex = locales.findIndex(
      (locale) => locale === currentLanguage
    );

    if (currentLanguageIndex >= locales.length - 1) {
      nextLanguage = `${pathname.replace(currentLanguage, locales[0])}`;
    } else {
      nextLanguage = `${pathname.replace(
        currentLanguage,
        locales[currentLanguageIndex + 1]
      )}`;
    }

    return nextLanguage;
  }

  return (
    <Link replace href={toggleLanguages()} className="link">
      {togglerText[currentLanguage]}
    </Link>
  );
}
