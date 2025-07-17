import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Researcher_thesis_details() {
  const location = useLocation();
  const item = location.state;

  if (!item) return <div className="p-6 text-red-500"> No thesis data passed.</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white/30 shadow rounded-xl mt-4 space-y-4 h-screen overflow-auto">
      <div>

      </div>
      <h1 className="text-2xl font-bold text-blue-800">📘 {item?.thesisId?.title || "No Title Found"}</h1>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Status:</strong>{" "}
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">{item.status}</span>
        </p>
        <p>
          <strong>University:</strong> {item.thesisId?.university || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {item.thesisId?.category || "N/A"}
        </p>
        <p>
          <strong>Submitted On:</strong>{" "}
          {item.thesisId?.createdAt
            ? new Date(item.thesisId.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div>
        <h2 className="font-semibold text-lg mt-6 mb-2">📄 Abstract</h2>
        <p className="text-gray-700 text-sm">{item.thesisId?.abstract || "No abstract available."}</p>
      </div>

      <div className="pb-8">
        {item.thesisId?.fileUrl && (
          <a
            href={`${import.meta.env.VITE_BASE_URL}/public/${item.thesisId.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            📁 View Thesis File
          </a>
        )}
      </div>


      <Link to={'edit'} className=" mt-10 px-6 py-2 rounded-sm hover:bg-sky-800 bg-sky-700 text-white cursor-pointer mx-auto ">
          Edit or Change your Journal
      </Link>

      <div>
        <h3 className="text-lg font-semibold mt-6 mb-2">🗒 Notes ({item?.notes?.length || 0})</h3>
        {item?.notes?.length > 0 ? (
          <ul className="text-sm text-gray-700 space-y-2">
            {item.notes.map((note) => (
              <li key={note._id}>
                <p className="text-gray-600">
                  <strong>{note.by?.name}:</strong> {note.message}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(note.at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notes added yet.</p>
        )}
      </div>
    </div>
  );
}
