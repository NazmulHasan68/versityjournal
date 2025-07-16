// src/pages/Sub_ReviewDetail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetThesisByIdQuery } from "@/redux/ApiController/thesisApi";
import { ArrowLeft } from "lucide-react";

export default function SubEditor_history_details() {
  const { thesisId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const assignment = location.state;

  const { data: thesis, isLoading, isError } = useGetThesisByIdQuery(thesisId);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  if (isLoading)
    return <p className="text-center mt-10">Loading thesis details...</p>;

  if (isError || !thesis)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load thesis details.
      </p>
    );

  return (
    <div className="max-w-6xl h-screen overflow-auto mx-auto p-4 mt-4 rounded-xl bg-white shadow-sm border border-gray-200">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Cover Image */}
      {thesis.cover ? (
        <img
          src={`${BASE_URL}/public/${thesis.cover}`}
          alt="Thesis Cover"
          className="rounded-xl w-full max-h-[400px] object-cover mb-6 shadow"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mb-6">
          No Cover Image
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{thesis.title}</h1>

      {/* Abstract */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Abstract</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {thesis.abstract}
        </p>
      </section>

      {/* Thesis Details Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-800 text-sm mb-10">
        <p><strong>Author:</strong> {thesis.author?.name || "N/A"}</p>
        <p><strong>Email:</strong> {thesis.author?.email || "N/A"}</p>
        <p><strong>Category:</strong> {thesis.category || "N/A"}</p>
        <p><strong>University:</strong> {thesis.university || "N/A"}</p>
        <p><strong>Country:</strong> {thesis.country || "N/A"}</p>
        <p><strong>Keywords:</strong> {thesis.keywords?.join(", ") || "N/A"}</p>
        <p><strong>Type:</strong> {thesis.type || "N/A"}</p>
        <p><strong>Popular:</strong> {thesis.popular ? "Yes" : "No"}</p>
        <p><strong>Suggested:</strong> {thesis.suggested ? "Yes" : "No"}</p>
        <p><strong>Created At:</strong> {new Date(thesis.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> {new Date(thesis.updatedAt).toLocaleDateString()}</p>
        <p className="col-span-2"><strong>Status:</strong> {thesis.status}</p>
      </section>

      {/* Download Button */}
      {thesis.fileUrl && (
        <a
          href={`${BASE_URL}/public/${thesis.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="block w-full sm:w-64 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mb-8 transition"
        >
          📄 Download Thesis File
        </a>
      )}

      {/* Comments Section */}
      {assignment?.notes && assignment.notes.length > 0 ? (
        <div className="md:mb-8 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Previous Comments</h3>
          {assignment.notes.map((note, idx) => {
            const formattedDate = new Date(note.at).toLocaleString();
            return (
              <div
                key={note._id || idx}
                className="md:my-4 my-2 md:p-4 p-2 rounded-md bg-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-xs md:text-md py-2 text-gray-700">
                    {note.by?.name || "Unknown"}{" "}
                    <span className="text-xs text-gray-500">
                      ({note.by?.email})
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{note.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mb-6">No comments available yet.</p>
      )}
    </div>
  );
}
