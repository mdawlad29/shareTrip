
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/docs",
  }),
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getProducts: builder.query<void, Error>({
      query: () => ({
        url: "/products",
        method: "GET",
        cache: "no-cache",
        keepUnusedDataFor: 0,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productService;