import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// Custom React hook for creating an authenticated axios instance
const useAxios = () => {
  const { token, refreshAccessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Create memoized axios instance that persists between renders
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:4000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    // Request interceptor to add the token to every request
    instance.interceptors.request.use(
      async (config) => {
        // If no token, redirect to login
        if (!token) {
          navigate("/login");
          return Promise.reject("No auth token available");
        }
        
        // Add authorization header with current token
        config.headers.Authorization = `Bearer ${token}`;
        
        // Check if token is expired
        try {
          const user = jwtDecode(token);
          const isExpired = user.exp ? user.exp * 1000 < Date.now() : false;
          
          // If not expired, proceed with request
          if (!isExpired) {
            return config;
          }
          
          // If expired, try to refresh the token using the context function
          try {
            const newAccessToken = await refreshAccessToken();
            
            // Update authorization header with new token
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return config;
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            logout();
            navigate("/login");
            return Promise.reject(refreshError);
          }
        } catch (error) {
          console.error("Token validation error:", error);
          return config; // Still try the request in case of decode error
        }
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor to handle authentication errors
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 unauthorized errors
        if (error.response && error.response.status === 401) {
          logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    
    return instance;
  }, [token, refreshAccessToken, logout, navigate]);
  
  return axiosInstance;
};

export default useAxios;