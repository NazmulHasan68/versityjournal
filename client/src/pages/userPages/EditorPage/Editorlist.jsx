import React from 'react';

const editors = [
  {
    id: 1,
    name: 'Dr. Nazmul Hasan',
    designation: 'Chief Editor',
    expertise: 'Computer Science, AI, Data Science',
    email: 'nazmul@journal.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Dr. Mahtabul Shourav',
    designation: 'Editorial Board Member',
    expertise: 'Medical Research, Pharmacology',
    email: 'shourav@journal.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Dr. Mustakim Hossain',
    designation: 'Reviewer',
    expertise: 'Engineering, Mechanics',
    email: 'mustakim@journal.com',
    image: 'https://via.placeholder.com/100',
  },
];

export default function Editorlist() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">Meet Our Editors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {editors.map((editor) => (
          <div
            key={editor.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
          >
            <img
              src={editor.image}
              alt={editor.name}
              className="w-24 h-24 border-2 border-sky-400 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editor.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{editor.designation}</p>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              <strong>Expertise:</strong> {editor.expertise}
            </p>
            <p className="text-sm mt-1 text-blue-600 dark:text-blue-400">
              <a href={`mailto:${editor.email}`}>{editor.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
