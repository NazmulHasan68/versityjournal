import React from 'react';
import { motion } from 'framer-motion';

export default function Aboiut_Publication() {
  const ethics = [
    {
      title: 'Plagiarism Policy',
      description:
        'All submissions are screened for plagiarism using advanced detection software. Manuscripts found to contain plagiarized content will be immediately rejected.',
    },
    {
      title: 'Conflict of Interest',
      description:
        'Authors, reviewers, and editors must disclose any potential conflicts of interest that could influence the evaluation and publication process.',
    },
    {
      title: 'Data Integrity',
      description:
        'Authors are expected to present their research data accurately and transparently, with sufficient detail to allow for verification and replication.',
    },
    {
      title: 'Authorship Criteria',
      description:
        'All individuals listed as authors must have made substantial contributions to the research and manuscript preparation, and all contributors must be properly acknowledged.',
    },
  ];

  return (
    <section className="bg-[#fefefe] dark:bg-gray-950 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6 md:mb-12">
          Publication Ethics
        </h2>

        <div className="bg-sky-50 dark:bg-sky-900 rounded-lg p-4 md:p-10 mb-12 max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base text-left leading-relaxed">
            The Academic Thesis Journal is committed to maintaining the highest standards of publication ethics and follows the guidelines established by the Committee on Publication Ethics (COPE).
          </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-6">
            {ethics.map((item, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white dark:bg-gray-900 border-l-4 border-blue-700 dark:border-blue-500 rounded-md md:p-6 p-4 shadow-md"
                >
                <h3 className="md:text-xl text-lg font-semibold text-left text-gray-900 dark:text-white mb-2 md:mb-3">
                    {item.title}
                </h3>
                <p className="text-gray-700 text-left dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                    {item.description}
                </p>
                </motion.div>
            ))}
            </div>
        </div>

      </div>
    </section>
  );
}
