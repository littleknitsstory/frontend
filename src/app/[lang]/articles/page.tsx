import { Locale, i18n } from "@/i18n-config";

import ArticlesList from "@/components/articles/ArticlesList";
import CardArticle from "@/components/articles/CardArticle";

import { Article } from "@/services/types";

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
    next: {
      revalidate: 60,
    },
  });
  const articles: Article[] = await articlesData.json();

  return (
    <ArticlesList articles={articles}>
      {articles.map((article) => (
        <CardArticle key={article.slug} article={article} lang={params.lang} />
      ))}
    </ArticlesList>
  );
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
