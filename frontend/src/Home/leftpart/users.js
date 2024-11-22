import React, { useState, useEffect } from "react";
import User from "./user";
import axios from "axios";
import useGetConversations from "../../context/useGetConversations";
import SearchUser from "./search";

function Users() {
  const [conversations, loading] = useGetConversations();
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (email) => {
    if (!email.trim()) {
      setSearchError("Email is required");
      setSearchResult(null);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/search/${email}`, { withCredentials: true });
      setSearchResult(response.data.user);
    } catch (err) {
      setSearchError(err.response?.data?.error || "An error occurred");
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <SearchUser onSearch={handleSearch} />
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {loading && <p>Loading...</p>}
        {searchLoading && <p>Searching...</p>}
        {searchError && <p style={{ color: "red" }}>{searchError}</p>}
        {searchResult && <User key={searchResult._id} user={searchResult} />}
        {!searchResult && conversations.map((conversation) => (
          <User key={conversation._id} user={conversation.members.find(member => member._id !== JSON.parse(localStorage.getItem("ChatApp"))._id)} />
        ))}
      </div>
    </div>
  );
}

export default Users;