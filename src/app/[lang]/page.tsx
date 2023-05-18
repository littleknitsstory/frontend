import { redirect } from "next/navigation";

import { Locale } from "@/i18n-config";

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params }: Props) {
  // redirect("/articles");

  return (
    <>
      <div>Homepage</div>
    </>
  );
}
