"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Computer Science",
  "Medical",
  "Engineering",
  "Education",
  "Social Science",
];

const foldersByYear = {
  2025: ["Jan–Jun 2025", "Jul–Dec 2025"],
  2024: ["Jan–Jun 2024", "Jul–Dec 2024"],
};

const types = ["All Types", "Article", "Thesis", "Review"];
const sortOptions = ["Newest", "Oldest", "Most Viewed", "Most Cited"];

export default function JournalSidebar({
  selectedCategory,
  onCategorySelect,
  selectedFolder,
  onFolderSelect,
  selectedType,
  onTypeSelect,
  selectedSort,
  onSortSelect,
}) {
  const [openYears, setOpenYears] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleYear = (year) => {
    setOpenYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const SidebarContent = (
    <div className="w-full md:w-72 bg-white h-screen border-gray-200 p-5 font-sans">
      <h2 className="text-xl font-bold text-gray-800 mb-6">📚 Journal Filters</h2>

      {/* Categories */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
          Categories
        </h3>
        <select
          value={selectedCategory}
          onChange={(e) => onCategorySelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {/* Type */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Type</h3>
        <select
          value={selectedType}
          onChange={(e) => onTypeSelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm"
        >
          {types.map((type) => (
            <option key={type} value={type === "All Types" ? "" : type}>
              {type}
            </option>
          ))}
        </select>
      </section>

      {/* Sort By */}
      <section className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
          Sort By
        </h3>
        <select
          value={selectedSort}
          onChange={(e) => onSortSelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm"
        >
          {sortOptions.map((sort) => (
            <option key={sort} value={sort}>
              {sort}
            </option>
          ))}
        </select>
      </section>

      {/* Folders */}
      <section>
        <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">
          Folders by Year
        </h3>
        <ul className="space-y-2">
          {Object.keys(foldersByYear)
            .sort((a, b) => b - a)
            .map((year) => (
              <li key={year}>
                <button
                  onClick={() => toggleYear(year)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-md"
                >
                  <span>📁 {year}</span>
                  <span>{openYears.includes(year) ? "▾" : "▸"}</span>
                </button>

                {openYears.includes(year) && (
                  <ul className="mt-2 ml-4 space-y-1">
                    {foldersByYear[year].map((folder) => (
                      <li key={folder}>
                        <button
                          onClick={() => onFolderSelect(folder)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                            selectedFolder === folder
                              ? "bg-blue-100 text-blue-800 font-semibold"
                              : "text-gray-700 hover:bg-blue-50"
                          }`}
                        >
                          📄 {folder}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <div className="flex gap-2 items-center mb-4">
                <div>
                    <Input type="text" placeholder="Search here .." className="w-[230px]"/>
                </div>
                <Dialog.Trigger className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded shadow">
                    ☰ Filters
                    </button>
                </Dialog.Trigger>
            </div>
        
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed top-0 left-0 w-72 h-full bg-white p-6 shadow-lg overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title className="text-lg font-bold">Journal Filters</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-red-600 font-semibold">Close</button>
                </Dialog.Close>
              </div>

              {SidebarContent}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-72 border-r min-h-screen">{SidebarContent}</div>
    </>
  );
}
