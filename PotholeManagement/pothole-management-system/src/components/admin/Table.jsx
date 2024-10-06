// PotholeList.js
import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import Dialog from './Dialog';
import { FaEye } from 'react-icons/fa';

export default function PotholeList() {
    const [potholes, setPotholes] = useState([]);
    const [selectedPothole, setSelectedPothole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchPotholes = async () => {
            setLoading(true);
            try {
                const data = await ApiService.getPotholesData();
                console.log(data);
                setPotholes(data);
            } catch (error) {
                console.error('Error fetching potholes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPotholes();
    }, []);

    if (loading) return <div>Loading...</div>;

    const totalPages = Math.ceil(potholes.length / pageSize);
    const currentPotholes = potholes.slice().reverse().slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Pothole Reports</h1>

            <table className="min-w-full mt-4 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2 py-2 text-center">ID</th>
                        <th className="border px-2 py-2 text-center">Image</th>
                        <th className="border px-2 py-2 text-center">City</th>
                        <th className="border px-2 py-2 text-center">Severity</th>
                        <th className="border px-2 py-2 text-center">Status</th>
                        <th className="border px-2 py-2 text-center">Reported Date</th>
                        <th className="border px-2 py-2 text-center">Action</th>
                        <th className="border px-2 py-2 text-center">User</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPotholes.map((pothole) => (
                        <tr key={pothole.potholeId} className="hover:bg-gray-100">
                            <td className="border px-2 py-2 text-center">{pothole.potholeId}</td>
                            <td className="border p-1 text-center">
                                {pothole.potholeImage ? (
                                    <img src={pothole.potholeImage} alt="Pothole" className="h-16 w-full object-cover" />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td className="border px-2 py-2 text-center">Pune</td>
                            <td className="border px-2 py-2 text-center">{pothole.severity}</td>
                            <td className="border px-2 py-2 text-center">{pothole.status}</td>
                            <td className="border px-2 py-2 text-center">{new Date(pothole.reportedDate).toLocaleDateString()}</td>
                            <td className="border px-2 py-2 text-center">
                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() => setSelectedPothole(pothole)}
                                        className="bg-green-400 text-white p-1 rounded hover:bg-blue-600"
                                    >
                                        <FaEye className="text-white h-8 w-6" />
                                    </button>
                                </div>
                            </td>
                            <td className="border px-2 py-5 flex items-center justify-center">
                                <div className="relative group">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center bg-green-400 text-white font-bold"
                                        title={pothole.user.name}
                                    >
                                        {pothole.user.name.charAt(0)}
                                    </div>
                                    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                                        {pothole.user.name}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-800 text-sm sm:text-base px-4 py-2 rounded hover:bg-gray-400"
                >
                    Previous
                </button>
                <p className="text-sm sm:text-base">
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-800 text-sm sm:text-base px-4 py-2 rounded hover:bg-gray-400"
                >
                    Next
                </button>
            </div>

            {/* Render Dialog for selected pothole */}
            <Dialog
                pothole={selectedPothole}
                onClose={() => setSelectedPothole(null)}
                onEdit={() => console.log('Edit pothole:', selectedPothole)}
            />
        </div>
    );
}
