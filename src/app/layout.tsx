import { i18n } from "@/i18n-config";
import { Locale } from "next/dist/compiled/@vercel/og/satori";
import Script from "next/script";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  const locales = i18n.locales.map((locale) => ({ lang: locale }));

  return locales;
}
