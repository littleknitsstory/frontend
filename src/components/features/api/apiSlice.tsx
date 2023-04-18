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
  CommentsData,
} from "../../../app/types";
import { COMMENTS_PER_PAGE } from "../../../pages/Blog/Post";

interface IFeaturesFlags {
  account: boolean;
  blog: boolean;
  comments: boolean;
  contacts: boolean;
  course: boolean;
  feed: boolean;
  menu: boolean;
  reviews: boolean;
  shop: boolean;
  slider: boolean;
}

interface CommentsResponse {
  count: number;
  next: number;
  previous: number;
  results: CommentsData[];
}

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

export const PICTURE_BASE_URL = "http://dev.backend.littleknitsstory.com:26363";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  tagTypes: ["user", "Comments"],
  endpoints: (builder) => ({
    getFeatures: builder.query<IFeaturesFlags, void>({
      query: () => URLS.FEATURES_FLAGS,
    }),
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
    getComments: builder.query<CommentsResponse, { offset: number }>({
      query: ({ offset }) => ({
        url: URLS.COMMENTS + `?offset=${offset}&limit=${COMMENTS_PER_PAGE}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [...result.results.map(({ id }) => ({ type: "Comments" as const, id })), "Comments"]
          : ["Comments"],
    }),
    addComment: builder.mutation({
      query: (message: string) => ({
        url: URLS.COMMENTS,
        method: "POST",
        body: { text: message },
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens") || "{}")?.access,
        },
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, lang }: { postId: number; lang: string }) => ({
        url: URLS.COMMENTS + postId,
        method: "DELETE",
        headers: {
          "Accept-Language": lang,
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens") || "{}")?.access,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Comments", id: arg.postId }],
    }),

    getAllUsers: builder.query<IUserData[], string>({
      query: (token) => ({
        url: URLS.PROFILE,
        headers: { Authorization: "Bearer " + token },
      }),
    }),
    getUser: builder.query<IUserData, { token: string; username: string }>({
      query: ({ token, username }) => ({
        url: URLS.PROFILE + username + "/",
        headers: { Authorization: "Bearer " + token },
      }),
      providesTags: (result, error, arg) => [{ type: "user", id: arg.username }],
    }),
    updateUser: builder.mutation<IUserData, { user: IUserData; token: string }>({
      query: ({ user, token }) => ({
        url: URLS.PROFILE + user.username + "/",
        method: "PUT",
        body: user,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["user"],
    }),
    refreshToken: builder.mutation({
      query: (token) => ({
        url: URLS.REFRESH_TOKEN,
        method: "POST",
        body: { refresh: token },
      }),
    }),
    logout: builder.mutation({
      query: (tokens) => ({
        url: URLS.LOGOUT,
        method: "POST",
        body: { refresh: tokens.refresh },
        headers: {
          Authorization: "Bearer " + tokens.access,
        },
      }),
    }),
    addReaction: builder.mutation({
      query: ({ reaction, articleId }: { reaction: string; articleId: number }) => ({
        url: URLS.REACTIONS,
        method: "POST",
        body: { reaction: "SMILING" },
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("tokens") || "{}")?.access,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetFeaturesQuery,
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
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useRefreshTokenMutation,
  useAddOrderMutation,
  useLogoutMutation,
  useGetCommentsQuery,
  useAddReactionMutation,
} = apiSlice;
