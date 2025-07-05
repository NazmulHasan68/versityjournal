import React from 'react';
import { GraduationCap, Globe, Layers3 } from 'lucide-react';

export default function About_overview() {
  return (
    <section className="bg-[#fdfcfb] dark:bg-gray-950 md:py-16 py-8 px-3 md:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] dark:text-white mb-8 text-left">
          Journal Overview
        </h2>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-8 shadow-lg border border-gray-200 dark:border-gray-800">
          <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-3 md:mb-6">
            The <span className="font-semibold text-blue-800 dark:text-blue-400">Academic Thesis Journal</span> is a peer-reviewed scholarly platform
            founded in <span className="font-semibold text-blue-800 dark:text-blue-400">2010</span> that showcases outstanding thesis research
            across disciplines. It empowers emerging scholars to contribute their innovations to the global academic community.
          </p>

          <p className="text-gray-800 dark:text-gray-300 text-sm md:text-md leading-relaxed mb-8 md:mb-12">
            We publish original research papers, literature reviews, and critical analyses that reflect
            academic excellence. Our multidisciplinary approach encourages intellectual collaboration and methodological diversity across fields.
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {/* Peer-Reviewed */}
            <div className="bg-[#f5f7fa] dark:bg-gray-800 rounded-xl  p-4 md:p-6  hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <GraduationCap className="w-7 h-7 text-blue-700 dark:text-blue-400" />
                <h3 className="md:text-xl text-md font-semibold text-gray-900 dark:text-white">
                  Peer-Reviewed
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                Every submission undergoes a rigorous double-blind peer-review process to maintain the highest academic standards.
              </p>
            </div>

            {/* Open Access */}
            <div className="bg-[#f5f7fa] dark:bg-gray-800 rounded-xl  p-4 md:p-6  hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="w-7 h-7 text-blue-700 dark:text-blue-400" />
                <h3 className="md:text-xl text-md font-semibold text-gray-900 dark:text-white">
                  Open Access
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                Research is published under an open-access model—freely accessible to scholars and readers worldwide without paywalls.
              </p>
            </div>

            {/* Multidisciplinary */}
            <div className="bg-[#f5f7fa] dark:bg-gray-800 rounded-xl p-4 md:p-6 hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Layers3 className="w-7 h-7 text-blue-700 dark:text-blue-400" />
                <h3 className="md:text-xl text-md font-semibold text-gray-900 dark:text-white">
                  Multidisciplinary
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                We welcome submissions across diverse fields, promoting interdisciplinary research and academic dialogue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
