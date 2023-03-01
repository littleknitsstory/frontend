import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IProductsResponse,
  IProductDetails,
  IArticle,
  IArticlesResponse,
} from "../api/models";

enum URLS {
  PRODUCTS = "api/v1/products/",
  CONTACTS = "api/v1/contacts/",
  MENU = "api/v1/menu/",
  SUBSCRIBE = "api/v1/subscribe/",
  ARTICLES = "/api/v1/posts/",
}

const PICTURE_BASE_URL = "http://dev.backend.littleknitsstory.com:26363";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dev.backend.littleknitsstory.com:26363",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      IProductsResponse,
      {
        offset?: number;
        limit?: number;
      }
    >({
      query: ({ offset = 0, limit = 0 }) => {
        return {
          url: `${URLS.PRODUCTS}?offset=${offset}&limit=${limit}`,
        };
      },

      transformResponse: (response: IProductsResponse) => {
        return {
          ...response,
          results: response.results.map((item) => ({
            ...item,
            image_preview: `${PICTURE_BASE_URL}${item.image_preview}`,
          })),
        };
      },
    }),
    getProductDetails: builder.query<
      IProductDetails,
      {
        slug: string | void;
      }
    >({
      query: ({ slug }) => ({
        url: `${URLS.PRODUCTS}${slug}`,
      }),

      transformResponse: (response: IProductDetails) => {
        return {
          ...response,
          image_preview: `${PICTURE_BASE_URL}${response.image_preview}`,
        } as IProductDetails;
      },
    }),
    getArticles: builder.query<
      IArticlesResponse,
      {
        offset?: number;
        limit?: number;
      }
    >({
      query: ({ offset = 0, limit = 0 }) => {
        return {
          url: `${URLS.ARTICLES}?offset=${offset}&limit=${limit}`,
        };
      },

      transformResponse: (response: IArticlesResponse) => {
        return {
          ...response,
          results: response.results.map((item) => ({
            ...item,
            image_preview: `${PICTURE_BASE_URL}${item.image_preview}`,
          })),
        };
      },
    }),
    getArticleDetails: builder.query<
      IArticle,
      {
        slug: string | void;
      }
    >({
      query: ({ slug }) => ({
        url: `${URLS.ARTICLES}${slug}`,
      }),

      transformResponse: (response: IArticle) => {
        return {
          ...response,
          image_preview: `${PICTURE_BASE_URL}${response.image_preview}`,
        } as IArticle;
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetArticlesQuery,
  useGetArticleDetailsQuery,
} = apiSlice;
