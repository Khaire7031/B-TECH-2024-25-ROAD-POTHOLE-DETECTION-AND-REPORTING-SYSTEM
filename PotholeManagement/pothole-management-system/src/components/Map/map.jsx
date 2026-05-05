import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const Routing = ({ startCity, endCity }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startCity.lat, startCity.lng),
                L.latLng(endCity.lat, endCity.lng),
            ],
            routeWhileDragging: true,
            showAlternatives: true,
            fitSelectedRoutes: true,
            geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map);

        routingControl.on('routesfound', (e) => {
            const route = e.routes[0]; // Get the first found route
            const coordinates = route.coordinates.map((coord) => ({
                lat: coord.lat,
                lng: coord.lng,
            }));

            console.log('Route coordinates:', coordinates);

            // You can process the coordinates further if needed
        });

        return () => {
            if (map && routingControl) {
                map.removeControl(routingControl);
            }
        };
    }, [map, startCity, endCity]);

    return null;
};

const MapRoad = () => {
    const viit = { city: 'Viit', lat: 18.4568308, lng: 73.8832905 };
    const vit = { city: 'Vit', lat: 18.4636, lng: 73.8682 };
    // const Dmart = { city: 'Dmart', lat: 18.4571962, lng: 73.891587 };

    return (
        <div className="w-full h-screen">
            <MapContainer
                center={[18.4561739, 73.878775]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Routing startCity={viit} endCity={vit} />
            </MapContainer>
        </div>
    );
};

export default MapRoad;
