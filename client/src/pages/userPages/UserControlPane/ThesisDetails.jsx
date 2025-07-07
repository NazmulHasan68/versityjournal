import React from 'react';
import { useGetAllThesesQuery } from '@/redux/ApiController/thesisApi';

export default function ThesisDetails() {
  const { data, isLoading, error } = useGetAllThesesQuery();

  // Loading state
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // Error state
  if (error) return <p className="text-center mt-10 text-red-600">Failed to load thesis data.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg space-y-10">
      <h2 className="text-3xl font-bold text-center text-gray-800">Thesis Details</h2>

      {/* Loop over all theses */}
      {data?.theses?.map((thesis) => {
        const coverLink = `http://localhost:5000/public/${thesis.cover?.replace(/\\/g, '/')}`;
        const fileLink = `http://localhost:5000/public/${thesis.fileUrl?.replace(/\\/g, '/')}`;

        return (
          <div key={thesis._id} className="space-y-4 border-b pb-8">
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-700">{thesis.title}</h3>

            {/* Meta Information */}
            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>Category:</strong> {thesis.category}</p>
              <p><strong>Type:</strong> {thesis.type}</p>
              <p><strong>University:</strong> {thesis.university}</p>
              <p><strong>Country:</strong> {thesis.country}</p>
              <p><strong>Status:</strong> {thesis.status}</p>
              <p><strong>Viewed:</strong> {thesis.viewed}</p>
            </div>

            {/* Abstract */}
            <div className="text-gray-700">
              <p className="font-medium mt-2">Abstract:</p>
              <p className="mt-1 text-sm leading-relaxed">{thesis.abstract}</p>
            </div>

            {/* Keywords */}
            <p className="text-sm"><strong>Keywords:</strong> {thesis.keywords?.join(', ')}</p>

            {/* Cover & File */}
            <div className="flex flex-wrap gap-6 mt-4">
              {thesis.cover && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Cover Image:</p>
                  <img
                    src={coverLink}
                    alt="Cover"
                    className="w-40 h-auto rounded shadow border"
                  />
                </div>
              )}

              {thesis.fileUrl && (
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">Download Thesis:</p>
                  <a
                    href={fileLink}
                    download
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📄 Click here to download
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
