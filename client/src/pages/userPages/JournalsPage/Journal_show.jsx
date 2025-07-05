import React, { useState } from "react";
import { motion } from "framer-motion";
import category1 from "@/assets/bg/catagory.jpg";
import category2 from "@/assets/bg/catagory1.jpg";
import category3 from "@/assets/bg/catagory2.jpg";
import author1 from "@/assets/bg/bg1.jpg";
import author2 from "@/assets/bg/bg2.jpg";
import author3 from "@/assets/bg/bg3.jpg";
import { Link } from "react-router-dom";

const journals = [

  {
    title: "Journal of Advanced Research",
    volume: "Volume 42",
    issue: "Issue 3",
    impact: 4.2,
    frequency: "Quarterly",
    access: "Open Access",
    year: 1985,
    category: "Science",
    description: "A multidisciplinary journal covering innovative research across science and technology fields.",
    image: category1,
    author: "Dr. Jane Doe",
    authorImg: author1,
    institution: "MIT"
  },
  {
    title: "Medical Science Review",
    volume: "Volume 28",
    issue: "Issue 2",
    impact: 3.8,
    frequency: "Bimonthly",
    access: "Hybrid Access",
    year: 1995,
    category: "Medical",
    description: "Publishing cutting-edge research in clinical medicine, public health, and biomedical sciences.",
    image: category2,
    author: "Dr. John Smith",
    authorImg: author2,
    institution: "Stanford University"
  },
  {
    title: "Humanities Quarterly Review",
    volume: "Volume 15",
    issue: "Issue 4",
    impact: 2.6,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2008,
    category: "Humanities",
    description: "Exploring literature, philosophy, history, and cultural studies through interdisciplinary approaches.",
    image: category3,
    author: "Dr. Ayesha Rahman",
    authorImg: author3,
    institution: "University of Dhaka"
  },
  {
    title: "Journal of Advanced Research",
    volume: "Volume 42",
    issue: "Issue 3",
    impact: 4.2,
    frequency: "Quarterly",
    access: "Open Access",
    year: 1985,
    category: "Science & Technology",
    description:
      "A multidisciplinary journal covering innovative research across science and technology fields.",
    date: "May 18, 2023",
    author: "Dr. Jane Doe",
    image: category1,
    authorImg: author1,
    institution: "MIT, Cambridge",
  },
  {
    title: "Medical Science Review",
    volume: "Volume 28",
    issue: "Issue 2",
    impact: 3.8,
    frequency: "Bimonthly",
    access: "Hybrid Access",
    year: 1995,
    category: "Medical",
    description:
      "Cutting-edge research in clinical medicine, public health, and biomedical sciences.",
    date: "May 22, 2023",
    image: category2,
    authorImg: author2,
    author: "Dr. John Smith",
    institution: "Harvard Medical School",
  },
  {
    title: "Humanities Quarterly Review",
    volume: "Volume 15",
    issue: "Issue 4",
    impact: 2.6,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2008,
    category: "Humanities",
    description:
      "Exploring literature, philosophy, history, and cultural studies.",
    date: "May 25, 2023",
    author: "Dr. Ayesha Rahman",
     image: category3,
    authorImg: author3,
    institution: "University of Dhaka",
  },
  {
    title: "Engineering Innovations",
    volume: "Volume 11",
    issue: "Issue 1",
    impact: 3.5,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2010,
    category: "Engineering",
    description:
      "Pioneering work in mechanical, civil, and electrical engineering.",
    date: "June 2, 2023",
     image: category1,
    authorImg: author1,
    author: "Eng. Michael Lin",
    institution: "Caltech",
  },
  {
    title: "Global Education Forum",
    volume: "Volume 19",
    issue: "Issue 3",
    impact: 2.1,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2000,
    category: "Education",
    description:
      "Fostering global conversations on education innovation.",
    date: "June 5, 2023",
    author: "Prof. Sarah Lee",
     image: category2,
    authorImg: author2,
    institution: "Oxford University",
  },
  {
    title: "Social Science Digest",
    volume: "Volume 24",
    issue: "Issue 2",
    impact: 3.0,
    frequency: "Bimonthly",
    access: "Hybrid Access",
    year: 1992,
    category: "Social Science",
    description:
      "Contemporary issues in sociology, psychology, and political science.",
    date: "June 7, 2023",
    author: "Dr. Peter Khan",
     image: category3,
    authorImg: author3,
    institution: "Cambridge University",
  },
  {
    title: "Technology & Society Journal",
    volume: "Volume 10",
    issue: "Issue 1",
    impact: 2.9,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2015,
    category: "Technology",
    description:
      "Explores the intersection of emerging technologies and society.",
    date: "June 10, 2023",
    author: "Dr. Elena Moss",
     image: category1,
    authorImg: author1,
    institution: "Stanford University",
  },
  {
    title: "Public Health Journal",
    volume: "Volume 30",
    issue: "Issue 4",
    impact: 3.7,
    frequency: "Quarterly",
    access: "Hybrid Access",
    year: 2005,
    category: "Health",
    description:
      "Policy, epidemiology, and wellness studies in global health.",
    date: "June 12, 2023",
    author: "Dr. Ahmed Choudhury",
     image: category2,
    authorImg: author2,
    institution: "Johns Hopkins",
  },
  {
    title: "Computational Science Review",
    volume: "Volume 13",
    issue: "Issue 2",
    impact: 3.3,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2012,
    category: "Computer Science",
    description:
      "Developments in algorithms, simulations, and high-performance computing.",
    date: "June 15, 2023",
    author: "Dr. Rachel Kim",
     image: category3,
    authorImg: author3,
    institution: "ETH Zurich",
  },
  {
    title: "Economic Perspectives",
    volume: "Volume 21",
    issue: "Issue 3",
    impact: 2.8,
    frequency: "Bimonthly",
    access: "Open Access",
    year: 1999,
    category: "Economics",
    description:
      "Modern economic issues, policy, and market behavior.",
    date: "June 18, 2023",
    author: "Dr. Tomás Velasco",
    institution: "LSE",
     image: category1,
    authorImg: author1,
  },
  {
    title: "Law and Justice Review",
    volume: "Volume 18",
    issue: "Issue 2",
    impact: 2.4,
    frequency: "Quarterly",
    access: "Hybrid Access",
    year: 2007,
    category: "Law",
    description:
      "Legal systems, case studies, and comparative law research.",
    date: "June 21, 2023",
    author: "Dr. Laura White",
    institution: "Yale Law School",
     image: category2,
    authorImg: author2,
  },
  {
    title: "Environmental Studies Journal",
    volume: "Volume 17",
    issue: "Issue 1",
    impact: 3.1,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2013,
    category: "Environment",
    description:
      "Focus on sustainability, green tech, and climate change.",
    date: "June 25, 2023",
    author: "Dr. Surya Mehta",
    institution: "Tokyo University",
     image: category3,
    authorImg: author3,
  },
  {
    title: "Ethics in AI Review",
    volume: "Volume 9",
    issue: "Issue 1",
    impact: 3.9,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2021,
    category: "Ethics & Technology",
    description:
      "Examining ethical dilemmas and regulatory frameworks in AI.",
    date: "June 27, 2023",
    author: "Dr. Nina Elson",
    institution: "Columbia University",
     image: category1,
    authorImg: author1,
  },
  {
    title: "Behavioral Science Review",
    volume: "Volume 22",
    issue: "Issue 4",
    impact: 3.2,
    frequency: "Bimonthly",
    access: "Hybrid Access",
    year: 2010,
    category: "Psychology",
    description:
      "Covering advances in behavioral and cognitive psychology.",
    date: "June 29, 2023",
    author: "Dr. Joseph Mendez",
    institution: "UCLA",
     image: category3,
    authorImg: author3,
  },
  {
    title: "Climate Resilience Studies",
    volume: "Volume 14",
    issue: "Issue 2",
    impact: 3.6,
    frequency: "Quarterly",
    access: "Open Access",
    year: 2018,
    category: "Environmental Science",
    description:
      "Research on climate adaptation strategies and global resilience.",
    date: "July 1, 2023",
    author: "Dr. Leila Farooq",
    institution: "University of Toronto",
     image: category2,
    authorImg: author2,
  },
];

const itemsPerPage = 6;

export default function Journal_show() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(journals.length / itemsPerPage);
  const paginatedJournals = journals.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className=" py-12 ">

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedJournals.map((journal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
          >
            <img
              src={journal.image}
              alt={journal.title}
              className="w-full h-32 md:h-48 object-cover"
            />

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-sky-100 text-sky-600 px-2 py-0.5 text-sx rounded font-medium line-clamp-1">
                  {journal.category}
                </span>
                <span className="text-xs">{journal.volume} • {journal.issue}</span>
              </div>

              <h3 className="md:text-lg text-left text-base font-semibold line-clamp-2 text-slate-800 leading-snug">
                {journal.title}
              </h3>
              <p className="md:text-sm text-left text-xs text-slate-600 line-clamp-3 ">{journal.description}</p>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={journal.authorImg}
                  alt={journal.author}
                  className="md:w-10 w-8 md:h-10 h-8 rounded-full object-cover"
                />
                <div className="text-sm text-left text-slate-700">
                  <p className="font-semibold">{journal.author}</p>
                  <p className="text-xs text-slate-500">{journal.institution}</p>
                </div>
              </div>

              <Link to={`/journal/details`} className="mt-5 inline-block  text-xs md:text-sm text-sky-600 hover:underline font-medium">
                View Journal →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded text-sm border font-medium transition-all duration-200 ${
            page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          ← Prev
        </button>

        {[...Array(pageCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded border text-sm font-medium transition-all duration-200 ${
              page === index + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={page === pageCount}
          className={`px-4 py-2 rounded text-sm border font-medium transition-all duration-200 ${
            page === pageCount ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
