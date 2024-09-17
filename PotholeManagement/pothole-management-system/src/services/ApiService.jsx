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
    /** Registers a new user.     */
    static async registerUser(registration) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
            return response.data;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }

    /** Logs in a registered user  */
    static async loginUser(loginDetails) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error.response?.data || error.message);
            throw error;
        }
    }


    static async sendOtp(email) {
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/get_otp`, email);
            // const response = await axios.post(`${this.BASE_URL}/auth/get_otp`, { email });
            return response.data;
        } catch (error) {
            console.error('Error in sending OTP:', error.response?.data || error.message);
            throw error;
        }
    }

    static async verifyOtp(email, otp) {
        try {
            // const response = await axios.post(`${this.BASE_URL}/auth/verify_otp`, { email, otp });
            const response = await axios.post(`${this.BASE_URL}/auth/verify_otp`, { email, otp });
            return response.data;
        } catch (error) {
            console.error('Error in verifying OTP:', error.response?.data || error.message);
            throw error;
        }
    }
}