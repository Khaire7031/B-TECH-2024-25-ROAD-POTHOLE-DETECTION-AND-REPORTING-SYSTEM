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

    // Report Pothole photo
    static async submitReport(data) {
        try {
            // Send data as JSON in the request body
            const response = await axios.post(`${this.BASE_URL}/pothole/report-pothole`, {
                image: data.image,           // Base64 encoded image string
                location: data.location,     // Location object containing latitude and longitude
                userId: data.userId          // User ID as a string or number
            }, {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'application/json',  // Specify JSON content type
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error submitting report:', error.response?.data || error.message);
            throw error;
        }
    }



}