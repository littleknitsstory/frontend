import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IFeaturesResponse {
  account: boolean;
  blog: boolean;
  comments: boolean;
  contacts: boolean;
  course: boolean;
  feed: boolean;
  menu: boolean;
  reviews: boolean;
  slider: boolean;
}

export const featuresSlice = createApi({
  reducerPath: "features",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/",
  }),
  endpoints: (builder) => ({
    getFeatures: builder.query<IFeaturesResponse, void>({
      query: () => "features",
    }),
  }),
});

export const { useGetFeaturesQuery } = featuresSlice;
