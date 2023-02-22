import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProductsResponse } from "../api/models";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dev.backend.littleknitsstory.com:26363",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProductsResponse, void>({
      query: () => "api/v1/products/",
    }),
  }),
});

export const { useGetProductsQuery } = productsAPI;
