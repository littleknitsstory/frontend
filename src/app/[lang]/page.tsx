import Script from "next/script";
import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <div>Homepage</div>
    </>
  );
}
