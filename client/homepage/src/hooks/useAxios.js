import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
    timeout:10000,
    headers:{
        "Content-Type": "application/json",
    },
    
})

export const loginUser = async (userData) => {
    try {
      const response = await instance.post('/auth/login', userData);
      
      return {
        user: response.data.user,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };
    } catch (error) {
      console.error('Login API Error:', error.response?.data || error.message);
      throw error;
    }
  };



instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
export default instance;