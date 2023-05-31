import { Locale } from "@/i18n-config";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import Menu from "@/components/menu/Menu";
import { getDictionary } from "@/get-dictionaries";
import { getFeatures } from "@/services/services";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";

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
