import { notFound } from "next/navigation";
import ArticleDetail from "@/components/article/ArticleDetail";
import { getDictionary } from "@/get-dictionaries";
import { Locale, i18n } from "@/i18n-config";
import { Article, CommentsData, FeaturesFlags } from "@/services/types";
import {
  getAllArticles,
  getArticle,
  getComments,
  getFeatures,
} from "@/services/services";
import { Suspense } from "react";
import Spinner from "@/components/utils/Spinner";
import ReadMoreArticles from "@/components/read-more-articles/ReadMoreArticles";
import ButtonBack from "@/components/button-back/ButtonBack";
import CommentsList from "@/components/comments/CommentsList";

interface paramsProps {
  slug: string;
  lang: Locale;
}

export default async function Article({ params }: { params: paramsProps }) {
  const { slug, lang } = params;

  const articleData = getArticle(slug, lang);

  const articlesData = getAllArticles(lang);

  const featuresData = getFeatures();

  const commentsData = getComments();

  const dictionary = await getDictionary(lang);

  const [article, articles, features, comments] = await Promise.all([
    articleData,
    articlesData,
    featuresData,
    commentsData,
  ]);

  return (
    <>
      <ButtonBack back={dictionary.back} />
      <Suspense fallback={<Spinner />}>
        {features.blog && (
          <ArticleDetail
            article={article}
            dictionary={dictionary}
            lang={lang}
          />
        )}

        <CommentsList
          comments={comments}
          features={features}
          dictionary={dictionary}
        />
        <ReadMoreArticles articles={articles} dictionary={dictionary} />
      </Suspense>
    </>
  );
}

export async function generateStaticParams() {
  const articles: Article[] = await getAllArticles();

  const slug = articles.map((article) => ({
    slug: article.slug,
  }));

  return slug;
}
