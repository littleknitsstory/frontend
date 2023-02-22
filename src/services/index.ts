import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PICTURE_BASE_URL } from "../api";
import { IProductsResponse } from "../api/models";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://dev.backend.littleknitsstory.com:26363",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      IProductsResponse,
      {
        offset: number;
        limit: number;
      }
    >({
      query: ({ offset, limit }) =>
        `api/v1/products/?offset=${offset}&limit=${limit}`,
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
  }),
});

export const { useGetProductsQuery } = productsAPI;
