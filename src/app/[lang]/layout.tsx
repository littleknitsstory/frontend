import { Locale, i18n } from "@/i18n-config";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Menu from "@/components/menu/Menu";

import { getFeatures } from "@/services/api-client";
import { getDictionary } from "@/get-dictionaries";
import { Montserrat } from "next/font/google";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return {
    title: "Little Knits Story",
    description: dictionary.header.title,
    openGraph: {
      title: "Little Knits Story",
      description: dictionary.header.title,
      type: "website",
      siteName: "Little Knits Story",

      // url: "https://littleknitsstory.com/",
      // images: "icon.png",
      icons: {
        icon: "icon.png",
      },
    },
    twitter: {
      title: "Little Knits Story",
      description: dictionary.header.title,
    },
  };
}

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const features = await getFeatures({ next: { revalidate: 600 } });

  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>
        <div className="container-lg min-vh-100 d-flex flex-column">
          <Header dictionary={dictionary.header} />
          {features.menu && <Menu />}
          {children}
          <Footer dictionary={dictionary.footer} />
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  const locales = i18n.locales.map((locale) => ({ lang: locale }));

  return locales;
}
