import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";

const metrics = [
  { label: "Impact Factor", value: 3.8 },
  { label: "CiteScore", value: 21 },
  { label: "Articles Published", value: 872 },
  { label: "Weeks to First Decision", value: 4.2 },
];

function AnimatedCounter({ target }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      animate(motionValue.get(), target, {
        duration: 2,
        onUpdate: (latest) => motionValue.set(latest),
      });
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setCount(Number.isInteger(target) ? Math.round(latest) : latest.toFixed(1));
    });
    return () => unsubscribe();
  }, [springValue, target]);

  return (
    <motion.div
      ref={ref}
      className="md:text-4xl text-3xl font-bold text-sky-600 mb-1 md:mb-3"
      aria-label={`${count} ${target}`}
    >
      {count}
    </motion.div>
  );
}

export default function Home_Journal_merits() {
  return (
    <section className="bg-gradient-to-r from-sky-100 via-white to-sky-100 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-sky-900 mb-4 tracking-wide">
          Journal Metrics
        </h2>
        <p className="text-slate-700 text-lg md:text-xl mb-14 max-w-3xl mx-auto">
          A quick glance at our journal’s performance indicators.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
              className="bg-white md:rounded-3xl rounded-xl shadow-xl border border-sky-200 md:p-10 p-6 flex flex-col items-center justify-center"
              role="group"
              aria-labelledby={`metric-label-${idx}`}
            >
              <AnimatedCounter target={metric.value} />
              <p
                id={`metric-label-${idx}`}
                className="md:text-lg text-sm font-semibold text-sky-800 mt-2"
              >
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
