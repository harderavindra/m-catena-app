import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      console.log(API_BASE_URL, 'API_BASE_URL')
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, { withCredentials: true });
        console.log("Auth Check", response.data.user)
        setUser(response.data.user);
      }  catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn("User not logged in.");
        } else {
          console.error("Auth check error:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password }, { withCredentials: true });
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, { withCredentials: true });
    setUser(response.data.user);
  };

  // Logout function
  const logout = async () => {
    await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
