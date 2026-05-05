import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const countUp = (start, end, duration, setCounts, index) => {
    const startTime = Date.now();

    const updateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (end - start) + start);

        setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = current;
            return newCounts;
        });

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    };

    requestAnimationFrame(updateCount);
};

export default function Data() {
    const { ref, inView } = useInView({ triggerOnce: true });
    const controls = useAnimation();
    const [counts, setCounts] = useState([0, 0, 0, 0]);

    useEffect(() => {
        if (inView) {
            controls.start({ scale: 1, opacity: 1 });
            const duration = 2000; // 2 seconds
            const values = [121233, 100020, 19000, 400];

            values.forEach((value, index) => {
                countUp(0, value, duration, setCounts, index);
            });
        }
    }, [inView, controls]);

    const data = [
        { title: 'Number of Pothole', value: counts[0] },
        { title: 'Number of Active Pothole', value: counts[1] },
        { title: 'Done', value: counts[2] },
        { title: 'By Yours', value: counts[3] },
    ];

    return (
        <div ref={ref} className="p-8 bg-white dark:bg-gray-800">
            {/* Adjust the grid for different screen sizes */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={controls}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 text-center transform hover:scale-105 hover:border-blue-500 hover:shadow-xl transition-transform"
                    >
                        <h3 className="text-base font-semibold lg:text-xl text-gray-900 dark:text-white">
                            {item.title}
                        </h3>
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
                            {item.value.toLocaleString()}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
