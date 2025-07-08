import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const THESIS_API = `${import.meta.env.VITE_BASE_URL || "http://localhost:5000"}/api/assign`;

export const assignApi = createApi({
  reducerPath: "assignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: THESIS_API,
    credentials: "include",
  }),
  tagTypes: ["Assignment"],

  endpoints: (builder) => ({
    // Create a new assignment (POST /assignments)
    createAssignment: builder.mutation({
      query: (body) => ({
        url: "/assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assignment"],
    }),

    // Get assignment by thesisId (GET /assignments/thesis/:thesisId)
    getAssignmentByThesis: builder.query({
      query: (thesisId) => `/assignments/thesis/${thesisId}`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),

    // Add note to assignment (PATCH /assignments/:id/note)
    addNote: builder.mutation({
      query: ({ id, message, userId }) => ({
        url: `/assignments/${id}/note`,
        method: "PATCH",
        body: { message, userId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }],
    }),

    // Update assignment status (PATCH /assignments/:id/status)
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/assignments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }],
    }),

    // Get all assignments (GET /assignments)
    getAllAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignment"],
    }),

    // Get assignments by reviewer (GET /assignments/reviewer/:reviewerId)
    getAssignmentsByReviewer: builder.query({
      query: (reviewerId) => `/assignments/reviewer/${reviewerId}`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),

    // Get assignments by sub-editor (GET /assignments/subeditor/:subEditorId)
    getAssignmentsBySubEditor: builder.query({
      query: (subEditorId) => `/assignments/subeditor/${subEditorId}`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentByThesisQuery,
  useAddNoteMutation,
  useUpdateStatusMutation,
  useGetAllAssignmentsQuery,
  useGetAssignmentsByReviewerQuery,
  useGetAssignmentsBySubEditorQuery,
} = assignApi;
