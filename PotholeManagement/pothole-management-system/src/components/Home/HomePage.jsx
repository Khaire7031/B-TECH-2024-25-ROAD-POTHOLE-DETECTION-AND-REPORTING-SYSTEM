import React from 'react';
import Carousel from './Carousel';
import navigateImage from '../../assets/images/Navigate.png';
import { useNavigate } from 'react-router-dom';
import Advantages from './Advantages';

export default function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        var user = null;
        if (user) {
            alert("Please Login");
        } else {
            navigate("/report-pothole")
        }
    }

    return (
        <div className="bg-gradient-to-b from-blue-500 to-white flex flex-col min-h-screen">
            {/* Carousel - Full Width */}
            <div className="w-full">
                <Carousel />
            </div>

            {/* Centered Content */}
            <div className="flex flex-col items-center text-center px-2">
                <h4 className="text-xl pt-3 sm:text-2xl md:text-3xl font-bold font-roboto">
                    Pothole Management and Reporting System
                </h4>
                <p className="text-lg sm:text-xl text-gray-100 mt-2">
                    True navigation begins in the human heart.
                </p>

                {/* Buttons */}
                <div className="flex sm:p-1 lg:gap-3 space-x-2 pt-4 justify-center">
                    <button
                        onClick={() => navigate("/map/search")}
                        className="flex items-center justify-center bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base"
                    >
                        <span className="mr-2">Get Started</span>
                        <img src={navigateImage} alt="Navigate" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                        onClick={handleClick}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-sm sm:text-base"
                    >
                        Report Pothole
                    </button>
                </div>

                {/* Advantages */}
                <div className="mt-8">
                    <Advantages />
                </div>

            </div>
        </div>
    );
}
