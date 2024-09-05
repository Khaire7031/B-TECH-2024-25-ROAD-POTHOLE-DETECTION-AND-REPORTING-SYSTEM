import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder";
import cities from "./data"; // Import cities from data.jsx

const Routing = ({ startCity, endCity }) => {
    const map = useMap();

    useState(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startCity.lat, startCity.lng),
                L.latLng(endCity.lat, endCity.lng),
            ],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map);

        map.scrollWheelZoom.disable();

        return () => {
            if (map && routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, startCity, endCity]);

    return null;
};

const MapComponent = () => {
    const [selectedStartCity, setSelectedStartCity] = useState("");
    const [selectedEndCity, setSelectedEndCity] = useState("");
    const [startCity, setStartCity] = useState(null);
    const [endCity, setEndCity] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);

    const findCityCoordinates = (cityName) => {
        const city = cities.find((c) => c.city.toLowerCase() === cityName.toLowerCase());
        if (city) {
            return { lat: parseFloat(city.lat), lng: parseFloat(city.lng) };
        } else {
            alert(`City ${cityName} not found in the predefined list`);
            return null;
        }
    };

    const handleFindRoute = () => {
        const startCoords = findCityCoordinates(selectedStartCity);
        const endCoords = findCityCoordinates(selectedEndCity);

        if (startCoords && endCoords) {
            setStartCity(startCoords);
            setEndCity(endCoords);
            setMapVisible(true);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            {/* Form Container */}
            <div className="w-full p-4 bg-gradient-to-r from-blue-300 to-blue-500 text-white flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
                    <select
                        id="startCity"
                        className="rounded-md px-4 py-2 text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        value={selectedStartCity}
                        onChange={(e) => setSelectedStartCity(e.target.value)}
                    >
                        <option value="" disabled>Select City</option>
                        {cities.map((city) => (
                            <option key={city.city} value={city.city}>{city.city}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
                    <select
                        id="endCity"
                        className="rounded-md px-4 py-2 text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        value={selectedEndCity}
                        onChange={(e) => setSelectedEndCity(e.target.value)}
                    >
                        <option value="" disabled>Select City</option>
                        {cities.map((city) => (
                            <option key={city.city} value={city.city}>{city.city}</option>
                        ))}
                    </select>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md m-2 w-full md:w-auto transition duration-150 ease-in-out"
                    onClick={handleFindRoute}
                >
                    Find Route
                </button>
            </div>

            {/* Map Container */}
            {mapVisible && (
                <div className="w-full z-40 flex justify-center mt-4 p-2">
                    <div className="w-full max-w-6xl h-80 sm:h-72 md:h-96 lg:h-96 bg-white shadow-lg rounded-md overflow-hidden">
                        <MapContainer
                            center={[20.5937, 78.9629]} // Center map on India
                            zoom={5}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {startCity && endCity && (
                                <Routing startCity={startCity} endCity={endCity} />
                            )}
                        </MapContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
