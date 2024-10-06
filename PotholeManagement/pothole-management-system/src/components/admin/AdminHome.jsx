// AdminHome.js
import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Dashboard from './Dashboard';

export default function AdminHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('dashboard');

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to handle sidebar button clicks
    const handleSidebarClick = (content) => {
        setActiveContent(content);
        setIsSidebarOpen(false); // Close the sidebar on mobile after clicking
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <AdminNavbar toggleSidebar={toggleSidebar} />

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                onClick={() => handleSidebarClick('dashboard')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="ms-3">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('kanban')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    Pro
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('inbox')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Notification</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('users')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('products')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('sign-in')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSidebarClick('other')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                            >
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main content */}
            <main className={`flex-1 p-4  sm:ml-64 transition-all ${isSidebarOpen ? 'ml-64' : ''}  dark:bg-gray-900`}>
                <h1 className="text-2xl font-bold">{activeContent.charAt(0).toUpperCase() + activeContent.slice(1)} Content</h1>
                <div className="mt-4">
                    {
                        activeContent == "dashboard" && <Dashboard />
                    }
                    {
                        activeContent == "kanban" && <h1>Kanban</h1>
                    }
                    {/* similary like this .. */}
                </div>
            </main>
        </div>
    );
}
