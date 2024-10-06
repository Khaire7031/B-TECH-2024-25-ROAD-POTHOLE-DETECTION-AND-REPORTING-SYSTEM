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

    // Submit Pothole Image or report Pothole
    static async submitReport(formData) {
        console.log('FormData received for submission:', formData); // Debug line
        try {
            const response = await axios.post(`${this.BASE_URL}/pothole/report-pothole`, formData, {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'multipart/form-data',  // Set the correct content type for FormData
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error submitting report:', error.response?.data || error.message);
            throw error;
        }
    }

    //Get Pothole Data 
    static async getPotholesData() {
        try {
            const response = await axios.get(`${this.BASE_URL}/pothole/all`);
            return response.data;
        } catch (error) {
            console.error('Error in verifying OTP:', error.response?.data || error.message);
            throw error;
        }
    }

    static async updatePotholeStatus(id, data) {
        try {
            const response = await axios.put(`${this.BASE_URL}/potholes/${id}/status`, data);
            return response.data; // Return the response data from the API
        } catch (error) {
            console.error('Error updating pothole status:', error.response?.data || error.message);
            throw error; // Re-throw the error to handle it in the calling function
        }
    }

    // Delete Pothole
    static async deletePothole(id) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/potholes/${id}`);
            return response.data; // Return the response data from the API
        } catch (error) {
            console.error('Error deleting pothole:', error.response?.data || error.message);
            throw error; // Re-throw the error to handle it in the calling function
        }
    }


}