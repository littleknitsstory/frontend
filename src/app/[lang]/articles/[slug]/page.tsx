import ArticleDetail from "@/components/article/ArticleDetail";
import { getDictionary } from "@/get-dictionaries";
import { Locale, i18n } from "@/i18n-config";
import { IArticle, ICommentsData, IFeaturesFlags } from "@/styles/types";

interface paramsProps {
  slug: string;
  lang: Locale;
}

export default async function Article({ params }: { params: paramsProps }) {
  const { slug, lang } = params;

  const articleData = await fetch(
    process.env.API_BASE_URL + `/articles/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      next: {
        revalidate: 60,
      },
    }
  );
  const article: IArticle = await articleData.json();

  const articlesData = await fetch(process.env.API_BASE_URL + "/articles/", {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": params.lang,
    },
    next: {
      revalidate: 60,
    },
  });
  const articles: IArticle[] = await articlesData.json();

  const featuresData = await fetch(process.env.API_BASE_URL + "/features/", {
    next: { revalidate: 60 },
  });
  const features: IFeaturesFlags = await featuresData.json();

  const commentsData = await fetch(process.env.API_BASE_URL + "/comments/", {
    next: { revalidate: 60 },
  });
  const comments: ICommentsData[] = await commentsData.json();

  const dictionary = await getDictionary(lang);

  return (
    <ArticleDetail
      article={article}
      features={features}
      dictionary={dictionary}
      lang={lang}
      articles={articles}
      comments={comments}
    />
  );
}

export async function generateStaticParams() {
  const articlesData = await fetch(process.env.API_BASE_URL + "/articles/");
  const articles: IArticle[] = await articlesData.json();

  const slug = articles.map((article) => ({
    slug: article.slug,
  }));
  const lang = i18n.locales.map((locale) => ({ lang: locale }));

  return [lang, slug];
}
