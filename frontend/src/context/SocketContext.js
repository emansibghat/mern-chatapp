import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";

const SocketContext = createContext();
const REACT_APP_API_URL =process.env.REACT_APP_API_URL
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!authUser?._id) return;

    const newSocket = io(`${REACT_APP_API_URL}`);

    newSocket.emit("register", authUser._id);

    newSocket.on("connect", () => {
      console.log("Socket connected!");
      setSocket(newSocket);
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.close();
      setSocket(null);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};