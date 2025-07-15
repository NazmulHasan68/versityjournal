
// src/pages/Sub_ReviewDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetThesisByIdQuery } from "@/redux/ApiController/thesisApi";
import {
  useAddNoteAndAssignReviewerMutation,
  useAddNoteMutation,
  useUpdateStatusMutation,
} from "@/redux/ApiController/assignApi";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useGetUsersQuery } from "@/redux/ApiController/authApi";
// ✅ Import Select components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";

export default function ReviewDetail() {
  const { thesisId } = useParams();
  const location = useLocation();
 const [assignment] = location.state || [];

  console.log(assignment);
  

  const navigate = useNavigate();

  const { data: thesis, isLoading, isError } = useGetThesisByIdQuery(thesisId);
  const [updateStatus] = useUpdateStatusMutation();
  const [addNote] = useAddNoteMutation();
  const [addNoteAndAssignReviewer] = useAddNoteAndAssignReviewerMutation();

  const { data } = useGetUsersQuery();
  const subEditors =
    data?.users?.filter((user) => user.role === "reviewer") || [];

  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  // ✅ State for assigned reviewer
  const [assignedReviewer, setassignedReviewer] = useState("");

  useEffect(() => {
    if (thesis?.status) {
      setStatus(thesis.status);
    }
  }, [thesis]);

  const handleUpdate = async () => {
    if (!status || !comment || !assignedReviewer) {
      toast.error("All fields are required");
      return;
    }

    try {
      
      if(status == "under_review"){
        await updateStatus({ thesisId, status }).unwrap();
        await addNoteAndAssignReviewer({ thesisId, comment, assignedReviewer }).unwrap();
        toast.success("Status, Comment & Reviewer assigned successfully");
      }else{
        await updateStatus({ thesisId, status }).unwrap();
        await addNote({ thesisId, comment }).unwrap();
        toast.success("Status, Comment & Reviewer assigned successfully");
      }
    
      setComment("");
      setStatus("");
      setassignedReviewer("");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update thesis");
      console.error(error);
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading thesis details...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load thesis details.
      </p>
    );

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

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

      {/* Details Grid */}
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

      {/*here show the comment */}
      {assignment.notes && assignment.notes.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Previous Comments</h3>
          {assignment.notes.map((note, idx) => {
            const formattedDate = new Date(note.at).toLocaleString(); // Format time properly
            return (
              <div key={note._id || idx} className="my-4 p-3 rounded-md bg-green-50 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-gray-700">
                    {note.by?.name || "Unknown"}{" "}
                    <span className="text-xs text-gray-500">({note.by?.email})</span>
                  </p>
                  <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{note.message}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic mb-6">No comments available yet.</p>
      )}


      {/* Update Form */}
      <section className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Update Status & Comment</h3>

        <div className=" flex gap-4 my-2 w-full">
          <div className="mb-4 basis-1/2">
            <label htmlFor="status-select" className="block font-medium mb-1 text-gray-700">
              Status
            </label>
            <select
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select status</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* ✅ Reviewer Assignment Section */}
          <div className="mb-4 basis-1/2">
            <label className="text-sm font-medium block mb-1">Assign Reviewer</label>
            <Select value={assignedReviewer} onValueChange={setassignedReviewer}>
              <SelectTrigger className="w-full py-4">
                <SelectValue placeholder="Choose reviewer" />
              </SelectTrigger>
              <SelectContent className="bg-slate-50 py-1">
                {subEditors.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block font-medium mb-1 text-gray-700">
            Comment
          </label>
          <Textarea
            id="comment"
            rows={4}
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-y"
          />
        </div>

        <Button
          onClick={handleUpdate}
          disabled={!status || !comment || !assignedReviewer}
          className="w-full sm:w-40"
        >
          Submit
        </Button>
      </section>
    </div>
  );
}
