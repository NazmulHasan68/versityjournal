import React, { useState } from "react";
import { useGetAssignmentsBySubEditorQuery } from "@/redux/ApiController/assignApi";
import { useCheckAuthQuery } from "@/redux/ApiController/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SubmissionHistory() {
  const { data: authData } = useCheckAuthQuery();
  const subeditorId = authData?.user?._id;

  const {
    data: response,
    isLoading,
    isError,
  } = useGetAssignmentsBySubEditorQuery(subeditorId, {
    skip: !subeditorId,
  });

  const assignments = response?.data || [];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Filter accepted/rejected + matches search
  const filtered = assignments.filter((item) => {
    const matchesStatus =
      item.status === "accepted" || item.status === "rejected";
    const matchesSearch =
      item?.thesisId?.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item?.thesisId?.author?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-semibold mb-6">
        Submission History (Accepted / Rejected)
      </h1>

      <Input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // Reset to first page on search
        }}
        className="mb-4"
      />

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-emerald-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No accepted or rejected theses found.
                </td>
              </tr>
            )}
            {paginated.map((item) => (
              <tr
                key={item._id}
                className={`border-b hover:bg-gray-50 ${
                  item.status === "accepted"
                    ? "bg-green-50"
                    : item.status === "rejected"
                    ? "bg-red-50"
                    : ""
                }`}
              >
                <td className="px-4 py-2">{item.thesisId?.title || "N/A"}</td>
                <td className="px-4 py-2">
                  {item.thesisId?.author?.name || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/sub-editor/history/${item.thesisId._id}`}
                    state={item} // ✅ Pass full item to detail page
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
