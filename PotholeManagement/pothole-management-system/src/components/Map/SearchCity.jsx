import React, { useState } from 'react';
import mapImage from '../../assets/images/Map.png';
import cities from './data'; // Make sure the path is correct
import RenderMap from './RenderMap';
import { motion } from 'framer-motion';

export default function SearchCity() {
    const [startCity, setStartCity] = useState(null);
    const [endCity, setEndCity] = useState(null);

    const handleStartCityChange = (e) => {
        const city = cities.find(city => city.city === e.target.value);
        setStartCity(city || null);
    };

    const handleEndCityChange = (e) => {
        const city = cities.find(city => city.city === e.target.value);
        setEndCity(city || null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Container with responsive height */}
            <div
                className="flex items-center justify-center h-[30vh] lg:h-[50vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${mapImage})` }}
            >
                <div className="w-full max-w-xl p-4 md:p-6 rounded-lg">
                    {/* Container for Select Elements */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Start City Select */}
                        <div className='flex items-center gap-2 p-2 bg-white rounded-md shadow-md flex-1'>
                            <div className='text-gray-700 text-xl md:text-2xl'>
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <select
                                id="start-city"
                                className="w-full bg-transparent border-none p-1 md:p-2 rounded-md focus:outline-none text-sm md:text-base"
                                value={startCity ? startCity.city : ''}
                                onChange={handleStartCityChange}
                            >
                                <option value="" disabled>Source</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city.city}>{city.city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Conditionally Render End City Select */}
                        {startCity && (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-md shadow-md flex-1">
                                <div className='text-gray-700 text-xl md:text-2xl'>
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <select
                                    id="end-city"
                                    className="w-full bg-transparent border-none p-1 md:p-2 rounded-md focus:outline-none text-sm md:text-base"
                                    value={endCity ? endCity.city : ''}
                                    onChange={handleEndCityChange}
                                >
                                    <option value="" disabled>Destination</option>
                                    {cities
                                        .filter(city => city.city !== startCity.city)  // Exclude the selected start city
                                        .map((city, index) => (
                                            <option key={index} value={city.city}>{city.city}</option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* RenderMap Component */}
            <RenderMap startCity={startCity} endCity={endCity} />
        </motion.div>
    );
}
