import React from "react";
import { motion } from "framer-motion";
import category1 from "@/assets/bg/catagory.jpg";
import category2 from "@/assets/bg/catagory1.jpg";
import category3 from "@/assets/bg/catagory2.jpg";
import author1 from "@/assets/bg/bg1.jpg";
import author2 from "@/assets/bg/bg2.jpg";
import author3 from "@/assets/bg/bg3.jpg";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    id: 1,
    image: category1,
    category: "Science",
    date: "May 18, 2023",
    title: "Quantum Computing Applications in Climate Modeling",
    excerpt:
      "A novel approach to utilizing quantum algorithms for improving the accuracy of climate prediction models.",
    author: "Dr. Jane Doe",
    institution: "MIT, Cambridge",
    authorImg: author1,
  },
  {
    id: 2,
    image: category2,
    category: "Technology",
    date: "May 22, 2023",
    title: "AI-Powered Medical Diagnosis and Patient Outcomes",
    excerpt:
      "Exploring how artificial intelligence improves diagnostic accuracy and enhances patient care efficiency.",
    author: "Dr. John Smith",
    institution: "Stanford University",
    authorImg: author2,
  },
  {
    id: 3,
    image: category3,
    category: "Social Sciences",
    date: "May 25, 2023",
    title: "Behavioral Economics in Post-Pandemic Policy Making",
    excerpt:
      "An in-depth look at how behavioral insights shape government responses to global economic challenges.",
    author: "Dr. Ayesha Rahman",
    institution: "University of Dhaka",
    authorImg: author3,
  },
];

export default function Home_features_aritical() {
  return (
    <div className="bg-white">
        <section className="max-w-7xl mx-auto px-4  py-12">
        {/* Heading */}
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 font-serif">
            Featured Articles
            </h2>
            <p className="text-slate-500 mt-3 text-base md:text-lg">
            Highlighting the most impactful research from our latest issue
            </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
            <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
            >
                <img
                src={article.image}
                alt={article.title}
                className="w-full h-32 md:h-48 object-cover"
                />

                <div className="p-5 space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="bg-sky-100 text-sky-600 px-2 py-0.5 rounded font-medium">
                    {article.category}
                    </span>
                    <span>{article.date}</span>
                </div>

                <h3 className="md:text-lg text-base font-semibold line-clamp-2 text-slate-800 leading-snug">
                    {article.title}
                </h3>
                <p className="md:text-sm text-xs text-slate-600 line-clamp-3 ">{article.excerpt}</p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-4">
                    <img
                    src={article.authorImg}
                    alt={article.author}
                    className="md:w-10 w-8 md:h-10 h-8 rounded-full object-cover"
                    />
                    <div className="text-sm text-slate-700">
                    <p className="font-semibold">{article.author}</p>
                    <p className="text-xs text-slate-500">{article.institution}</p>
                    </div>
                </div>

                <button className="mt-5 inline-block text-xs md:text-sm text-sky-600 hover:underline font-medium">
                    Read Full Article →
                </button>
                </div>
            </motion.div>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
            <Link to={'/journal'} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md text-sm font-medium shadow">
            View All Articles
            </Link>
        </div>

        </section>
    </div>
  );
}
