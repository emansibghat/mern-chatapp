import { useEffect, useState } from "react";
import axios from "axios";

function useGetConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const userData = localStorage.getItem("ChatApp");
        if (!userData) {
          console.error("No user data found in localStorage");
          return;
        }

        const parsedData = JSON.parse(userData);
        if (!parsedData || !parsedData._id) {
          console.error("No user ID found in parsed data");
          return;
        }

        const userId = parsedData._id;
        console.log("Fetching conversations for user ID:", userId);
        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/conversation/${userId}`, 
          { withCredentials: true }
        );
        
        setConversations(response.data);
      } catch (error) {
        console.error("Error in useGetConversations:", error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return [conversations, loading];
}

export default useGetConversations;