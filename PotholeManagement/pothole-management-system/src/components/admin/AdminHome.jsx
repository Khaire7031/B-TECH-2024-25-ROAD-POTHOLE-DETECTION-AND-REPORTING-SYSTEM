import React, { useState } from 'react';
import menu from '../../assets/images/Menu.png';
import cross from '../../assets/images/Cross.png';
import analytics from '../../assets/images/Analytics.png';
import dashboard from '../../assets/images/Dashboard.png';
import Report from '../../assets/images/Report.png';
import clsx from 'clsx';
import Dashboard from './Dashboard';

export default function AdminHome() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('Dashboard'); // State to manage the current view

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleNavigation = (view) => {
        setCurrentView(view);
        closeSidebar(); // Close the sidebar on navigation
    };

    return (
        <div className="flex">
            {/* Sidebar for PC and mobile */}
            <aside
                id="logo-sidebar"
                className={clsx(
                    'fixed left-0 mb-5 z-40 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                    'sm:translate-x-0 sm:relative sm:w-[20rem]'
                )}
                aria-label="Sidebar"
                aria-expanded={sidebarOpen}
            >
                <div className="h-full mt-5 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                onClick={() => handleNavigation('Dashboard')}
                                className="flex  items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img className='w-6 h-6' src={dashboard} alt="Close" />
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleNavigation('Analytics')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img className='w-6 h-6' src={analytics} alt="Analytics" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Analytics</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleNavigation('Report')}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img className='w-6 h-6' src={Report} alt="Report" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
                            </a>
                        </li>
                        {
                            sidebarOpen && <li>
                                <a
                                    href="#"
                                    onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        <img className='w-6 h-6' src={cross} alt="Close" />
                                    </span>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 p-4 transition-transform sm:ml-0">
                {/* Toggle button for mobile view */}
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 sm:hidden"
                    aria-label="Toggle Sidebar"
                >
                    <img src={menu} alt="Menu" className='h-8 w-8' />
                </button>

                {/* Render content based on current view */}
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-0">
                    {currentView === 'Dashboard' && <Dashboard />}
                    {currentView === 'Analytics' && <h1>Analytics Content</h1>}
                    {currentView === 'Report' && <h1>Report Content</h1>}
                </div>
            </div>
        </div>
    );
}
