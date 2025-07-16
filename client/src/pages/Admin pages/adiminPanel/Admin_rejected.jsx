
import React, { useEffect, useState } from "react";
import { useGetAllThesesQuery } from "@/redux/ApiController/thesisApi";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

export default function Admin_rejected() {
  const { data, isLoading } = useGetAllThesesQuery();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!data?.theses) return;

    const filteredData = data.theses.filter((item) => {
      const values = [
        item?.title,
        item?.author?.name,
        item?.author?.email,
        item?.category,
        item?.country,
        item?.university,
        item?.keywords?.join(", "),
      ]
        .join(" ")
        .toLowerCase();

      return values.includes(search.toLowerCase());
    });

    setFiltered(filteredData);
  }, [search, data]);

  // Filter to include only "submitted" status
  const submittedItems = filtered.filter(
    (thesis) => thesis.status === "rejected"
  );

  const totalPages = Math.ceil(submittedItems.length / itemsPerPage);
  const currentItems = submittedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="🔍 Search by name, email, keyword, category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((thesis) => (
                <TableRow key={thesis._id}>
                  <TableCell className="font-medium">{thesis.title}</TableCell>
                  <TableCell>
                    {thesis.author?.name} <br />
                    <span className="text-xs text-gray-500">
                      {thesis.author?.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        thesis.status === "submitted"
                          ? "bg-yellow-100 text-yellow-800"
                          : thesis.status === "under_review"
                          ? "bg-blue-100 text-blue-800"
                          : thesis.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : thesis.status === "published"
                          ? "bg-indigo-100 text-indigo-700"
                          : thesis.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {thesis.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`${thesis._id}`}
                      state={thesis}
                      className="hover:underline hover:text-blue-600 hover:font-semibold"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Rejected theses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              />
            </PaginationItem>

            <PaginationItem className="text-sm font-semibold px-3 py-1 rounded border">
              Page {currentPage} of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
