

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
      } else {
        setMessage("OTP sent to your email. Please check your inbox.");
        localStorage.setItem("pendingEmail", form.email);
        navigate("/verify-otp");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h1>AutoMart Login</h1>
      <p>Enter your email and password to receive a one-time OTP.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Login"}
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        Don&apos;t have an account? Ask the admin/instructor to create one for you.
      </p>
    </div>
  );
}

