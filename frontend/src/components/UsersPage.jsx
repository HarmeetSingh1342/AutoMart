

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load users.");
      });
  };

  useEffect(() => {
    if (token) loadUsers();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1>All Users</h1>

      {users.length === 0 && <p>No users found.</p>}

      {users.map((u) => (
        <div
          key={u._id}
          style={{
            background: "#222",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1px solid #555",
          }}
        >
          <p><strong>Name:</strong> {u.name}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Role:</strong> {u.role}</p>

          <button
            onClick={() => navigate(`/edit-user/${u._id}`)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(u._id)}
            style={{ background: "#d9534f", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
