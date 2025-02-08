import axios from 'axios';

const BASE_URL = "http://localhost:5271/api/user/";

class UserServices {
    // Helper function to get the token from sessionStorage
    getAuthHeaders() {
        const token = sessionStorage.getItem("jwtToken");
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    // Fetch all properties with Authorization header
    async getAllProperties() {
        const res = await axios.get(BASE_URL + "Properties", this.getAuthHeaders());
        return res;
    }

    // Fetch property details by ID with Authorization header
    getPropertyDetailsByID(pid) {
        const id = parseInt(pid);
        return axios.get(BASE_URL + `Property/${id}`, this.getAuthHeaders());
    }

    // Add a review with Authorization header
    async addReview(review) {
        return await axios.post(BASE_URL + "Reviews", review, this.getAuthHeaders());
    }
}

export default new UserServices();
