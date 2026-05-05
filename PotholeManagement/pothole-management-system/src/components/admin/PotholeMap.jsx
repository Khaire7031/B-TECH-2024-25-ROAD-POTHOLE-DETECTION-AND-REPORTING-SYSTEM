import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import userCoordinates from './userCoordinates';
import coordinates from './coordinates'; // Your pothole coordinates

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
};

const PotholeMap = () => {
    const [currentPosition, setCurrentPosition] = useState(userCoordinates[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [circleColor, setCircleColor] = useState('green');
    const [sortedCoordinates, setSortedCoordinates] = useState([]);
    const [alertMessage, setAlertMessage] = useState('No potholes nearby');
    const [alertColor, setAlertColor] = useState('bg-green-500');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex < userCoordinates.length - 1 ? prevIndex + 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setLoading(true); // Start loading
        const newPosition = userCoordinates[currentIndex];
        setCurrentPosition(newPosition);

        const calculatedCoordinates = coordinates.map(point => {
            const distance = haversineDistance(newPosition.lat, newPosition.lng, point.latitude, point.longitude);
            return { ...point, distance: distance };
        });

        const nearestPoints = calculatedCoordinates.sort((a, b) => a.distance - b.distance).slice(0, 5);
        setSortedCoordinates(nearestPoints);

        const isNearPothole = nearestPoints.some(point => point.distance <= 10); // Adjusted radius
        setCircleColor(isNearPothole ? 'red' : 'green');

        if (isNearPothole) {
            setAlertMessage('Pothole is nearby!');
            setAlertColor('bg-red-500');
        } else {
            setAlertMessage('No potholes nearby');
            setAlertColor('bg-green-500');
        }

        setLoading(false); // Stop loading
    }, [currentIndex]);

    return (
        <div>
            <div className='pr-48 pt-14 p-3'>
                <MapContainer center={currentPosition} zoom={15} style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={currentPosition}>
                        <Popup>User's Current Position</Popup>
                    </Marker>
                    <Circle center={currentPosition} radius={10} color={circleColor} fillColor={circleColor} fillOpacity={0.4} />

                    {sortedCoordinates.map((point, index) => (
                        <Marker key={index} position={[point.latitude, point.longitude]}>
                            <Popup>
                                Nearest Pothole. <br />
                                Latitude: {point.latitude}, Longitude: {point.longitude}, Distance: {point.distance.toFixed(2)} meters
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                {loading && <p>Loading...</p>} {/* Loading message */}
            </div>
            <div>
                <div className={`fixed z-50 bottom-4 right-4 p-4 rounded-lg shadow-lg text-white transition-all duration-300 ${alertColor}`}>
                    <p>{alertMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default PotholeMap;
