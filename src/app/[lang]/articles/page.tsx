import { Locale, i18n } from "@/i18n-config";

import ArticlesList from "@/components/articles/ArticlesList";
import CardArticle from "@/components/articles/CardArticle";

import { IArticle } from "@/styles/types";

export const revalidate = 600;

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Articles({
  params,
}: {
  params: { lang: Locale };
}) {
  const articlesData = await fetch(process.env.API_BASE_URL + "/articles/", {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": params.lang,
    },
  });
  const articles: IArticle[] = await articlesData.json();

  return (
    <ArticlesList articles={articles}>
      {articles.map((article) => (
        /* @ts-expect-error Async Server Component */
        <CardArticle key={article.slug} article={article} />
      ))}
    </ArticlesList>
  );
}
