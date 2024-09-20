import React, { useState, useRef } from 'react';
import start from '../../assets/images/Start.png';
import stop from '../../assets/images/stop.png';
import submit from '../../assets/images/Submit.png';
import capture from '../../assets/images/capture.png';
import locationPng from '../../assets/images/Location.png';
import ApiService from '../../services/ApiService';

export default function LeftBar() {
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

            // Detect if the user is on a mobile device
            const isMobile = /Mobi|Android/i.test(navigator.userAgent);

            // Set constraints based on device type
            const constraints = {
                video: {
                    facingMode: isMobile ? 'environment' : 'user', // 'environment' for back camera, 'user' for front camera
                },
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
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
                console.log(image);
                await ApiService.submitReport({
                    userId: 1,            // Assuming user ID is 1
                    image: image,         // Base64 encoded image
                    location: location    // Location object with latitude and longitude
                });
                setMessage('Pothole reported successfully!');
                alert("Pothole reported successfully!");
                setStream(null);  // Reset stream after reporting
                setImage(null);   // Reset image after reporting
            } catch (error) {
                setMessage('An error occurred while reporting the pothole.');
            }
        } else {
            setMessage('Please capture a photo and get the location first.');
        }
    };


    return (
        <div className="w-full lg:w-3/4 lg:p-8 p-3 bg-white rounded-xl shadow-lg">
            <h2 className="lg:text-3xl text-2xl font-extralight text-center text-gray-800 mb-6">
                Report a Pothole as user
                {/* {localStorage.getItem('role').toLowerCase()} */}
            </h2>

            <div className="flex justify-center mb-8">
                {showVideo ? (
                    <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg border" />
                ) : image ? (
                    <img src={image} alt="Captured" className="w-full max-w-md rounded-lg border" />
                ) : (
                    <div className="w-full max-w-md h-48 lg:h-64 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        No media selected
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
            </div>

            {message && (
                <div className="p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span className="font-medium">{message}</span>
                </div>
            )}

            <div className="flex flex-wrap justify-around gap-1 mt-5">
                <div className="flex flex-col items-center">
                    <button
                        onClick={startCamera}
                        className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-2 lg:px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                    >
                        <img src={start} className="h-4 lg:h-8" alt="Start Camera" />
                    </button>
                    <p className="text-center text-sm lg:text-lg mt-3 text-gray-600">Start</p>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        onClick={capturePhoto}
                        className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-2 lg:px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                    >
                        <img src={capture} className="h-4 lg:h-8" alt="Capture Photo" />
                    </button>
                    <p className="text-center text-sm lg:text-lg mt-3 text-gray-600">Capture</p>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        onClick={getLocation}
                        className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-2 lg:px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                    >
                        <img src={locationPng} className="h-4 lg:h-8" alt="Get Location" />
                    </button>
                    <p className="text-center text-sm lg:text-lg mt-3 text-gray-600">Location</p>
                </div>

                <div className="flex flex-col items-center">
                    <button
                        onClick={submitReport}
                        className="bg-blue-100 hover:bg-blue-100 text-white font-semibold px-2 lg:px-6 py-2 rounded-md shadow-md transform transition-transform duration-150 hover:scale-95 active:scale-90"
                    >
                        <img src={submit} className="h-4 lg:h-8" alt="Submit Report" />
                    </button>
                    <p className="text-center text-sm lg:text-lg mt-3 text-gray-600">Upload</p>
                </div>
            </div>
        </div>
    );
}
