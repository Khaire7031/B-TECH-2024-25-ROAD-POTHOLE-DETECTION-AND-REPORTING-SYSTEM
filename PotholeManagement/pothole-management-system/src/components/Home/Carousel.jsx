import React, { useState, useEffect } from 'react';
import C2 from '../../assets/C2.png';
import C1 from '../../assets/C1.png';


const slides = [
    { id: 1, title: 'Pothole Identification', description: 'Identify and report potholes in the system.', imgSrc: C1 },
    { id: 2, title: 'Repair Process', description: 'Track the repair process from start to finish.', imgSrc: C2 },
    { id: 3, title: 'Maintenance Overview', description: 'Get an overview of all completed and pending maintenance.', imgSrc: C1 }
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <div className="relative w-full">
            <div className="relative h-56 overflow-hidden md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={slide.imgSrc} className="w-full h-full object-cover" alt={`Slide ${slide.id}`} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="text-center text-white p-4">
                                <h2 className="text-4xl font-bold">{slide.title}</h2>
                                <p className="mt-2">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
