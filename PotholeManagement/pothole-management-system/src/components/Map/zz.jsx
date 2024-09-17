import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';

const Routing = ({ startCity, endCity }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map || !startCity || !endCity) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startCity.lat, startCity.lng),
                L.latLng(endCity.lat, endCity.lng),
            ],
            routeWhileDragging: true,
            geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map);

        // Listen for the 'routesfound' event
        routingControl.on('routesfound', function (e) {
            const route = e.routes[0];  // Get the first route
            const coordinates = route.coordinates; // This contains all the points (lat, lng) of the route
            console.log('Route Coordinates:', coordinates);
        });

        // Disable scroll zoom
        map.scrollWheelZoom.disable();

        return () => {
            if (map && routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, startCity, endCity]);

    return null;
};

const RenderMap = ({ startCity, endCity }) => {
    if (!startCity || !endCity) {
        return <div className="mt-6 p-4 bg-white rounded-md shadow-md">Please select both start and end cities.</div>;
    }

    return (
        <div className="mt-2 p-2 bg-white rounded-md shadow-md">
            <div className="w-full z-40 flex justify-center mt-4 p-1">
                <div className="w-full max-w-8xl z-20 h-80 sm:h-72 md:h-96 lg:h-96 bg-white shadow-lg rounded-md overflow-hidden">
                    <MapContainer
                        center={[20.5937, 78.9629]}
                        zoom={10}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Routing startCity={startCity} endCity={endCity} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default RenderMap;
