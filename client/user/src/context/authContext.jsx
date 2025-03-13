import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const API_BASE_URL = "http://localhost:4000/api";
    
    useEffect(() => {
        const init = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const storedToken = localStorage.getItem("token");
                const storedRefreshToken = localStorage.getItem("refreshToken");
                
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    
                    if (storedRefreshToken) {
                        setRefreshToken(storedRefreshToken);
                    }
                }
            } catch (error) {
                console.error("Error initializing auth context:", error);
                // Clear potentially corrupted data
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
            } finally {
                setIsLoading(false);
            }
        };
        
        init();
    }, []);
    
    // Login function that uses fetch API directly
    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            
            const data = await response.json();
            
            // Set state
            setUser(data.user);
            setToken(data.accessToken);
            
            if (data.refreshToken) {
                setRefreshToken(data.refreshToken);
                localStorage.setItem("refreshToken", data.refreshToken);
            }
            
            // Store in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.accessToken);
            
            return data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };
    
    // Sign up function
    const signup = async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                // console.log("errorData" , errorData)
                throw new Error(errorData?.message || 'Signup failed');
                // return errorData?.message;
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };
    
    const updateToken = (newAccessToken) => {
        setToken(newAccessToken);
        localStorage.setItem("token", newAccessToken);
    };
    
    // Function to refresh token
    const refreshAccessToken = async () => {
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/user/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
            
            if (!response.ok) {
                throw new Error('Token refresh failed');
            }
            
            const data = await response.json();
            updateToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
            throw error;
        }
    };
    
    // Function to log out
    const logout = async () => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    };
    
    return (
        <AuthContext.Provider value={{
            user,
            token,
            refreshToken,
            isLoading,
            isAuthenticated: !!user,
            login,
            signup,
            logout,
            updateToken,
            refreshAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};