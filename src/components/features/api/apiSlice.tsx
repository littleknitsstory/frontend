import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import types
import {
  IProductsResponse,
  IArticlesResponse,
  IMenuResponse,
  IArticle,
  IProductDetails,
  IReviewsResponse,
  ISignUp,
  ISignIn,
  IUserData,
} from "../../../app/types";

interface ILoginResponse {
  access: string;
  refresh: string;
}

interface QueryArgs {
  limit?: number;
  offset?: number;
  lang: string;
}

interface CategoriesResponse {
  title: string;
  slug: string;
}

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
  REFRESH_TOKEN = "/token/refresh/",
  SIGN_UP = "/sign-up/",
  SIGN_IN = "/sign-in/",
  PROFILE = "/profile/",
  COMMENTS = "/comments/",
  ORDER = "/orders/",
}

export const PICTURE_BASE_URL = "http://dev.backend.littleknitsstory.com:26363";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://dev.backend.littleknitsstory.com:26363/api/v1" }),
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
    addOrder: builder.mutation({
      query: (orderForm) => ({
        url: URLS.ORDER,
        method: "POST",
        body: orderForm,
      }),
    }),
    signUp: builder.mutation<ILoginResponse, { user: ISignUp; lang: string }>({
      query: ({ user, lang }) => ({
        url: URLS.SIGN_UP,
        method: "POST",
        body: user,
        headers: { "Accept-Language": lang },
      }),
    }),
    signIn: builder.mutation<ILoginResponse, { credentials: ISignIn; lang: string }>({
      query: ({ credentials, lang }) => ({
        url: URLS.SIGN_IN,
        method: "POST",
        body: credentials,
        headers: { "Accept-Language": lang },
      }),
    }),
    addComments: builder.mutation({
      query: (message: string) => ({
        url: URLS.COMMENTS,
        method: "POST",
        body: { text: message },
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens") || "{}")?.access,
        },
      }),
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: URLS.PROFILE,
        headers: { Authorization: "Bearer " + token },
      }),
    }),
    updateProfile: builder.mutation<IUserData[], { user: IUserData; token: string }>({
      query: ({ user, token }) => ({
        url: URLS.PROFILE + user.username + "/",
        method: "PUT",
        body: user,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
    }),
    refreshToken: builder.mutation({
      query: (token) => ({
        url: URLS.REFRESH_TOKEN,
        method: "POST",
        body: { refresh: token },
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
  useSignUpMutation,
  useSignInMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useAddCommentsMutation,
  useRefreshTokenMutation,
  useAddOrderMutation,
} = apiSlice;
