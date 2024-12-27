import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { endpoints, hosturl } from "../api";
import { message } from "antd";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials, setLoading) => {
    const { email, password, role } = credentials;

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

      // Validate token
      const decodedToken = jwtDecode(data.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token has expired. Please log in again.");
      }

      setUser(data.user);
      setAuthToken(data.token);
      setIsAuthenticated(true);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(data.user));

      message.success("Login successful", 2);
    } catch (error) {
      console.error("Login Error:", error.message);
      message.error(error.message, 2);
    } finally {
      setLoading(false);
    }
  };

  // 🛡️ CHECK IF USER IS LOGGED IN
  const checkLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    try {
      if (token && storedUser && isAuthenticated) {
        const decodedToken = jwtDecode(token);

        // Check token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token has expired. Please log in again.");
        }

        setAuthToken(token);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token Validation Error:", error.message);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    message.error("Logged out", 2);
  };

  useEffect(() => {
    if(authToken){
      
    }
    checkLoggedIn();
  }, [authToken]);

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
