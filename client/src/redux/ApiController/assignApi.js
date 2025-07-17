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
      query: ({ thesisId, comment, userId }) => ({
        url: `/assignments/${thesisId}/note`,
        method: "PATCH",
        body: { comment, userId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }],
    }),

     // Add note to assignment (PATCH /assignments/:id/note)
    addNoteAndAssignReviewer: builder.mutation({
      query: ({ thesisId, comment, assignedReviewer }) => ({
        url: `/assignments/${thesisId}/note_and_assign`,
        method: "PATCH",
        body: { comment, assignedReviewer },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }],
    }),


    AcceptAndAdmin: builder.mutation({
      query: ({ thesisId, comment, assignedadmin }) => ({
        url: `/assignments/${thesisId}/accept`,
        method: "PATCH",
        body: { comment, assignedadmin },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Assignment", id }],
    }),


    // Update assignment status (PATCH /assignments/:id/status)
    updateStatus: builder.mutation({
      query: ({ thesisId, status }) => ({
        url: `/assignments/${thesisId}/status`,
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

     // Get assignments by sub-editor (GET /assignments/subeditor/:subEditorId)
    getAssignmentsByReasecher: builder.query({
      query: () => `/assignments/reacher`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useGetAssignmentByThesisQuery,
  useAddNoteAndAssignReviewerMutation,
  useAcceptAndAdminMutation,
  useAddNoteMutation,
  useUpdateStatusMutation,
  useGetAllAssignmentsQuery,
  useGetAssignmentsByReviewerQuery,
  useGetAssignmentsBySubEditorQuery,

  useGetAssignmentsByReasecherQuery
} = assignApi;
