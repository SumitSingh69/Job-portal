import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Load stored user and tokens from localStorage (persists after refresh)
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
    
    // Function to log in and save user info & tokens
    const login = (userData, accessToken, userRefreshToken = null) => {
        setUser(userData);
        setToken(accessToken);
        
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", accessToken);
        
        if (userRefreshToken) {
            setRefreshToken(userRefreshToken);
            localStorage.setItem("refreshToken", userRefreshToken);
        }
    };
    
    // Function to update just the access token
    const updateToken = (newAccessToken) => {
        setToken(newAccessToken);
        localStorage.setItem("token", newAccessToken);
    };
    
    // Function to log out
    const logout = () => {
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
            logout,
            updateToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};