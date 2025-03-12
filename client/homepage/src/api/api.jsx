import axios from '../hooks/useAxios.js';

export const signUpUser = async (userData) => {
    try {
        const response = await axios.post("/user/signup", userData);
        return response.data;
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        throw error;
    }
};
export const loginUser = async (userData) => {
    try {
        const response = await axios.post("/user/login", userData);
        return response.data;
    } catch (error) {
        console.error("login Error:", error.response?.data || error.message);
        throw error;
    }
};
