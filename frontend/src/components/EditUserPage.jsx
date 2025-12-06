import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserPage() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "customer",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`http://localhost:3000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const u = res.data;
        setForm({
          name: u.name,
          email: u.email,
          role: u.role,
        });
      })
      .catch((err) => {
        console.error(err);
        setMsg("Failed to load user");
      });
  }, [id, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.put(`http://localhost:3000/users/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("User updated successfully!");
      navigate("/users");
    } catch (err) {
      console.error(err);
      setMsg("Failed to update user");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Edit User</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Save Changes</button>
      </form>

      {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
    </div>
  );
}
