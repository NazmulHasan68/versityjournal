import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg from '@/assets/bg/bg.jpg';
import bg1 from '@/assets/bg/bg1.jpg';
import bg2 from '@/assets/bg/bg2.jpg';
import bg3 from '@/assets/bg/bg3.jpg';

const images = [bg, bg1, bg2, bg3];

export default function Home_hero_section() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per image
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            filter: 'brightness(0.4)',
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Overlay Blur Shadow */}
      <div className="absolute inset-0 bg-sky-500/20 backdrop-blur-sm z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-md leading-tight"
          style={{ fontFamily: `'Playfair Display', serif` }}
        >
          Advancing Knowledge Through Academic Excellence
        </h1>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 max-w-3xl mb-6 drop-shadow">
          A peer-reviewed journal publishing groundbreaking research and scholarly articles across disciplines.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-sky-500 hover:bg-sky-600 transition px-4 py-2 text-sm sm:text-base text-white rounded-md font-semibold shadow-md">
            Browse Latest Issue
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600 transition px-4 py-2 text-sm sm:text-base rounded-md font-semibold shadow-md">
            Submit Research
          </button>
        </div>
      </div>
    </section>
  );
}
