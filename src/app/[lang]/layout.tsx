import { Locale } from "@/i18n-config";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Menu from "@/components/menu/Menu";

import { getFeatures } from "@/services/services";
import { getDictionary } from "@/get-dictionaries";

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
      // url: "https://littleknitsstory.com/",
      // images: "icon.png",
    },
  };
}
export const revalidate = 1000;

export default async function GeneralLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const features = await getFeatures({ next: { revalidate: 60 } });

  return (
    <div className="container-lg min-vh-100 d-flex flex-column">
      <Header dictionary={dictionary.header} />
      {features.menu && <Menu />}
      {children}
      <Footer dictionary={dictionary.footer} />
    </div>
  );
}
