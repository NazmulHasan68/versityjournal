
import React, { useState } from "react";
import { useCheckAuthQuery } from "@/redux/ApiController/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetAssignmentsByReviewerQuery } from "@/redux/ApiController/assignApi";

export default function Reviewer_accept() {
  const { data: user, isLoading: userLoading } = useCheckAuthQuery();
  const reviewerId = user?.user?._id;

  const {
    data: response,
    isLoading: dataLoading,
  } = useGetAssignmentsByReviewerQuery(reviewerId, {
    skip: !reviewerId,
  });

  const assignments = response?.data || [];


  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  if (userLoading || dataLoading) {
    return <div className="text-center mt-10">Loading assignments...</div>;
  }

  const filtered = assignments.filter(
    (item) =>
      item.status === "accepted" &&
      (item?.thesisId?.title?.toLowerCase().includes(search.toLowerCase()) ||
        item?.thesisId?.author?.name?.toLowerCase().includes(search.toLowerCase()))
  );

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-semibold mb-4">Accepted Thesis List</h1>

      <Input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4"
      />

      <p className="text-sm text-gray-600 mb-2">
        Showing {filtered.length} result{filtered.length !== 1 && "s"}
      </p>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-emerald-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Reviewer(s)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  🧐 No Acepted theses found.
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{item.thesisId?.title || "N/A"}</td>
                  <td className="px-4 py-2">{item.thesisId?.author?.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    {(item?.assignedReviewer || [])
                      .map((rev) => rev?.name || "N/A")
                      .join(", ") || "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/reviewer/accepted/${item.thesisId._id}`}
                      state={assignments}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {page} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
