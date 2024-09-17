import React, { useState, useEffect } from 'react';
import ApiService from './ApiService'; // Assuming you use an ApiService for API calls

function OtpDialog({ email, onClose, onSuccess }) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown (300 seconds)
    const [resendAvailable, setResendAvailable] = useState(false);

    // Countdown logic for 5 minutes
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setResendAvailable(true); // Enable "Resend OTP" button after 5 minutes
        }
    }, [timeLeft]);

    // Format time for display (MM:SS)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // Verify OTP function
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await ApiService.verifyOtp(email, otp); // Call API to verify OTP
            if (response.statusCode === 200) {
                onSuccess();
                onClose();
            } else {
                setError(response.message || 'Failed to verify OTP');
            }
        } catch (error) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP function
    const handleResendOtp = async () => {
        setError('');
        setLoading(true);
        try {
            const response = await ApiService.resendOtp(email); // Call API to resend OTP
            if (response.statusCode === 200) {
                setTimeLeft(300); // Reset timer to 5 minutes
                setResendAvailable(false);
            } else {
                setError('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4 sm:p-0">
            <div className="relative bg-white rounded-lg shadow-md w-full max-w-md p-6 md:p-8 mx-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">OTP Verification</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    {/* OTP Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError(''); // Clear error on input change
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                            placeholder="Enter your OTP"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Countdown Timer */}
                    <p className="text-sm text-gray-600">Time remaining: {formatTime(timeLeft)}</p>

                    {/* Buttons - Responsive Layout */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
                            disabled={loading || resendAvailable}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        {/* Resend OTP Button */}
                        {resendAvailable && (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500"
                                disabled={loading}
                            >
                                {loading ? 'Resending...' : 'Resend OTP'}
                            </button>
                        )}
                    </div>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full mt-3 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OtpDialog;
