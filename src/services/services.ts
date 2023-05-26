import { ENDPOINTS } from "./constants";
import { Article, CommentsData, FeaturesFlags } from "./types";
import { Locale } from "@/i18n-config";

// fetch wrapper to config base parameters
async function fetcher(endpoint: string, options?: RequestInit, lang?: Locale) {
  const URL = process.env.API_BASE_URL + endpoint;
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang ?? "en",
  };

  try {
    const response = await fetch(URL, { ...options, headers });
    if (!response.ok) {
      throw new Error(`Could not fetch. ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw Error("Something went wrong");
  }
}

export async function getArticle(
  slug: string,
  lang: Locale = "en",
  options?: RequestInit
) {
  const endpoint = ENDPOINTS.ARTICLES + slug;
  const response: Promise<Article> = await fetcher(endpoint, options, lang);

  return response;
}

export async function getAllArticles(
  lang: Locale = "en",
  options?: RequestInit
) {
  const response: Promise<Article[]> = await fetcher(
    ENDPOINTS.ARTICLES,
    options,
    lang
  );

  return response;
}

export async function getFeatures(options?: RequestInit) {
  const response: Promise<FeaturesFlags> = await fetcher(
    ENDPOINTS.FEATURES,
    options
  );

  return response;
}

export async function getComments(options?: RequestInit) {
  const response: Promise<CommentsData[]> = await fetcher(
    ENDPOINTS.COMMENTS,
    options
  );
  return response;
}
