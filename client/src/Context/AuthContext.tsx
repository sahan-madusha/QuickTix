import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  userRole: string;
}

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    userRole: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const decodeToken = (token: string) => {
    if (typeof token !== 'string' || !token.trim()) {
      console.error("Invalid token provided");
      return;
    }
  
    try {
      const decoded = jwtDecode<{
        sub: string;
        email: string;
        userRole: string;
      }>(token);
      setUser({
        username: decoded.sub || "",
        email: decoded.email || "",
        userRole: decoded.userRole || "",
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser({
        username: "",
        email: "",
        userRole: "",
      });
    }
  };
  
  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    decodeToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    setUser({
      username: "",
      email: "",
      userRole: "",
    });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (authToken) {
      decodeToken(authToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [authToken]);
  

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login,
        logout,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
