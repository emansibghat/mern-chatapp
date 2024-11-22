import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

import Left from "./Home/leftpart/left";
import Right from "./Home/rightpart/right";
import Signup from "./components/Signup";
import Login from "./components/Login";
//import ChatComponent from "./components/emojipick";

import "./index.css";

export default function App() {
  const [authUser] = useAuth();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
