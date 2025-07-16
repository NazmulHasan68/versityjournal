import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for the thesis API
const THESIS_API = `${import.meta.env.VITE_BASE_URL || "http://localhost:5000"}/api/thesis`;

export const thesisApi = createApi({
  reducerPath: "thesisApi",
  baseQuery: fetchBaseQuery({
    baseUrl: THESIS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get all theses
    getAllTheses: builder.query({
      query: (query = "") => `?${query}`, 
    }),

    // Get thesis by ID
    getThesisById: builder.query({
      query: (id) => `/${id}`,
    }),

    // Create thesis (file upload)
    createThesis: builder.mutation({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
    }),

    // Update thesis
   updateThesis: builder.mutation({
    query: ({ id, formData }) => ({
      url: `/${id}`,
      method: "PUT",
      body: formData,
    }),
  }),

    // Delete thesis
    deleteThesis: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),

    // Increment view count
    incrementView: builder.mutation({
      query: (id) => ({
        url: `/view/${id}`,
        method: "PUT",
      }),
    }),


    updateThesisFormAdmin: builder.mutation({
      query: ({ id, update }) => ({
        url: `/thesis/${id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Theses"],
    }),


  }),
});

export const {
  useGetAllThesesQuery,
  useGetThesisByIdQuery,
  useCreateThesisMutation,
  useUpdateThesisMutation,
  useDeleteThesisMutation,
  useIncrementViewMutation,

  useUpdateThesisFormAdminMutation
} = thesisApi;
