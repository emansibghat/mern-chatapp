import axios from "axios";
import { useState } from "react";

const SearchUser = ({ onSearch }) => {
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    onSearch(email);
  };

  return (
    <div className="search-user-container" style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Search User</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchUser;
