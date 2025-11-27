
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      loadUsers();
    } catch (error) {
      console.error(error)
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>

          <strong>Favorites:</strong>
          {user.favorites?.length ? (
            <ul>
              {user.favorites.map((fav) => (
                <li key={fav._id}>
                  {fav.manufacturer} {fav.model} — ${fav.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorites yet.</p>
          )}

          <button
            onClick={() => deleteUser(user._id)}
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}
