import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const { authUser } = useAuth(); // Assuming useAuth returns an object

  const connectSocket = useCallback(() => {
    if (!authUser || !authUser.user || !authUser.user._id) {
      setError("User not authenticated");
      return;
    }

    setIsConnecting(true);
    setError(null);

    const newSocket = io("http://localhost:4000", {
      query: {
        userId: authUser.user._id,
      },
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
      setIsConnecting(false);
    });

    newSocket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
      setIsConnecting(false);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return newSocket;
  }, [authUser]);

  useEffect(() => {
    let activeSocket = null;

    if (authUser && !socket) {
      activeSocket = connectSocket();
    }

    return () => {
      if (activeSocket) {
        activeSocket.close();
      }
    };
  }, [authUser, socket, connectSocket]);

  const value = {
    socket,
    onlineUsers,
    isConnecting,
    error
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};