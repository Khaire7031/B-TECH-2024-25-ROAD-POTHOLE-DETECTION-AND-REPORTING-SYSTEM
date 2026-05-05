import React from 'react';

export default function Advantages() {
    const dummyData = [
        {
            id: 1,
            title: 'Real-Time Detection',
            description: 'Instant pothole identification using advanced machine learning and image processing.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Large_pot_hole_on_2nd_Avenue_in_New_York_City.JPG',
        },
        {
            id: 2,
            title: 'Smart Navigation',
            description: 'Seamless integration with navigation apps to suggest the safest routes, avoiding road hazards.',
            img: 'https://mapmetrics.org/wp-content/uploads/2024/04/A-high-resolution-image-of-a-sophisticated-GPS-navigation-system.jpg',
        },
        {
            id: 3,
            title: "Efficient Maintenance",
            description: 'Automated reporting and centralized data storage to help municipalities prioritize repairs.',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_Ec-KvyOW7ixB5HzCOYE_-ypyTfDAGVJXw&s',
        },
    ];

    return (
        <div className="p-4 mx-auto h-fit bg-white dark:bg-gray-800 overflow-hidden">
            {/* Card container with grid layout */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dummyData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 hover:border-blue-500 hover:shadow-xl"
                    >
                        <a href="#">
                            <img className="rounded-t-lg w-full h-48 object-cover" src={item.img} alt={item.title} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {item.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
