import React, { useState } from 'react';

const products = [
    {
        id: 1,
        image: 'https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718',
        name: 'Pune',
        potholes: 3,
        status: 'Pending',
        location: '18.5204° N, 73.8567° E'
    },
    {
        id: 2,
        image: 'https://img.etimg.com/thumb/width-1200,height-900,imgsize-253138,resizemode-75,msid-94283119/news/pune-news/rs-221-crore-gone-down-the-potholes-pune-roads-remain-in-poor-condition.jpg',
        name: 'Mumbai',
        potholes: 4,
        status: 'Filled',
        location: '19.0760° N, 72.8777° E'
    },
    {
        id: 3,
        image: 'https://images.indianexpress.com/2023/07/poor-potholes.jpg?w=414',
        name: 'Viit',
        potholes: 3,
        status: 'Not Filled',
        location: '17.3850° N, 78.4867° E'
    },
    {
        id: 4,
        image: 'https://images.indianexpress.com/2023/07/poor-potholes.jpg?w=414',
        name: 'Vit',
        potholes: 10,
        status: 'Not Filled',
        location: '17.3800° N, 68.4867° E'
    }
];

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            {/* Search Section */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for locations"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Responsive Table Section */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No of Potholes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Map
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* Image */}
                                <td className="p-4">
                                    <img
                                        src={product.image}
                                        className="w-16 md:w-32 max-w-full max-h-full"
                                        alt={product.name}
                                    />
                                </td>
                                {/* Location */}
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base lg:text-lg">
                                    {product.name}
                                </td>
                                {/* Potholes */}
                                <td className="px-6 py-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                    {product.potholes}
                                </td>
                                {/* Status */}
                                <td className="px-6 py-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                    <span className={`font-semibold ${product.status === 'Pending' ? 'text-yellow-500' : product.status === 'Filled' ? 'text-green-500' : 'text-red-500'}`}>{product.status}</span>
                                </td>
                                {/* Map */}
                                <td className="px-6 py-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                    <a href={`https://www.google.com/maps?q=${product.location}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">View on Map</a>
                                </td>
                                {/* Action */}
                                <td className="px-6 py-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                    <a href="#" className="text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
