import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import coordinates from './coordinates';
import './NearestPointsMap.css';

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
};

const NearestPointsMap = () => {


    const userPosition = { latitude: 18.456680, longitude: 73.879621 }; // User's position
    // const userPosition = { latitude: 18.456733, longitude: 73.881406 }; // User's position
    const [circleColor, setCircleColor] = useState("green");
    const [sortedCoordinates, setSortedCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Calculate distances and sort the coordinates
    useEffect(() => {
        const calculatedCoordinates = coordinates.map(point => {
            const distance = haversineDistance(userPosition.latitude, userPosition.longitude, point.latitude, point.longitude);
            return {
                ...point,
                distance: distance,
            };
        });

        // Sort by distance and get the nearest 5 points
        const nearestPoints = calculatedCoordinates.sort((a, b) => a.distance - b.distance).slice(0, 5);
        setSortedCoordinates(nearestPoints);

        // Step 2: Check for nearby points within 10 meters
        const nearbyPoints = nearestPoints.filter(point => point.distance <= 50);
        setCircleColor(nearbyPoints.length > 0 ? "red" : "green");

        setLoading(false);
    }, [userPosition, coordinates]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='pt-5' style={{ position: 'relative', height: '500px', width: '100%' }}>
            <MapContainer
                center={[userPosition.latitude, userPosition.longitude]}
                zoom={18}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[userPosition.latitude, userPosition.longitude]}>
                    <Popup>
                        User Is Here <br /> Latitude: {userPosition.latitude}, Longitude: {userPosition.longitude}
                    </Popup>
                </Marker>
                <Circle
                    center={[userPosition.latitude, userPosition.longitude]}
                    radius={50} // Circle radius in meters
                    color={circleColor} // Use the state for color
                    fillColor={circleColor} // Use the state for fill color
                    fillOpacity={0.1}
                />

                {sortedCoordinates.map((point, index) => (
                    <Marker key={index} position={[point.latitude, point.longitude]}>
                        <Popup>
                            Nearest Point. <br /> Latitude: {point.latitude}, Longitude: {point.longitude}, Distance: {point.distance.toFixed(2)} meters
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default NearestPointsMap;
