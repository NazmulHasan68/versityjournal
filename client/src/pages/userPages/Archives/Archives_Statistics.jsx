import React from 'react';
import CountUp from 'react-countup';

export default function Archives_Statistics() {
  return (
    <section className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg text-center space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Archive Statistics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-gray-800 dark:text-gray-300">
        <StatCard label="Volumes" end={42} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard label="Issues" end={252} color="text-green-600 dark:text-green-400" />
        <StatCard label="Articles" end={3124} color="text-pink-600 dark:text-pink-400" />
        <StatCard label="Years of Publishing" end={38} color="text-yellow-600 dark:text-yellow-400" />
      </div>
    </section>
  );
}

function StatCard({ label, end, color }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg py-6 px-4 shadow-md hover:shadow-xl transition">
      <p className={`text-2xl font-extrabold ${color}`}>
        <CountUp end={end} duration={2} separator="," />
      </p>
      <p className="mt-2 uppercase tracking-widest font-semibold text-sm">{label}</p>
    </div>
  );
}
