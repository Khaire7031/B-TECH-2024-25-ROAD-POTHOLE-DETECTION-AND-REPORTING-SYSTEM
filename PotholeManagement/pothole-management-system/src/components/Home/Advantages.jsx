import React from 'react';

export default function Advantages() {
    const dummyData = [
        {
            id: 1,
            title: 'Noteworthy technology acquisitions 2021',
            description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
            img: 'https://sb.ecobnb.net/app/uploads/sites/3/2020/01/nature.jpg',
        },
        {
            id: 2,
            title: 'Sustainable Development Goals 2022',
            description: 'The UN SDGs aim to create a better future for all, covering various global challenges.',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1200px-Altja_j%C3%B5gi_Lahemaal.jpg',
        },
        {
            id: 3,
            title: 'Innovative Tech Solutions 2023',
            description: 'Discover the newest innovations in technology this year that are changing the world.',
            img: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg',
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
                            <a
                                href="#"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
