import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "http://localhost:5000/api/category/add", // Changed to local
        method: "POST",
        body: data,
      }),
    }),
    getShowCategory: builder.query({
      query: () => `http://localhost:5000/api/category/show`, // Changed to local
    }),
    getProductTypeCategory: builder.query({
      query: (type) => `http://localhost:5000/api/category/show/${type}`, // Changed to local
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetProductTypeCategoryQuery,
  useGetShowCategoryQuery,
} = categoryApi;
