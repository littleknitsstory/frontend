import { notFound } from "next/navigation";
import ArticleDetail from "@/components/article/ArticleDetail";
import { getDictionary } from "@/get-dictionaries";
import { Locale, i18n } from "@/i18n-config";
import { IArticle, ICommentsData, IFeaturesFlags } from "@/styles/types";
import {
  getAllArticles,
  getArticle,
  getComments,
  getFeatures,
} from "@/services/services";
import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";

interface paramsProps {
  slug: string;
  lang: Locale;
}

export default async function Article({ params }: { params: paramsProps }) {
  const { slug, lang } = params;

  const article: IArticle = await getArticle(slug, lang);

  const articles: IArticle[] = await getAllArticles(lang);

  const features: IFeaturesFlags = await getFeatures();

  const comments: ICommentsData[] = await getComments();

  const dictionary = await getDictionary(lang);
  //Promise.All() ??? не типизированное значение на выходе
  return (
    <Suspense fallback={<Spinner />}>
      <ArticleDetail
        article={article}
        features={features}
        dictionary={dictionary}
        lang={lang}
        articles={articles}
        comments={comments}
      />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const articles: IArticle[] = await getAllArticles();

  const slug = articles.map((article) => ({
    slug: article.slug,
  }));
  const lang = i18n.locales.map((locale) => ({ lang: locale }));

  return [lang, slug];
}
