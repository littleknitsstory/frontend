import { baseUrl } from "@/services/constants";
import { IArticle } from "@/styles/types";
import { Locale, i18n } from "@/i18n-config";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 1;

interface Props {
  article: IArticle;
  params: {
    lang: Locale;
  };
}

export default async function CardArticle({ article }: Props) {
  // const articleData = await fetch(
  //   process.env.API_BASE_URL + "/articles/" + article.slug,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept-Language": params.lang,
  //     },
  //   }
  // );
  // const articleDetails = await articleData.json();

  return (
    <div>
      <Suspense fallback={<div>Loading..</div>}>
        <Link href={`articles/${article.slug}`}>Link</Link>
      </Suspense>

      <p>Title: {article.title}</p>
      <p>
        Author: {article.author?.first_name} {article.author?.last_name}
      </p>
      <p>{article.content}</p>
    </div>
  );
}

export async function generateStaticParams() {
  console.log(i18n.locales);
  return i18n.locales.map((locale) => ({ lang: locale }));
}
