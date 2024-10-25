import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    getActiveBrands: builder.query({
      query: () => `https://localhost:5000/api/brand/active`
    }),
  }),
});

export const {
 useGetActiveBrandsQuery
} = brandApi;
