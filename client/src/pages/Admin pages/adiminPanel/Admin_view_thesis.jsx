import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetUsersQuery } from "@/redux/ApiController/authApi";

// MOCK USERS for dropdown (replace with API call)
const reviewers = [
  { id: "1", name: "Dr. Rafiq", role: "Reviewer" },
  { id: "2", name: "Dr. Amina", role: "Reviewer" },
];

const subEditors = [
  { id: "10", name: "Prof. Mahmud", role: "Sub-Editor" },
  { id: "11", name: "Dr. Shila", role: "Sub-Editor" },
];

// Possible statuses
const statuses = ["submitted", "under_review", "rejected", "accepted", "revision_requested"];

export default function Admin_view_thesis() {
  const { state: thesis } = useLocation();
  const {data} = useGetUsersQuery()
  console.log(data);
  

  const [status, setStatus] = useState(thesis?.status || "submitted");
  const [assignedReviewer, setAssignedReviewer] = useState("");
  const [assignedSubEditor, setAssignedSubEditor] = useState("");

  if (!thesis) return <div className="p-6">No thesis data found.</div>;

  const handleAssign = () => {
    // TODO: Replace with mutation/API call
    console.log("Status:", status);
    console.log("Assign Reviewer:", assignedReviewer);
    console.log("Assign Sub-Editor:", assignedSubEditor);
    alert("Changes submitted (mock)");
  };

  return (
    <div className="max-w-5xl h-screen overflow-auto mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        {thesis.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm"><strong>Author:</strong> {thesis.author?.name} ({thesis.author?.email})</p>
          <p className="text-sm"><strong>University:</strong> {thesis.university}</p>
          <p className="text-sm"><strong>Category:</strong> {thesis.category}</p>
          <p className="text-sm"><strong>Country:</strong> {thesis.country}</p>
          <p className="text-sm"><strong>Type:</strong> {thesis.type}</p>
          <p className="text-sm"><strong>Status:</strong> {thesis.status}</p>
          <p className="text-sm"><strong>Views:</strong> {thesis.viewed}</p>
          <p className="text-sm"><strong>Submitted:</strong> {new Date(thesis.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/public/${thesis.cover}`}
            alt="Cover"
            className="w-full max-h-60 object-cover rounded border"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Abstract</h2>
        <p className="text-gray-700 text-sm">{thesis.abstract}</p>
      </div>

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

        {/* Change status */}
        <div className=" w-full">
            <label className="text-sm font-medium block mb-1">Change Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full md:w-64">
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
        <div className="flex justify-between gap-4 w-full items-center ">

          {/* Assign Reviewer */}
          <div className=" md:basis-1/2 w-full">
            <label className="text-sm font-medium block mb-1">Assign Reviewer</label>
            <Select value={assignedReviewer} onValueChange={setAssignedReviewer}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Choose reviewer" />
              </SelectTrigger>
              <SelectContent className="bg-slate-50">
                {reviewers.map((r) => (
                  <SelectItem key={r.id} value={r.name}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assign Sub-Editor */}
          <div className=" md:basis-1/2 w-full">
            <label className="text-sm font-medium block mb-1">Assign Sub-Editor</label>
            <Select value={assignedSubEditor} onValueChange={setAssignedSubEditor}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Choose sub-editor" />
              </SelectTrigger>
              <SelectContent className="bg-slate-50">
                {subEditors.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>


        <Button className="mt-8 my-8" onClick={handleAssign}>
          Submit Changes
        </Button>
      </div>
    </div>
  );
}
