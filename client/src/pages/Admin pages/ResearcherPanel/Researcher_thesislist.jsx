import React from "react";
import { useGetAssignmentsByReasecherQuery } from "@/redux/ApiController/assignApi";
import { Link } from "react-router-dom";

export default function Researcher_thesislist() {

  const { data, isLoading, isError, error } = useGetAssignmentsByReasecherQuery();


  if (isLoading) return <div className="p-6 text-gray-600">Loading your thesis assignments...</div>;
  if (isError) return <div className="p-6 text-red-600">Error: {error?.data?.message || "Something went wrong."}</div>;

  const allAssignments = data?.data || [];

  const assignments = allAssignments.filter(
    item => item.thesisId?.status === "submitted" 
  );

  return (
    <div className="p-8 max-w-6xl h-screen overflow-auto mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📄 Your Published Theses</h1>

      {assignments.length === 0 ? (
        <p className="text-gray-500">You have no published theses yet.</p>
      ) : (
        <div className="space-y-6">
          {assignments.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition-all"
            >
              <Link to={`${item.thesisId?._id}`} state={item} className="flex justify-between items-start">
                <div>
                  <h2 className="text-sm md:text-lg font-semibold text-blue-800 mb-1">
                    {item.thesisId?.title || "❌ Thesis Not Found"}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mb-1">
                    <strong>University:</strong> {item.thesisId?.university || "N/A"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${item.thesisId?.status === "published"
                          ? "bg-green-100 text-green-600"
                          : item.thesisId?.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.thesisId?.status}
                    </span>
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-xs md:text-sm text-gray-500">
                    <strong>Sub-Editor:</strong> {item.assignedSubEditor?.name || "N/A"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    <strong>Reviewers:</strong>{" "}
                    {Array.isArray(item.assignedReviewer)
                      ? item.assignedReviewer.length
                      : item.assignedReviewer
                      ? 1
                      : 0}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    <strong>Notes:</strong> {item.notes?.length || 0}
                  </p>
                </div>
              </Link>

              <div className="mt-4">
                {item.thesisId?.fileUrl && (
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/public/${item.thesisId.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline hover:text-blue-800"
                  >
                    📁 View Thesis File
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
