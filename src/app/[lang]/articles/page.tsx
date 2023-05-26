import { Locale } from "@/i18n-config";

import ArticlesList from "@/components/articles/ArticlesList";
import CardArticle from "@/components/articles/CardArticle";

import { getAllArticles } from "@/services/services";

export default async function Articles({
  params,
}: {
  params: { lang: Locale };
}) {
  const articles = await getAllArticles(params.lang);

  return (
    <ArticlesList articles={articles}>
      {articles.map((article) => (
        <CardArticle key={article.slug} article={article} lang={params.lang} />
      ))}
    </ArticlesList>
  );
}
