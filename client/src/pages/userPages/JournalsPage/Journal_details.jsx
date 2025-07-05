import React from "react";
import category1 from "@/assets/bg/catagory.jpg";
import author1 from "@/assets/bg/bg1.jpg";

export default function Journal_details() {
  return (
    <div className=" py-12 px-2 md:px-16 h-screen overflow-auto">
      {/* Image */}
      <div className="w-full max-w-5xl mx-auto">
        <img
          src={category1}
          alt="Journal Cover"
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Title + Info */}
      <div className="max-w-4xl mx-auto mt-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
          Journal of Advanced Research
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-sm">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Volume 42 • Issue 3
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Impact Factor: 4.2
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            Quarterly
          </span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            Open Access
          </span>
        </div>
        
        {/* Description */}
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <span className="block mb-3">
            <span className="font-semibold">The Journal of Advanced Research</span> is a peer-reviewed, multidisciplinary journal dedicated to publishing high-quality and impactful research across scientific, technological, and interdisciplinary domains. Since its establishment in 1985, it has been at the forefront of fostering scholarly communication that pushes the boundaries of innovation and discovery.
        </span>

        <span className="block mb-3">
            The journal covers a broad spectrum of topics including artificial intelligence, biotechnology, engineering, environmental sciences, healthcare advancements, and computational modeling. Each issue features original research articles, systematic reviews, and case studies that provide actionable insights and foster cross-disciplinary collaboration.
        </span>

        <span className="block mb-3">
            As part of its commitment to open access and academic excellence, the Journal ensures that all published content is freely accessible to researchers and practitioners worldwide. It follows a rigorous double-blind peer-review process and adheres to the highest standards of ethical publication practices.
        </span>

        <span className="block">
            The journal is indexed in major databases such as Scopus, Web of Science, and PubMed, and has consistently maintained a strong impact factor. With a global editorial board and contributors from top institutions, it continues to be a trusted source of groundbreaking research and scholarly thought leadership.
        </span>
        </p>


        {/* Author Info */}
        <div className="flex items-center gap-4 mt-6">
          <img
            src={author1}
            alt="Author"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Dr. Jane Doe</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">MIT, Cambridge</p>
          </div>
        </div>

        {/* Metadata */}
        <ul className="mt-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li><strong>Established:</strong> 1985</li>
          <li><strong>Category:</strong> Science & Technology</li>
          <li><strong>Access Type:</strong> Open Access</li>
        </ul>

        {/* Action Button */}
        <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Read Full Journal PDF
        </button>
      </div>
    </div>
  );
}
