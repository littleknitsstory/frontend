import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import types
import {
  IProductsResponse,
  IArticlesResponse,
  IMenuResponse,
  IArticle,
  IProductDetails,
  IReviewsResponse,
} from "../../../app/types";

// creating "offset / limit" query string
const getQueryString = (limit?: number, offset?: number): string => {
  let queryString = "";
  if (limit) queryString = `?limit=${limit}`;
  if (offset) queryString = `?offset=${offset}`;
  if (limit && offset) queryString = `?limit=${limit}&offset=${offset}`;

  return queryString;
};

enum URLS {
  PRODUCTS = "/products/",
  CONTACTS = "/contacts/",
  MENU = "/menu/",
  SUBSCRIBE = "/subscribe/",
  ARTICLES = "/posts/",
  REVIEWS = "/reviews/",
  CATEGORIES = "/categories/",
}

export const PICTURE_BASE_URL = "http://dev.backend.littleknitsstory.com:26363";

// types
interface QueryArgs {
  limit?: number;
  offset?: number;
  lang: string;
}

interface CategoriesResponse {
  title: string;
  slug: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getMenu: builder.query<IMenuResponse, { lang: string }>({
      query: ({ lang }) => ({
        url: URLS.MENU,
        headers: { "Accept-Language": lang },
      }),
    }),
    getProducts: builder.query<IProductsResponse, QueryArgs>({
      query: ({ limit, offset, lang }) => ({
        url: URLS.PRODUCTS + getQueryString(limit, offset),
        headers: { "Accept-Language": lang },
      }),
    }),
    getProduct: builder.query<IProductDetails, { slug: string | void; lang: string }>({
      query: ({ slug, lang }) => ({
        url: URLS.PRODUCTS + slug + "/",
        headers: { "Accept-Language": lang },
      }),
    }),
    getArticles: builder.query<IArticlesResponse, QueryArgs>({
      query: ({ limit, offset, lang }) => ({
        url: URLS.ARTICLES + getQueryString(limit, offset),
        headers: { "Accept-Language": lang },
      }),
    }),
    getArticle: builder.query<IArticle, { slug: string | void; lang: string }>({
      query: ({ slug, lang }) => ({
        url: URLS.ARTICLES + slug + "/",
        headers: { "Accept-Language": lang },
      }),
    }),
    getReviews: builder.query<IReviewsResponse[], void>({
      query: () => URLS.REVIEWS,
    }),
    getCategories: builder.query<CategoriesResponse[], void>({
      query: () => URLS.CATEGORIES,
    }),
    addContacts: builder.mutation({
      query: (contactForm) => ({
        url: URLS.CONTACTS,
        method: "POST",
        body: contactForm,
      }),
    }),
    addSubscription: builder.mutation({
      query: (email) => ({
        url: URLS.SUBSCRIBE,
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetArticlesQuery,
  useGetMenuQuery,
  useGetArticleQuery,
  useGetProductQuery,
  useGetReviewsQuery,
  useAddContactsMutation,
  useAddSubscriptionMutation,
} = apiSlice;
