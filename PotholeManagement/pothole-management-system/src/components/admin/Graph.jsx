import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graph({ reported, inProgress, filled }) {
    // Data for the Pie/Donut Chart
    const data = {
        labels: ['Remaining', 'In Progress', 'Filled'],
        datasets: [
            {
                label: 'Pothole Status Breakdown',
                data: [reported, inProgress, filled], // Corresponding numbers
                backgroundColor: ['#1A56DB', '#31C48D', '#FACA15'], // Custom Colors
                hoverBackgroundColor: ['#1A56DB', '#31C48D', '#FACA15'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        cutout: '50%', // For donut chart
    };

    // Animation controls
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, scale: 1 });
        } else {
            controls.start({ opacity: 0.5, scale: 0.95 });
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-stretch lg:gap-4"
        >
            {/* Donut Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-full flex flex-col">
                <div style={{ width: '100%', height: '100%' }}>
                    <Doughnut data={data} options={options} />
                </div>
            </div>
        </motion.div>
    );
}
