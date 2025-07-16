import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "@/redux/ApiController/authApi";
import { MoveLeft } from "lucide-react";

export default function Admin_user_details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetUserByIdQuery(id);

  if (isLoading)
    return <div className="p-8 text-gray-600">Loading user details...</div>;
  if (isError)
    return (
      <div className="p-8 text-red-500">
        Error: {error?.data?.message || "Failed to fetch user."}
      </div>
    );

  const user = data?.user;
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-10 lg:px-32">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-8"
      >
        <MoveLeft className="w-5 h-5" />
        Back to Users
      </button>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">👤 User Profile Overview</h1>
        <p className="text-gray-500 mt-2">
          Detailed information for user{" "}
          <span className="font-medium text-blue-600">{user?.name}</span>
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-white border shadow rounded-xl p-8">
        {/* Left Column: Photo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-blue-600 shadow">
            <img
              src={
                user?.photo
                  ? `${baseURL}${user.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span
              className={`mt-2 inline-block px-3 py-1 text-xs rounded-full font-medium ${
                user?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {user?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Right Columns: Details */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-base font-medium text-gray-800 capitalize">{user?.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Profession</p>
            <p className="text-base font-medium text-gray-800">
              {user?.profession || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Subject</p>
            <p className="text-base font-medium text-gray-800">
              {user?.subject || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">University</p>
            <p className="text-base font-medium text-gray-800">
              {user?.versity || user?.university || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Country</p>
            <p className="text-base font-medium text-gray-800">
              {user?.country || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Joined On</p>
            <p className="text-base font-medium text-gray-800">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {user?.CV && (
            <div className="col-span-full mt-2">
              <p className="text-sm text-gray-500 mb-1">CV File</p>
              <a
                href={`${baseURL}${user?.CV}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                📄 View Uploaded CV
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
