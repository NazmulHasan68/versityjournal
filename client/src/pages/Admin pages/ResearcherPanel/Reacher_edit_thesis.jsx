import { useGetThesisByIdQuery, useUpdateThesisMutation } from "@/redux/ApiController/thesisApi";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const categories = [
  "Computer Science", "Engineering", "Medical", "Business",
  "Social Science", "Education", "Law", "Others"
];

const types = ["article", "thesis"];

export default function Reacher_edit_thesis() {
  const { thesisId } = useParams();
  const { data: thesisData } = useGetThesisByIdQuery(thesisId);
  const [updateThesis, { isLoading }] = useUpdateThesisMutation();

  const [form, setForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    category: "",
    type: "",
    country: "",
    university: "",
    coAuthorsEmails: "",
  });

  const [cover, setCover] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (thesisData) {
      setForm({
        title: thesisData.title || "",
        abstract: thesisData.abstract || "",
        keywords: thesisData.keywords?.join(", ") || "",
        category: thesisData.category || "",
        type: thesisData.type || "",
        country: thesisData.country || "",
        university: thesisData.university || "",
        coAuthorsEmails: thesisData.coAuthors?.map(c => c.email).join(", ") || "",
      });
    }
  }, [thesisData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("You must agree to the terms and conditions before submitting.");
      return;
    }

    const coAuthorsArray = form.coAuthorsEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "coAuthorsEmails") {
        formData.append(key, value);
      }
    });
    formData.append("coAuthorsEmails", JSON.stringify(coAuthorsArray));
    if (cover) formData.append("cover", cover);
    if (fileUrl) formData.append("fileUrl", fileUrl);

    try {
      await updateThesis({ id: thesisId, formData }).unwrap();
      toast.success("Thesis updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-8 py-4 h-screen overflow-auto rounded-2xl mt-6">
      <div className="text-center mb-5">
        <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 tracking-tight">
          Edit or Update your Thesis
        </h2>
        <p className="mt-2 text-gray-600 md:text-sm text-xs max-w-xl mx-auto">
          According to the Instruct
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full p-2 md:p-10 rounded-xl space-y-5 md:space-y-7 bg-slate-50"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition"
          value={form.title}
          onChange={handleChange}
          required
          autoComplete="off"
        />

        <textarea
          name="abstract"
          placeholder="Abstract"
          rows="5"
          className="w-full border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition resize-none"
          value={form.abstract}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="keywords"
          placeholder="Keywords (comma separated)"
          className="w-full border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition"
          value={form.keywords}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          type="text"
          name="coAuthorsEmails"
          placeholder="Co-Author Emails (comma separated, must have account)"
          className="w-full border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition"
          value={form.coAuthorsEmails}
          onChange={handleChange}
          autoComplete="off"
        />

        <div className="grid grid-cols-2 gap-2 md:gap-6">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 transition"
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 transition"
            required
          >
            <option value="" disabled>Select Type</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-6">
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition"
            value={form.country}
            onChange={handleChange}
            autoComplete="off"
          />

          <input
            type="text"
            name="university"
            placeholder="University"
            className="border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 transition"
            value={form.university}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <label className="block mb-2 text-xs md:text-base text-gray-700 font-medium">Upload Cover Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
              className="block w-full text-gray-700"
            />
            {thesisData?.cover && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/public/${thesisData.cover}`}
                alt="Old Cover"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs md:text-base text-gray-700 font-medium">Upload Thesis File</label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFileUrl(e.target.files[0])}
              className="block w-full text-gray-700"
            />
            {thesisData?.fileUrl && (
              <a
                href={`${import.meta.env.VITE_BASE_URL}/public/${thesisData.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                📄 View Previous Thesis File
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-gray-700 text-sm md:text-base">
            Agree with <Link to="/terms" className="text-blue-600 underline">terms and conditions</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update Thesis"}
        </button>
      </form>
    </div>
  );
}
