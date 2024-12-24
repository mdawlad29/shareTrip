
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/docs",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<void, Error>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productService;