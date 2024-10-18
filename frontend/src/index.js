import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.js";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);