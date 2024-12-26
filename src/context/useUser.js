import { createContext, useContext, useState } from "react";

import { endpoints, hosturl } from "../api";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [error, setError] = useState(null);

  const login = async (credentials, setLoading) => {
    const { email, password, role } = credentials;
    console.log("Credentials:", email, password, role);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(hosturl + endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to authenticate. Please check your credentials."
        );
      }

      const data = await response.json();
      console.log("Response Data:", data);

      // Ensure these updates happen before re-render
      setUser(data.user);
      setAuthToken(data.token);
      setIsAuthenticated(true); // Explicitly set authentication status

      // Store data in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("isAuthenticated After Login:", true); // For debugging
    } catch (error) {
      console.error("Login Error:", error.message);
      setError(
        error.response?.data?.error || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authToken,
        isAuthenticated,
        error,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
