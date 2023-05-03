import { IMenuResponse } from "@/services/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_BASE_URL }),
  endpoints: (builder) => ({
    getMenu: builder.query<IMenuResponse, { lang: string }>({
      query: ({ lang }) => ({
        url: URLS.MENU,
        headers: { "Accept-Language": lang },
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

export const { useGetMenuQuery, useAddSubscriptionMutation } = apiSlice;
