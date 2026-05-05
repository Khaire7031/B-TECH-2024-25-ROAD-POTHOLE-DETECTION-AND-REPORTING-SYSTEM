import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); // Add error state

    // Fetch users from the backend when the component mounts
    useEffect(() => {
        async function fetchUsers() {
            try {
                const userData = await ApiService.getAllUsers();
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.'); // Set error message
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {error && <div className="text-red-500">{error}</div>} {/* Display error */}

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Email</th>
                        <th scope="col" className="px-6 py-3">Phone Number</th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {user.id}
                            </td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{user.email}</td>
                            <td className="px-6 py-4">{user.phoneNumber}</td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
