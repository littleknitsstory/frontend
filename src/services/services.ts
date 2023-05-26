import { Locale } from "@/i18n-config";
import { Article, CommentsData, FeaturesFlags } from "./types";
import { ROUTES } from "./constants";

export const request = async (
  url: string,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  ...args: any
) => {
  try {
    const response = await fetch(url, { method, body, headers, ...args });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};

export async function getArticle(slug: string, lang: Locale) {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };
  const next = {
    revalidate: 60,
  };
  const res: Promise<Article> = await request(
    process.env.API_BASE_URL + `/${ROUTES.ARTICLES}/${slug}`,
    "GET",
    null,
    headers,
    next
  );
  return res;
}

export async function getAllArticles(lang: Locale = "en") {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };
  const next = {
    revalidate: 60,
  };
  const res: Promise<Article[]> = await request(
    process.env.API_BASE_URL + `/${ROUTES.ARTICLES}/`,
    "GET",
    null,
    headers,
    next
  );
  return res;
}

export async function getFeatures() {
  const next = {
    revalidate: 60,
  };
  const res: Promise<FeaturesFlags> = await request(
    process.env.API_BASE_URL + `/${ROUTES.FEATURES_FLAGS}/`,
    "GET",
    null,
    { "Content-Type": "application/json" },
    next
  );
  return res;
}
export async function getComments() {
  const next = {
    revalidate: 60,
  };
  const res: Promise<CommentsData[]> = await request(
    process.env.API_BASE_URL + `/${ROUTES.COMMENTS}/`,
    "GET",
    null,
    { "Content-Type": "application/json" },
    next
  );
  return res;
}
