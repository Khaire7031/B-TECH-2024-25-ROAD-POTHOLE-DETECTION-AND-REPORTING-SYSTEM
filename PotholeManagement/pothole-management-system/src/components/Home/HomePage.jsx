import React from 'react';
import Carousel from './Carousel';

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-200 to-white">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('path/to/your/background-image.jpg')` }}>
                <Carousel />
                <h4 className="text-2xl font-bold mb-4 font-roboto">Pothole Management and Navigation System</h4>
            </div>
        </div>
    );
}
