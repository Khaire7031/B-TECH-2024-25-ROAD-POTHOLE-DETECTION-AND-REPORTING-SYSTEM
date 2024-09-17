import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from './ApiService';
import OtpDialog from './OtpDialog';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showOtpDialog, setShowOtpDialog] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState('');
    const [role, setRole] = useState('');

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({ email, password });
            console.log("Responce in Login 1 : ", response, response === null);
            if (response.statusCode === 200) {
                // Show OTP dialog after successful login
                setShowOtpDialog(true);
                await ApiService.sendOtp({ email });
                setRole(response.role);
                setToken(response.token);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleOtpSuccess = () => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        navigate(from, { replace: true });
        window.location.reload()
    };

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white mt-10 mb-10 shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </div>
            {showOtpDialog && (
                <OtpDialog
                    email={email}
                    onClose={() => setShowOtpDialog(false)}
                    onSuccess={handleOtpSuccess}
                />
            )}
        </div>
    );
}

export default LoginPage;
