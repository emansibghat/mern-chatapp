import { useEffect, useState } from "react";
import axios from "axios";

function useGetConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const userId = JSON.parse(localStorage.getItem("ChatApp"))._id;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/conversation/${userId}`, { withCredentials: true });
        setConversations(response.data);
      } catch (error) {
        console.log("Error in useGetConversations: " + error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return [conversations, loading];
}

export default useGetConversations;