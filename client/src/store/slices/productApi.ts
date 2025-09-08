import type { Product, ProductMeta } from "@/types/product";
import { apiSlice } from "./api";
import type { ProductFormInputs } from "@/schema/product";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrivals: builder.query({
      query: () => "/products/new",
    }),
    getFeatured: builder.query({
      query: () => "/products/featured",
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id: string) => `/products/${id}`,
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
    }),
    getProductsMeta: builder.query<ProductMeta, string>({
      query: () => "filters/meta",
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
} = productApiSlice;
