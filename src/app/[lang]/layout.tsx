import { Locale, i18n } from "@/i18n-config";
import { Montserrat } from "next/font/google";

import "@/styles/globals.css";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Little Knits Story",
  description: "Blog and shop about knitting",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
