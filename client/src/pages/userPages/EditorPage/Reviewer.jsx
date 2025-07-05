import React from 'react';

const reviewers = [
  {
    id: 1,
    name: 'Prof. Tanvir Ahmed',
    designation: 'Reviewer – Applied Physics',
    expertise: 'Quantum Mechanics, Material Science',
    email: 'tanvir@journal.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 2,
    name: 'Dr. Sumaiya Rahman',
    designation: 'Reviewer – Social Science',
    expertise: 'Sociology, Anthropology, Gender Studies',
    email: 'sumaiya@journal.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: 3,
    name: 'Dr. Rafiq Islam',
    designation: 'Reviewer – Computer Science',
    expertise: 'AI, NLP, Cybersecurity',
    email: 'rafiq@journal.com',
    image: 'https://via.placeholder.com/100',
  },
];

export default function Reviewer() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Our Reviewers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reviewers.map((reviewer) => (
          <div
            key={reviewer.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
          >
            <img
              src={reviewer.image}
              alt={reviewer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reviewer.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{reviewer.designation}</p>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              <strong>Expertise:</strong> {reviewer.expertise}
            </p>
            <p className="text-sm mt-1 text-blue-600 dark:text-blue-400">
              <a href={`mailto:${reviewer.email}`}>{reviewer.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
