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
  // Login function that uses fetch API directly
  const login = async (email, password) => {
    console.log("Login attempt with email:", email); // Debugging log

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Invalid email or password",
        };
      }

      // Extract data from response based on your API structure
      const userData = data.adminResponse || {};
      const accessToken = userData.accessToken || data.accessToken;

      // Set state with correct data
      setUser(userData);
      setToken(accessToken);

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", accessToken);

      return {
        success: true,
        message: "Logged in successfully",
        user: userData,
      };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Signup failed",
        };
      }

      return {
        success: true,
        message: "Signup successful",
        data,
      };
    } catch (error) {
      console.error("Signup failed:", error);
      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateToken = (newAccessToken) => {
    setToken(newAccessToken);
    localStorage.setItem("token", newAccessToken);
  };

  // Function to refresh token
  const refreshAccessToken = async () => {
    const currentRefreshToken =
      refreshToken || localStorage.getItem("refreshToken");

    if (!currentRefreshToken) {
      return {
        success: false,
        message: "No refresh token available",
      };
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: currentRefreshToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If refresh fails, logout the user
        logout();
        return {
          success: false,
          message: data.message || "Token refresh failed",
        };
      }

      updateToken(data.accessToken);
      return {
        success: true,
        accessToken: data.accessToken,
      };
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to log out
  const logout = async () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    const response = await fetch(`${API_BASE_URL}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {  
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateToken,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
