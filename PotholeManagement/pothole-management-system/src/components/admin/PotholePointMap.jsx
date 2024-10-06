import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation for accessing state
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PotholePointMap() {
    const location = useLocation(); // Get the location object
    const { latitude, longitude } = location.state; // Extract latitude and longitude from state

    // Round latitude and longitude to 4 decimal places
    const roundedLatitude = parseFloat(latitude).toFixed(4);
    const roundedLongitude = parseFloat(longitude).toFixed(4);

    const position = [latitude, longitude]; // Use the rounded coordinates for the map position
    // const position = [roundedLatitude, roundedLongitude]; // Use the rounded coordinates for the map position

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Pothole location. <br /> Latitude: {roundedLatitude}, Longitude: {roundedLongitude}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
