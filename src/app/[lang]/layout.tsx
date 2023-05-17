import Script from "next/script";
import { Montserrat } from "next/font/google";

import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";

import Menu from "@/components/menu/Menu";
import { IFeaturesFlags } from "../../styles/types";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.scss";

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

export const revalidate = 1000;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; features: IFeaturesFlags };
}) {
  const dictionary = await getDictionary(params.lang);
  const featuresData = await fetch(process.env.API_BASE_URL + "/features/", {
    next: { revalidate: 60 },
  });
  const features: IFeaturesFlags = await featuresData.json();

  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>
        <div className="container-lg min-vh-100 d-flex flex-column">
          <Header dictionary={dictionary.header} />
          {/* @ts-expect-error Async Server Component */}
          {features.menu && <Menu features={features} />}
          {children}
          <Footer dictionary={dictionary.footer} />
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
        </div>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  const locales = i18n.locales.map((locale) => ({ lang: locale }));

  return locales;
}
