import React from 'react';

const subEditors = [
  {
    id: 1,
    name: 'Dr. Ayesha Siddique',
    designation: 'Sub Editor – Life Sciences',
    focus: 'Genetics, Molecular Biology, Environmental Science',
    email: 'ayesha@journal.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Dr. Rahim Uddin',
    designation: 'Sub Editor – Engineering',
    focus: 'Civil Engineering, Structural Analysis',
    email: 'rahim@journal.com',
    image: 'https://via.placeholder.com/100',
  },
];

export default function Sub_editor() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Our Sub Editors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {subEditors.map((editor) => (
          <div
            key={editor.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center text-center"
          >
            <img
              src={editor.image}
              alt={editor.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{editor.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{editor.designation}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Focus:</strong> {editor.focus}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              <a href={`mailto:${editor.email}`}>{editor.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
