import { Locale } from "@/i18n-config";
import { getAllArticles } from "@/services/api-client";

import CardArticle from "@/components/articles/CardArticle";

export default async function Articles({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const articles = await getAllArticles(lang);

  return (
    <div className="my-5">
      {articles.map((article) => (
        <>
          <CardArticle key={article.slug} article={article} lang={lang} />
          <hr />
        </>
      ))}
    </div>
  );
}
