import React from 'react';
import Carousel from './Carousel';
import navigateImage from '../../assets/images/Navigate.png';
import { useNavigate } from 'react-router-dom';

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
        <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-white">
            <div className="absolute inset-0 bg-cover bg-center">
                <div className="flex flex-col items-center justify-center text-center">
                    <Carousel />
                    <h4 className="text-xl pt-3 sm:text-2xl md:text-3xl font-bold font-roboto">
                        Pothole Management and Reporting System
                    </h4>
                    <p className="text-xl">
                        True navigation begins in the human heart.
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <button onClick={() => navigate("/map")} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
                            <span className="mr-2">Get Started</span>
                            <img src={navigateImage} alt="Navigate" className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button onClick={handleClick} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-sm sm:text-base">
                            Report Pothole
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
