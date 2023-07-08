import { Metadata } from "next";
import { Suspense } from "react";

import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

import {
  getAllArticles,
  getArticle,
  getComments,
  getFeatures,
} from "@/services/api-client";

import ArticleDetail from "@/components/article/ArticleDetail";
import Spinner from "@/components/utils/Spinner";
import ReadMoreArticles from "@/components/read-more-articles/ReadMoreArticles";
import ButtonBack from "@/components/button-back/ButtonBack";
import CommentsList from "@/components/comments/CommentsList";

interface ParamsProps {
  slug: string;
  lang: Locale;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: ParamsProps;
}): Promise<Metadata> {
  const { lang, slug } = params;

  const article = await getArticle(slug, lang, { next: { revalidate: 600 } });

  return {
    // title: article.title,

    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.created_at,
      //authors: article.author.first_name,
    },
    twitter: {
      description: article.description,
    },
  };
}

export default async function Article({ params }: { params: ParamsProps }) {
  const { slug, lang } = params;

  const dictionary = await getDictionary(lang);

  const articleData = getArticle(slug, lang, { next: { revalidate: 600 } });
  const articlesData = getAllArticles(lang);
  const featuresData = getFeatures();
  const commentsData = getComments();

  const [article, articles, features] = await Promise.all([
    articleData,
    articlesData,
    featuresData,
    commentsData,
  ]);

  return (
    <>
      <ButtonBack dictionary={dictionary.back} />
      <Suspense fallback={<Spinner />}>
        {features.blog && (
          <ArticleDetail
            article={article}
            dictionary={dictionary}
            lang={lang}
          />
        )}
      </Suspense>

      {features.comments && <CommentsList dictionary={dictionary} />}
      <ReadMoreArticles articles={articles} dictionary={dictionary} />
    </>
  );
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  const slug = articles.map((article) => ({
    slug: article.slug,
  }));

  return slug;
}
