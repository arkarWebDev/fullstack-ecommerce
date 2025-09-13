import type { Product, ProductMeta } from "@/types/product";
import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrivals: builder.query({
      query: () => "/products/new",
      providesTags: ["Product"],
    }),
    getFeatured: builder.query({
      query: () => "/products/featured",
      providesTags: ["Product"],
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: ({
        sizes,
        colors,
        minPrice,
        maxPrice,
        sortBy,
        keyword,
        category,
      }) => {
        const params = new URLSearchParams();

        if (sizes && sizes.length) {
          sizes.forEach((size: string) => params.append("size", size));
        }

        if (colors && colors.length) {
          colors.forEach((color: string) => params.append("color", color));
        }

        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);

        return `/products?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => "filters/meta",
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; formData: FormData }
    >({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<string, string>({
      query: (data) => ({
        url: `/products/${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
  useGetProductDetailQuery,
  useGetProductsQuery,
  useGetProductsMetaQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
