import React, { useState, useRef } from 'react';
import start from '../../assets/images/Start.png';
import stop from '../../assets/images/stop.png';
import submit from '../../assets/images/Submit.png';
import capture from '../../assets/images/capture.png';
import locationPng from '../../assets/images/Location.png';

export default function PotholeReport() {
    const [showVideo, setShowVideo] = useState(false);
    const [stream, setStream] = useState(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [message, setMessage] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Start camera
    const startCamera = async () => {
        try {
            setShowVideo(true);
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
        } catch (error) {
            setMessage('Failed to access the camera.');
        }
    };

    // Stop camera
    const stopCamera = async () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowVideo(false);
    };

    // Capture photo
    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');
        setImage(dataURL);
        setMessage("Image captured successfully!");
        stopCamera();
    };

    // Get current location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setLocation(loc);
                    setMessage("Location retrieved successfully!");
                    console.log(loc);  // Logging the location here to ensure it's available
                },
                (error) => {
                    setMessage('Failed to get location.');
                }
            );
        } else {
            setMessage('Geolocation is not supported by this browser.');
        }
    };

    // Send data to backend
    const submitReport = async () => {
        if (image && location) {
            try {
                // const response = await fetch('/api/report-pothole', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         image: image,
                //         location: location,
                //     }),
                // });

                // const data = await response.json();

                // if (response.ok) {
                //     setMessage('Pothole reported successfully!');
                // } else {
                //     setMessage(data.message || 'Failed to report pothole.');
                // }
                setMessage('Pothole reported successfully!');
                alert("Pothole reported successfully!");
                setStream(null);
                setImage(null);
            } catch (error) {
                setMessage('An error occurred while reporting the pothole.');
            }
        } else {
            setMessage('Please capture a photo and get the location first.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 p-6 bg-gray-50 min-h-screen">
            {/* Left Sidebar */}
            <div className="w-full lg:w-1/4 p-6 bg-white rounded-xl shadow-lg">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-semibold mb-2">Number Of Reported</h3>
                    <p className="text-md text-blue-500 font-medium mt-2">
                        3700
                    </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-semibold mb-2">Box 2</h3>
                    <p className="text-sm text-gray-700">Today's Date:</p>
                    <p className="text-md text-blue-500 font-medium mt-2">
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Box 3</h3>
                    <p className="text-sm text-gray-700">Additional content or features can be added here.</p>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-3/4 p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-extralight text-center text-gray-800 mb-6">
                    Report a Pothole
                </h2>

                <div className="flex justify-center mb-8">
                    {showVideo ? (
                        <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg border" />
                    ) : image ? (
                        <img src={image} alt="Captured" className="w-full max-w-md rounded-lg border" />
                    ) : (
                        <div className="w-full max-w-md h-64 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                            No media selected
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                </div>

                {message && (
                    <div className="mt-6 text-center text-lg text-gray-700 bg-yellow-100 p-4 rounded-lg">
                        {message}
                    </div>
                )}

                <div className="flex flex-wrap justify-around gap-6 mt-8">
                    <div className="flex flex-col items-center">
                        <button
                            onClick={startCamera}
                            className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                        >
                            <img src={start} className="h-8" alt="Start Camera" />
                        </button>
                        <p className="text-center mt-3 text-gray-600">Start</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={capturePhoto}
                            className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                        >
                            <img src={capture} className="h-8" alt="Capture Photo" />
                        </button>
                        <p className="text-center mt-3">Capture</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={getLocation}
                            className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                        >
                            <img src={locationPng} className="h-8" alt="Get Location" />
                        </button>
                        <p className="text-center mt-3 text-gray-600">Location</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={submitReport}
                            className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                        >
                            <img src={submit} className="h-8" alt="Submit Report" />
                        </button>
                        <p className="text-center mt-3 text-gray-600">Upload</p>
                    </div>
                </div>
            </div>
        </div>



    );
}
