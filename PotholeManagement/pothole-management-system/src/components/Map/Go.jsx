import React from 'react';

export default function Go() {
    const locations = [
        { id: 0, lat: 18.45621, lng: 73.87908 },
        { id: 1, lat: 18.45663, lng: 73.87902 },
        { id: 2, lat: 18.45663, lng: 73.87902 },
        { id: 3, lat: 18.4566, lng: 73.87827 },
        { id: 4, lat: 18.45694, lng: 73.87818 },
        { id: 5, lat: 18.45717, lng: 73.87812 },
        { id: 6, lat: 18.45742, lng: 73.87806 },
        { id: 7, lat: 18.45762, lng: 73.87802 },
        { id: 8, lat: 18.45766, lng: 73.87801 },
        { id: 9, lat: 18.45808, lng: 73.87795 },
        { id: 10, lat: 18.45827, lng: 73.87792 },
        { id: 11, lat: 18.45932, lng: 73.87777 },
        { id: 12, lat: 18.45962, lng: 73.87773 },
        { id: 13, lat: 18.45994, lng: 73.87769 },
        { id: 14, lat: 18.46012, lng: 73.87769 },
        { id: 15, lat: 18.46018, lng: 73.87769 },
        { id: 16, lat: 18.46078, lng: 73.87767 },
        { id: 17, lat: 18.46109, lng: 73.87767 },
        { id: 18, lat: 18.46118, lng: 73.87767 },
        { id: 19, lat: 18.46117, lng: 73.87713 },
        { id: 20, lat: 18.46117, lng: 73.87699 },
        { id: 21, lat: 18.46117, lng: 73.87641 },
        { id: 22, lat: 18.46117, lng: 73.87624 },
        { id: 23, lat: 18.46118, lng: 73.87542 },
        { id: 24, lat: 18.46118, lng: 73.87519 },
        { id: 25, lat: 18.46119, lng: 73.87416 },
        { id: 26, lat: 18.46119, lng: 73.87404 },
        { id: 27, lat: 18.46119, lng: 73.87374 },
        { id: 28, lat: 18.46119, lng: 73.87358 },
        { id: 29, lat: 18.46119, lng: 73.87353 },
        { id: 30, lat: 18.46119, lng: 73.87348 },
        { id: 31, lat: 18.46119, lng: 73.87345 },
        { id: 32, lat: 18.46117, lng: 73.87314 },
        { id: 33, lat: 18.46116, lng: 73.87273 },
        { id: 34, lat: 18.46114, lng: 73.87242 },
        { id: 35, lat: 18.4611, lng: 73.87154 },
        { id: 36, lat: 18.4611, lng: 73.87147 },
        { id: 37, lat: 18.46107, lng: 73.87096 },
        { id: 38, lat: 18.46106, lng: 73.87071 },
        { id: 39, lat: 18.46106, lng: 73.87064 },
        { id: 40, lat: 18.46105, lng: 73.87046 },
        { id: 41, lat: 18.46104, lng: 73.87028 },
        { id: 42, lat: 18.46103, lng: 73.8701 },
        { id: 43, lat: 18.46093, lng: 73.86952 },
        { id: 44, lat: 18.46093, lng: 73.86951 },
        { id: 45, lat: 18.4609, lng: 73.8691 },
        { id: 46, lat: 18.46087, lng: 73.86859 },
        { id: 47, lat: 18.46089, lng: 73.86818 },
        { id: 48, lat: 18.46089, lng: 73.86792 },
        { id: 49, lat: 18.46092, lng: 73.86766 },
        { id: 50, lat: 18.46093, lng: 73.86758 },
        { id: 51, lat: 18.46095, lng: 73.8675 },
        { id: 52, lat: 18.46106, lng: 73.86749 },
        { id: 53, lat: 18.46121, lng: 73.86748 },
        { id: 54, lat: 18.46154, lng: 73.86745 },
        { id: 55, lat: 18.46189, lng: 73.86741 },
        { id: 56, lat: 18.46205, lng: 73.8674 },
        { id: 57, lat: 18.46228, lng: 73.86738 },
        { id: 58, lat: 18.46229, lng: 73.86754 },
        { id: 59, lat: 18.46232, lng: 73.86781 },
        { id: 60, lat: 18.4627, lng: 73.86777 },
        { id: 61, lat: 18.46326, lng: 73.86771 }
    ];

    return (
        <div>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Location #</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Map Link</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>{location.lat}</td>
                            <td>{location.lng}</td>
                            <td>
                                <a
                                    href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on Map
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
