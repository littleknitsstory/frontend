import { IArticle, IArticlesResponse, IFeaturesFlags } from "../types";

export enum URLS {
  PRODUCTS = "/products/",
  CONTACTS = "/contacts/",
  MENU = "/menu/",
  SUBSCRIBE = "/subscribe/",
  ARTICLES = "/articles/",
  REVIEWS = "/reviews/",
  CATEGORIES = "/categories/",
  REFRESH_TOKEN = "/token/refresh/",
  SIGN_UP = "/sign-up/",
  SIGN_IN = "/sign-in/",
  PROFILE = "/profile/",
  COMMENTS = "/comments/",
  ORDER = "/orders/",
  FEATURES_FLAGS = "/features/",
  LOGOUT = "/sign-out/",
  REACTIONS = "/reactions/",
}

const BASE_URL = process.env.API_BASE_URL;

export const getArticles = async (locale: string): Promise<IArticle[]> => {
  /* Temporary add "limit=200" to fetch all articles -> remove after API will change */
  const response = await fetch(BASE_URL + URLS.ARTICLES + "?limit=200", {
    headers: {
      "Accept-Language": locale,
    },
  });
  const data: IArticlesResponse = await response.json();

  const articles = data.results;
  return articles;
};

export const getFeaturesFlags = async (): Promise<IFeaturesFlags> => {
  const response = await fetch(BASE_URL + URLS.FEATURES_FLAGS);

  return response.json();
};

export const getArticleDetails = async (slug: string, locale: string): Promise<IArticle> => {
  const response = await fetch(BASE_URL + URLS.ARTICLES + slug, {
    headers: {
      "Accept-Language": locale,
    },
  });

  return response.json();
};
