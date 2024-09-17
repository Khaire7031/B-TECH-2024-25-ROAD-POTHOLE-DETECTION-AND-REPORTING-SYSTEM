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
            createMarker: () => null, // Disable default markers
        }).addTo(map);

        // Layer group to manage custom segments
        const segmentLayerGroup = L.layerGroup().addTo(map);

        // Define your points here
        const latlngs = [
            [18.5204, 73.8567],
            [19.9975, 73.7898],
            [19.0760, 72.8777],
            [21.1458, 79.0882]
        ];

        const colors = ['yellow', 'blue', 'green', 'red']; // Array of colors for segments

        routingControl.on('routesfound', function (e) {
            const route = e.routes[0]; // Get the first route
            const coordinates = route.coordinates; // Get the coordinates (lat, lng)
            console.log('Route Coordinates:', coordinates);

            // Clear existing polylines from the layer group
            segmentLayerGroup.clearLayers();

            // Draw each segment with different colors
            for (let i = 0; i < latlngs.length - 1; i++) {
                const segmentCoordinates = [latlngs[i], latlngs[i + 1]];
                const color = colors[i % colors.length]; // Cycle through colors

                L.polyline(segmentCoordinates, {
                    color: color,
                    weight: 4,
                    opacity: 1,
                }).addTo(segmentLayerGroup);
            }

            // Zoom the map to fit the bounds of the polylines
            const bounds = L.latLngBounds(latlngs);
            map.fitBounds(bounds);
        });

        // Disable scroll zoom
        map.scrollWheelZoom.disable();

        return () => {
            if (map && routingControl) {
                map.removeControl(routingControl);
            }
            // Clear layers on component unmount
            segmentLayerGroup.clearLayers();
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
                        zoom={5}
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
