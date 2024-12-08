import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { WEB_SOCKET_URL } from "../Constant";
import { fetchConfigData } from "../Api";
interface User {
  userId: any;
  username: string;
  email: string;
  userRole: string;
}

interface Config {
  id: number;
  vendorLimitation: number;
  customerLimitation: number;
  type: string;
  lastUpdate: string;
}

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User;
  limitations: Config;
  systemLogs: any;
  isEventUpdated:any;
  tickets:any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [user, setUser] = useState<User>({
    userId: "",
    username: "",
    email: "",
    userRole: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [limitations, setLimitations] = useState<Config>();
  const [systemLogs, setSystemLogs] = useState([]);
  const [isEventUpdated , setEventUpdated] = useState<any>()
  const [tickets , setTickets] = useState<any>()

  const decodeToken = (token: string) => {
    if (typeof token !== "string" || !token.trim()) {
      console.error("Invalid token provided");
      return;
    }

    try {
      const decoded = jwtDecode<{
        userId: any;
        sub: string;
        email: string;
        userRole: string;
      }>(token);
      setUser({
        userId: decoded.userId || "",
        username: decoded.sub || "",
        email: decoded.email || "",
        userRole: decoded.userRole || "",
      });

      console.log(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser({
        userId: "",
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
      userId:"",
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

  const fetchConfData = async () => {
    const configdata = await fetchConfigData(1);
    setLimitations(configdata);
  };

  useEffect(() => {
    fetchConfData();

    const client = new Client({
      webSocketFactory: () => new SockJS(WEB_SOCKET_URL),
      onConnect: () => {
        client.subscribe("/topic/configUpdates", (message) => {
          const updatedConfig = JSON.parse(message.body);
          setLimitations(updatedConfig);
        });

        client.subscribe("/topic/savedEvent", (message) => {
          const savedEvent = JSON.parse(message.body);
          setEventUpdated(savedEvent)
        });

        client.subscribe("/topic/updateEvent", (message) => {
          const updateEvent = JSON.parse(message.body);
          setEventUpdated(updateEvent)
        });

        client.subscribe("/topic/systemlogs", (message) => {
          const systemLogs = JSON.parse(message.body);
          setSystemLogs(systemLogs);
        });
        client.subscribe("/topic/tickets", (message) => {
          const tic = JSON.parse(message.body);
          setTickets(tic);
        });
      },
      debug: (str) => {
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isEventUpdated,
        login,
        logout,
        isAuthenticated,
        user,
        limitations,
        systemLogs,
        tickets,
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
