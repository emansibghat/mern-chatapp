import React from 'react'
import Left from './Home/leftpart/left'
import Right from './Home/rightpart/right'
import './index.css'
import Signup from './components/Signup'
import Login from './components/Login.js'
import {useAuth} from "./context/AuthProvider.js"
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";


export default function App() {
  const [authUser, setAuthUser] = useAuth();
 
  console.log(authUser);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route 
          path='/' 
          element={
            authUser ? (
              <div className='flex h-screen'>
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path='/login' 
          element={
           <Login />
          } 
        />
        <Route 
          path='/signup' 
          element={
            <Signup />
          } 
        />
        
      </Routes>
    

    </div>
  );
}