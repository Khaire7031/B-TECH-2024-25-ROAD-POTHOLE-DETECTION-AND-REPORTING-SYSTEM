import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Team() {
    const navigate = useNavigate();

    return (
        <div className='p-4 lg:p-14'>
            <ol className="items-center sm:flex">
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pe-8">

                        <div className="mt-4">
                            <button
                                onClick={() => navigate('/pothole/all/point')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-300 ease-in-out"
                            >
                                Explore Pothole Points
                            </button>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Discover and report potholes in your area using our interactive map.
                            </p>
                        </div>
                    </div>
                </li>
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pe-8">

                        <div className="mt-4">
                            <button
                                onClick={() => navigate('/pothole/nearest/point')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-300 ease-in-out"
                            >
                                Nearest Pothole
                            </button>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Quickly find the nearest reported pothole to your location.
                            </p>
                        </div>
                    </div>
                </li>
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3 sm:pe-8">

                        <div className="mt-4">
                            <button
                                onClick={() => navigate('/animation')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-300 ease-in-out"
                            >
                                VIIT - VIT
                            </button>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Explore dynamic VIIT - VIT road to enhance your user interface.
                            </p>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
}
