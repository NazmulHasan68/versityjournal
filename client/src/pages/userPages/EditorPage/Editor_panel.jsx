import React from 'react';
import {
  FileText,
  ClipboardList,
  CheckCircle,
  FileSearch,
  UserPlus,
  BadgeCheck,
  Settings,
} from 'lucide-react';

export default function Editor_panel() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Editor Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage submissions, reviews, and publications</p>
      </div>

      {/* Status Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
          <FileText className="text-blue-600 dark:text-blue-400 w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">New Submissions</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">12</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
          <ClipboardList className="text-yellow-600 dark:text-yellow-400 w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Under Review</h3>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">8</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
          <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Published</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">5</p>
        </div>
      </div>

      {/* Editor Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Editor Actions</h2>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-center gap-2 hover:text-blue-500">
            <FileSearch size={18} /> <a href="/submissions">View All Submissions</a>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-500">
            <UserPlus size={18} /> <a href="/assign-reviewer">Assign Reviewer</a>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-500">
            <BadgeCheck size={18} /> <a href="/publish-paper">Approve / Publish Paper</a>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-500">
            <Settings size={18} /> <a href="/editor-profile">Update Profile</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
