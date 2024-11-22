import axios from "axios";
import { useState } from "react";

const SearchUser = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!email.trim()) {
      setError("Email is required");
      setUser(null);
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const response = await axios.get(`/api/messages/search?email=${email}`);
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
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
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {user && (
        <div style={{ marginTop: "20px", textAlign: "left", background: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
          <p><strong>User Found:</strong></p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
