import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context that will be used to provide and consume authentication data throughout the app
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // State to store the current user's authentication token
  const [token, setToken] = useState(null);
  // State to store the current user's data
  const [userData, setUserData] = useState(null);
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //state to show feedback if login attempt is unsucessful
  const [logged, setLogged] = useState(false);

  // Effect that runs once on component mount to initialize user authentication from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("user_data");
    if (storedData) {
      try {
        // Parse the stringified user data back into JSON
        const parsedData = JSON.parse(storedData);
        const { userToken, user } = parsedData;
        // Set the token, user data, and authentication status from the stored data
        setToken(userToken);
        setUserData(user);
        setIsAuthenticated(true);
      } catch (error) {
        // Log errors if the JSON parsing fails
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // Function to handle user login
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid username or password");
      }

      setToken(data.token);
      setUserData(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Function to handle user logout
  const logout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user_data");
    // Reset token, user data, and authentication status
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
    setLogged(false);
  };

  // Render the provider with value containing the token, isAuthenticated flag, logout, and login functions, and userData
  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, logout, login, userData, logged }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to provide easy access to the auth context
export const useAuth = () => useContext(AuthContext);
