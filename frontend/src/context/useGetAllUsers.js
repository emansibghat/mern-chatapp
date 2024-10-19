import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const API_URL =process.env.API_URL
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        
        const token =  Cookies.get("jwt");
        // console.log("Retrieved token from cookies:", token);
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`${API_URL}/user/allUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;