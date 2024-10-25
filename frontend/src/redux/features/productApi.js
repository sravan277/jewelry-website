import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `http://localhost:5000/api/product/all`, // Changed to local
      providesTags: ['Products'],
    }),
    getProductType: builder.query({
      query: ({ type, query }) => `http://localhost:5000/api/product/${type}?${query}`, // Changed to local
      providesTags: ['ProductType'],
    }),
    getOfferProducts: builder.query({
      query: (type) => `http://localhost:5000/api/product/offer?type=${type}`, // Changed to local
      providesTags: ['OfferProducts'],
    }),
    getPopularProductByType: builder.query({
      query: (type) => `http://localhost:5000/api/product/popular/${type}`, // Changed to local
      providesTags: ['PopularProducts'],
    }),
    getTopRatedProducts: builder.query({
      query: () => `http://localhost:5000/api/product/top-rated`, // Changed to local
      providesTags: ['TopRatedProducts'],
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `http://localhost:5000/api/product/single-product/${id}`, // Changed to local
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `http://localhost:5000/api/product/related-product/${id}`, // Changed to local
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
