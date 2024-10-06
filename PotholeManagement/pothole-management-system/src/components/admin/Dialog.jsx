import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../services/ApiService';

export default function Dialog({ pothole, onClose, onEdit, onDelete }) {
    if (!pothole) return null; // Don't render anything if there's no pothole

    const [status, setStatus] = useState(pothole.status);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUpdateStatus = async () => {
        try {
            await ApiService.updatePotholeStatus(pothole.id, { status });
            alert('Pothole status updated successfully!');
            onEdit();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update pothole status. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await ApiService.deletePothole(pothole.id);
            alert('Pothole deleted successfully!');
            onDelete();
        } catch (error) {
            console.error('Error deleting pothole:', error);
            alert('Failed to delete pothole. Please try again.');
        }
    };

    // Navigate to the PotholePointMap with the pothole's location
    const handleViewOnMap = () => {
        navigate('/pothole/point', { state: { latitude: pothole.latitude, longitude: pothole.longitude } });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 dark:text-white"
                >
                    <i className="fa-solid fa-xmark text-lg"></i>
                </button>

                <div className="p-2 lg:p-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Pothole Details (ID: {pothole.id})
                    </h2>

                    <img
                        src={pothole.potholeImage}
                        alt={`Pothole ${pothole.id}`}
                        className="w-full h-32 sm:h-48 object-cover rounded mb-3"
                    />

                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        <strong>City:</strong> {pothole.city || "Pune"}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        <strong>No. of Potholes:</strong> {pothole.quantity || 3}
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        <strong>Status:</strong>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded p-1 ml-2"
                        >
                            <option value="Reported">Reported</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button
                            onClick={handleUpdateStatus}
                            className="bg-blue-600 text-white px-2 py-1 rounded ml-2 hover:bg-blue-700"
                        >
                            Update Status
                        </button>
                    </p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        <strong>Reported Date:</strong> {new Date(pothole.reportedDate).toLocaleDateString() || 'N/A'}
                    </p>

                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                        <strong>Reported By:</strong> {pothole.user.name}
                        <br />
                        <strong>Email:</strong> {pothole.user.email}
                    </p>

                    {/* View on Map button to navigate to /pothole/point */}
                    <button
                        onClick={handleViewOnMap}
                        className="flex items-center text-blue-600 text-sm sm:text-base hover:underline"
                    >
                        <i className="fa-solid fa-location-dot mr-1"></i> View on Map
                    </button>

                    {/* Edit, Delete, and Close Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onEdit}
                            className="bg-gray-300 text-gray-800 text-sm sm:text-base px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-blue-600 text-white text-sm sm:text-base px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
