import React from "react";
import {
  Search,
  BookOpen,
  FlaskConical,
  Globe,
  HeartPulse,
  Paintbrush,
  Landmark,
  Briefcase,
  Brain,
} from "lucide-react";

const categories = [
  { title: "Science & Technology", count: 142, icon: <FlaskConical className="text-sky-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Humanities", count: 98, icon: <BookOpen className="text-rose-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Social Sciences", count: 124, icon: <Globe className="text-emerald-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Medicine & Health", count: 167, icon: <HeartPulse className="text-red-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Arts & Literature", count: 76, icon: <Paintbrush className="text-purple-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "History & Archaeology", count: 89, icon: <Landmark className="text-yellow-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Economics & Business", count: 112, icon: <Briefcase className="text-indigo-500 md:w-8 md:h-8 w-4 h-4" /> },
  { title: "Philosophy & Ethics", count: 64, icon: <Brain className="text-orange-500 md:w-8 md:h-8 w-4 h-4" /> },
];

export default function Home_search_category() {
  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto my-10">
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-sky-500 bg-white shadow-md">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles, topics, authors..."
            className="w-full outline-none text-base text-gray-500"
          />
        </div>
      </div>

      {/* Category Title */}
      <h2 className="md:text-3xl text-xl font-semibold text-center text-slate-800 mb-10 font-serif tracking-tight">
        Browse by Category
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center md:gap-4 gap-2 md:p-5 p-3 cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
          >
            <div className="bg-sky-50 p-3 rounded-full shadow-sm">
              {cat.icon}
            </div>
            <div>
              <h3 className="md:text-lg text-sm font-semibold text-slate-800">
                {cat.title}
              </h3>
              <p className="md:text-sm text-xs text-gray-400">{cat.count} articles</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
