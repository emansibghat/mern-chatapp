import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${REACT_APP_API_URL}/user/allUsers`, {
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