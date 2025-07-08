import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetUsersQuery } from "@/redux/ApiController/authApi";
import { useCreateAssignmentMutation } from "@/redux/ApiController/assignApi";
import { toast } from "sonner";

const statuses = [
  "pending",
  "submitted",
  "under_review",
  "rejected",
  "accepted",
  "revision_requested",
];

export default function AdminViewThesis() {
  const { state: thesis } = useLocation();

  const { data, isLoading, isError } = useGetUsersQuery();
  const [createAssignment, { isLoading: creating }] =
    useCreateAssignmentMutation();

  const subEditors =
    data?.users?.filter((user) => user.role === "sub_editor") || [];

  const [status, setStatus] = useState(thesis?.status || "submitted");
  const [assignedSubEditor, setAssignedSubEditor] = useState("");

  // Handle loading and error states
  if (isLoading) return <div className="p-6">Loading users...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load users.</div>;
  if (!thesis) return <div className="p-6">No thesis data found.</div>;

  // Submit handler
  const handleAssign = async () => {
    if (!assignedSubEditor) {
      toast.error("Please select a sub-editor.");
      return;
    }

    try {
      await createAssignment({
        thesisId: thesis._id,
        assignedSubEditor,
        status,
      }).unwrap();
      toast.success("Assignment created successfully!");
    } catch (error) {
      console.error("Assignment failed:", error);
      toast.error("Failed to create assignment.");
    }
  };

  return (
    <div className="max-w-5xl h-screen overflow-auto mx-auto p-6 font-sans">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{thesis.title}</h1>

      {/* Thesis Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2 text-sm text-gray-800">
          <p><strong>Author:</strong> {thesis.author?.name} ({thesis.author?.email})</p>
          <p><strong>University:</strong> {thesis.university}</p>
          <p><strong>Category:</strong> {thesis.category}</p>
          <p><strong>Country:</strong> {thesis.country}</p>
          <p><strong>Type:</strong> {thesis.type}</p>
          <p><strong>Status:</strong> {thesis.status}</p>
          <p><strong>Views:</strong> {thesis.viewed}</p>
          <p><strong>Submitted:</strong> {new Date(thesis.createdAt).toLocaleString()}</p>
        </div>

        {/* Cover Image */}
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/public/${thesis.cover}`}
            alt="Thesis Cover"
            className="w-full max-h-60 object-cover rounded border"
          />
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Abstract</h2>
        <p className="text-gray-700 text-sm">{thesis.abstract}</p>
      </div>

      {/* File Link */}
      <div className="mb-6">
        <a
          href={`${import.meta.env.VITE_BASE_URL}/public/${thesis.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          📄 View Thesis File
        </a>
      </div>

      {/* Assignment Section */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">🛠️ Manage Submission</h3>

        <div className="flex flex-col md:flex-row gap-4">

          {/* Sub-editor Selection */}
          <div className="md:w-1/2">
            <label className="text-sm font-medium block mb-1">Assign Sub-Editor</label>
            <Select value={assignedSubEditor} onValueChange={setAssignedSubEditor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose sub-editor" />
              </SelectTrigger>
              <SelectContent className="bg-slate-50">
                {subEditors.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Selection */}
          <div className="md:w-1/2">
            <label className="text-sm font-medium block mb-1">Change Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-50">
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="mt-6" onClick={handleAssign} disabled={creating}>
          {creating ? "Submitting..." : "Submit Assignment"}
        </Button>
      </div>
    </div>
  );
}
