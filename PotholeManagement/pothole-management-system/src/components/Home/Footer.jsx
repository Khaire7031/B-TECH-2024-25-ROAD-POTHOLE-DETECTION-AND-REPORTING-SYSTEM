import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer
            className="bg-gradient-to-r z-110 from-blue-500 to-purple-500 text-white mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="w-full max-w-screen-xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between text-center sm:text-left space-y-4 sm:space-y-0">
                    <motion.a
                        href="https://flowbite.com/"
                        className="flex items-center justify-center space-x-3 rtl:space-x-reverse"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-10 w-10"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-3xl font-bold whitespace-nowrap">Pranav</span>
                    </motion.a>
                    <ul className="flex flex-col sm:flex-row items-center text-sm font-medium space-y-4 sm:space-y-0 sm:space-x-6 dark:text-gray-300">
                        {['About', 'Team', 'Contact Us'].map((text, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <a
                                    href="#"
                                    className="hover:text-blue-200 transition-colors duration-200"
                                >
                                    {text}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <hr className="my-8 border-gray-300 sm:mx-auto lg:my-10" />
                <div className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between space-y-4 sm:space-y-0">
                    <span className="text-sm text-gray-200">
                        © 2023 <a href="https://flowbite.com/" className="hover:underline">Pranav™</a>. All Rights Reserved.
                    </span>
                    <div className="flex space-x-4">
                        {[
                            {
                                href: "#",
                                path: "M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-4.94-2.44a3.564 3.564 0 0 0-1.11-.61A5.09 5.09 0 0 0 18 7a1 1 0 0 0-.63-.91A1.002 1.002 0 0 0 16 7a3.972 3.972 0 0 0-2.72 1.41C11.7 7.24 10.36 6 8 6a4 4 0 0 0-4 4v1.72A3.993 3.993 0 0 0 2 14c0 2.21 1.79 4 4 4h9c2.21 0 4-1.79 4-4 0-.95-.36-1.82-.94-2.44zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
                            },
                            {
                                href: "#",
                                path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5.19 3.94 9.45 8.96 9.95v-7.02h-2.7V12h2.7v-2.31c0-2.7 1.63-4.21 4.11-4.21 1.18 0 2.41.21 2.41.21v2.65h-1.36c-1.34 0-1.75.83-1.75 1.68V12h2.98l-.48 2.93h-2.5v7.02C18.06 21.45 22 17.19 22 12z"
                            },
                            {
                                href: "#",
                                path: "M21.35 11.1l-9.11-9.1c-.5-.51-1.15-.76-1.82-.76s-1.32.25-1.82.76l-9.1 9.11c-.51.5-.76 1.16-.76 1.83s.25 1.32.76 1.82l9.11 9.11c.5.51 1.16.76 1.83.76s1.32-.25 1.82-.76l9.1-9.11c.51-.5.76-1.16.76-1.83s-.25-1.32-.76-1.83z"
                            }
                        ].map((icon, index) => (
                            <motion.a
                                key={index}
                                href={icon.href}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="hover:text-blue-200 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={icon.path}></path>
                                </svg>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
