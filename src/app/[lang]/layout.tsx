import Script from "next/script";
import { Montserrat } from "next/font/google";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return {
    title: "Little Knits Story",
    description: dictionary.header.title,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>
        <div className="container-lg min-vh-100 d-flex flex-column">
          <Header dictionary={dictionary.header} />
          {children}
          <Footer />
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
        </div>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
