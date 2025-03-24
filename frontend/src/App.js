import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Left from "./Home/leftpart/left";
import Right from "./Home/rightpart/right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GroupChat from "./components/GroupChat";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

export default function App() {
  const [authUser] = useAuth();

  return (
    <div className="h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Left className="w-1/4 border-r" />
                <Right className="w-3/4" />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Group Chat Route */}
        <Route
          path="/groupchat"
          element={
            <ProtectedRoute>
              <GroupChat />
            </ProtectedRoute>
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
