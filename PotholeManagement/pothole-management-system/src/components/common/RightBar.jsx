import React from 'react'

export default function RightBar() {
    return (
        <div className="w-full lg:w-1/4 p-6 bg-white rounded-xl shadow-lg">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2">Number Of Reported</h3>
                <p className="text-md text-blue-500 font-medium mt-2">
                    3700
                </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold mb-2">Box 2</h3>
                <p className="text-sm text-gray-700">Today's Date:</p>
                <p className="text-md text-blue-500 font-medium mt-2">
                    {new Date().toLocaleDateString()}
                </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Box 3</h3>
                <p className="text-sm text-gray-700">Additional content or features can be added here.</p>
            </div>
        </div>
    )
}
