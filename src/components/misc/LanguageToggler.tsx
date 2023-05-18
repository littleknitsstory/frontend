"use client";
import { i18n } from "@/i18n-config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageToggler() {
  const pathname = usePathname();
  const locales = i18n.locales;

  const togglerText = {
    en: "English",
    ru: "Русский",
  };

  const index = locales.findIndex((locale) =>
    pathname.startsWith(`/${locale}`)
  );

  function toggleLanguages() {
    let nextLanguage: string;

    if (index >= locales.length - 1) {
      nextLanguage = `${pathname.replace(locales[index], locales[0])}`;
    } else {
      nextLanguage = `${pathname.replace(locales[index], locales[index + 1])}`;
    }

    return nextLanguage;
  }

  return (
    <Link href={toggleLanguages()} className="link">
      {togglerText[locales[index]]}
    </Link>
  );
}
