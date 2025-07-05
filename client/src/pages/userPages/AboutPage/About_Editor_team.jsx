import React from 'react';

export default function About_Editor_team() {
  const editors = [
    {
      initials: 'DR',
      name: 'Dr. Rebecca Johnson',
      role: 'Editor-in-Chief',
      bio: 'Professor of Research Methodology at Cambridge University with over 20 years of experience in academic publishing.',
    },
    {
      initials: 'DM',
      name: 'Dr. Michael Chen',
      role: 'Managing Editor',
      bio: 'Associate Professor of Information Science specializing in digital scholarship and research dissemination.',
    },
    {
      initials: 'PA',
      name: 'Prof. Amara Okafor',
      role: 'Associate Editor',
      bio: 'Distinguished researcher in Comparative Literature with expertise in interdisciplinary methodologies.',
    },
  ];

  return (
    <section className="bg-[#f8f9fa] dark:bg-gray-950 py-20 px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-14 tracking-tight">
          Editorial Team
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {editors.map((editor, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow transition hover:shadow-lg p-6 pt-8"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-sky-600 rounded-t-xl" />

              {/* Avatar and Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center text-base font-semibold shadow">
                  {editor.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {editor.name}
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">{editor.role}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {editor.bio}
              </p>
            </div>
          ))}
        </div>

        {/* View Button */}
        <div className="text-center mt-10 md:mt-14">
          <button className="px-6 py-2 border border-blue-900 text-blue-900 dark:text-white dark:border-white rounded-full text-sm hover:bg-blue-900 hover:text-white transition">
            View Full Editorial Board
          </button>
        </div>
      </div>
    </section>
  );
}

