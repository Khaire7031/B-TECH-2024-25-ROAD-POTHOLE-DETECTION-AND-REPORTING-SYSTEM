import React from 'react';
import Graph from './Graph';
import Table from './Table';

export default function Dashboard() {
    // Total number of potholes and their status breakdown
    const totalPotholes = 1000;
    const inProgress = 300;
    const filled = 200;
    const reported = totalPotholes - inProgress - filled; // Remaining = 500

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* Pie Graph */}
            <div>
                <Graph reported={reported} inProgress={inProgress} filled={filled} />
            </div>

            {/* Title and Button */}
            <div className='flex flex-col items-start w-full'>
                <div className='text-white flex items-center w-full p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700'>
                    <i className="fa-solid fa-server font-bold w-5 mr-2"></i>
                    <div className='font-medium'>Pothole Table</div>
                </div>

                {/* Table */}
                <div className="w-full">
                    <Table />
                </div>

            </div>
        </div >
    );
}
