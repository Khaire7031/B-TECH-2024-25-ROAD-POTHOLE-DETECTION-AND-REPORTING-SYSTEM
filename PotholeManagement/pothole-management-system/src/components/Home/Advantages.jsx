import React from 'react';

export default function Advantages() {
    const cardData = [
        {
            title: "Technology Acquisitions 2021",
            description: "Here are the biggest enterprise ."
        },
        {
            title: "AI in Healthcare",
            description: "How artificial intelligence."
        },
        {
            title: "Future of Remote Work",
            description: "The future of remote work."
        },
        {
            title: "Blockchain Innovations",
            description: "Exploring the most."
        },
        {
            title: "Green Software",
            description: "Why green software development ."
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-xs mx-auto sm:max-w-sm"
                    >
                        <a href="#">
                            <img
                                className="w-full h-40 object-cover sm:h-48 rounded-t-lg"
                                src="https://media.licdn.com/dms/image/D5612AQHLtCeugUAmgg/article-cover_image-shrink_720_1280/0/1695379593018?e=2147483647&v=beta&t=ihG02-RLuMpGY_xILbRN-xC3JM4t5ILKL6IR2uvAKBg"
                                alt="Common Image"
                            />
                        </a>
                        <div className="p-3 sm:p-5">
                            <a href="#">
                                <h5 className="mb-2 text-sm sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {card.title}
                                </h5>
                            </a>
                            <p className="mb-3 text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-400">
                                {card.description}
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
