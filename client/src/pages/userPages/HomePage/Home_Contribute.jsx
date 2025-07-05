import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home_Contribute() {
  return (
    <section className="bg-sky-200 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-sky-800 mb-4 font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contribute to Scholarly Horizons
        </motion.h2>

        <motion.p
          className="text-slate-600 text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Share your research with our global academic community. We welcome
          submissions across all disciplines.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/guidelines"
            className="px-6 py-3 bg-white text-sky-700 border border-sky-300 rounded-md font-medium hover:bg-sky-100 transition shadow-sm"
          >
            Submission Guidelines
          </Link>
          <Link
            to="/submit"
            className="px-6 py-3 bg-sky-600 text-white rounded-md font-semibold hover:bg-sky-700 transition shadow"
          >
            Submit Your Manuscript
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
