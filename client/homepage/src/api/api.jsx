import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all future requests
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

// Auth APIs
export const loginUser = async (userData) => {
  try {
    const response = await instance.post('/user/login', userData);
    
    console.log("Login response:", response.data); 
    
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

export const signUpUser = async (userData) => {
  try {
    const response = await instance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};

export default instance;