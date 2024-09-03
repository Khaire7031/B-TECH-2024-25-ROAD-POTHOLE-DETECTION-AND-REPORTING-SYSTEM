import axios from 'axios';

export default class ApiService {
    static BASE_URL = 'http://localhost:3000';

    static getHeader() {
        const token = localStorage.getItem('token');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    /** AUTH */

    /**
     * Registers a new user.
     * @param {Object} registration - The registration details.
     * @returns {Promise<Object>} - The response data.
     */
    static async registerUser(registration) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    /**
     * Logs in a registered user.
     * @param {Object} loginDetails - The login details.
     * @returns {Promise<Object>} - The response data.
     */
    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            return response.data; // Ensure this matches your backend's response structure
        } catch (error) {
            console.error('Error logging in user:', error.response?.data || error.message);
            throw error;
        }
    }

}