import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PointOnMap = () => {
    const location = useLocation(); // Get location from router
    const navigate = useNavigate(); // Initialize useNavigate
    const { latitude, longitude } = location.state; // Extract latitude and longitude from state

    const position = [latitude, longitude]; // Use the latitude and longitude passed as props

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
                {/* Title */}
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Pothole Location</h2>
                </div>
                {/* Map Container */}
                <div style={{ height: '400px', width: '100%' }}>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                Pothole Location <br /> Latitude: {latitude}, Longitude: {longitude}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                {/* Close Button */}
                <div className="p-4 flex justify-end">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PointOnMap;
