// PotholePointMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import coordinates from './coordinates';

export default function PotholePointMap() {
    const position = [18.457419, 73.892461]; // Use a central position for the map

    return (
        <div className='pt-5' style={{ height: '500px', width: '100%' }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates.map((point, index) => (
                    <Marker key={index} position={[point.latitude, point.longitude]}>
                        <Popup>
                            Pothole location. <br /> Latitude: {point.latitude}, Longitude: {point.longitude}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
