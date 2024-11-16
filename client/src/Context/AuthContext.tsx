import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode<{
        username: string;
        email: string;
        userRole: string;
      }>(token);
      setUser({
        username: decoded.username || "",
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
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    decodeToken(token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    setUser({
      username: "",
      email: "",
      userRole: "",
    });
  };

  const isAuthenticated = !!authToken;

  useEffect(() => {
    if (authToken) {
      decodeToken(authToken);
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
