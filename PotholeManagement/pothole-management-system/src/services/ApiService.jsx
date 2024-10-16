import axios from 'axios';

export default class ApiService {
    static BASE_URL = 'http://localhost:5000';
    // https://ap-southeast-2.console.aws.amazon.com/elasticbeanstalk/home?region=ap-southeast-2#/environment/dashboard?environmentId=e-h5birhndsn
    // static BASE_URL = 'http://pothole.ap-southeast-2.elasticbeanstalk.com';


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

    static async updatePotholeStatus(potholeId, status) {
        try {
            const response = await axios.post(`${this.BASE_URL}/pothole/update-status/${potholeId}`, status, {
                headers: {
                    'Content-Type': 'text/plain',  // Sending the status as plain text
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating pothole status:', error.response?.data || error.message);
            throw error;
        }
    }

    // Delete Pothole
    static async deletePothole(id) {
        try {
            const response = await axios.post(`${this.BASE_URL}/pothole/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting pothole:', error.response?.data || error.message);
            throw error;
        }
    }



    static async getAllUsers() {
        try {
            const response = await axios.get(`${this.BASE_URL}/pothole/all/users`);
            return response.data;
        } catch (error) {
            console.error('Error in getting all Users');
            throw error;
        }
    }

}