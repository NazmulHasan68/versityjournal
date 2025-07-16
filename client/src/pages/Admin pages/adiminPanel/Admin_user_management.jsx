import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useUpdateUserRoleMutation } from "@/redux/ApiController/authApi";
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
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Admin_user_management() {
  const { data, isLoading, isError, error } = useGetUsersQuery();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!data?.users) return;

    const result = data.users.filter((user) =>
      `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [search, data]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      toast.success("User role updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role.");
    }
  };

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Error: {error?.data?.message || "Failed to fetch users."}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold mb-2">User Management</h2>

      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search by name or email..."
        className="w-full md:max-w-md"
      />

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(newRole) => handleRoleChange(user._id, newRole)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-50">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="sub_editor">Sub Editor</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Link to={`${user._id}`} className="hover:underline hover:font-bold cursor-pointer">View</Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
