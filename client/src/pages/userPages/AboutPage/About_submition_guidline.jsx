import React from 'react';
import { FileText, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About_submition_guidline() {
  return (
    <section className="bg-[#f8f9fa] dark:bg-gray-950 py-16 px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Submission Guidelines
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Publication Process Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-800 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Publication Process
              </h3>
            </div>
            <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <li><strong>Initial Submission:</strong> Submit via our online portal.</li>
              <li><strong>Editorial Screening:</strong> Editors check scope and quality.</li>
              <li><strong>Peer Review:</strong> Double-blind expert review.</li>
              <li><strong>Revision:</strong> Address reviewer feedback and resubmit.</li>
              <li><strong>Final Decision:</strong> Based on peer reviews.</li>
              <li><strong>Publication:</strong> Copyedited and published online.</li>
            </ol>
          </motion.div>

          {/* Manuscript Requirements Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <ListChecks className="w-6 h-6 text-blue-800 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Manuscript Requirements
              </h3>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <li>Original, unpublished work</li>
              <li>6,000–10,000 words (including references)</li>
              <li>Abstract: 200–300 words</li>
              <li>4–6 keywords</li>
              <li>APA 7th edition citation style</li>
              <li>Properly labeled figures/tables</li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-800 to-sky-700 text-white px-8 py-3 text-sm rounded-full shadow hover:shadow-md transition tracking-wide"
          >
            Submit Your Manuscript
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
