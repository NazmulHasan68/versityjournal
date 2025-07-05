import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Journal_show from './Journal_show';

export default function Journal_hero_section() {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    alert(`Searching for: ${search}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto p-6 text-center h-screen overflow-auto"
    >
      <form onSubmit={handleSearch} className="md:flex hidden justify-center">
        <input
          type="text"
          placeholder="Search journals, articles, thesis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      <Journal_show/>
    </motion.section>
  );
}
