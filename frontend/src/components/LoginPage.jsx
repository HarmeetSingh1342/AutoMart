import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); 

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "" });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
      } else {
        setMessage("OTP sent to your email. Please check your inbox.");
        localStorage.setItem("pendingEmail", loginForm.email);
        navigate("/verify-otp");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
      } else {
        setMessage("Account created! You may now log in.");
        setMode("login");

        setLoginForm({ email: regForm.email, password: "" });
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h1>AutoMart {mode === "login" ? "Login" : "Register"}</h1>

      {mode === "login" && (
        <>
          <p>Enter your credentials to receive a one-time OTP.</p>

          <form
            onSubmit={handleLoginSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />

            
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                style={{ flex: 1 }}
              />

              <button
                type="button"
                onClick={() => setShowLoginPassword((prev) => !prev)}
                style={{ padding: "6px 10px", fontSize: "12px", cursor: "pointer" }}
              >
                {showLoginPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Login"}
            </button>
          </form>

          <p
            style={{ marginTop: "20px", cursor: "pointer", color: "#4eaaff" }}
            onClick={() => setMode("register")}
          >
            Don’t have an account? Register here.
          </p>
        </>
      )}
      {mode === "register" && (
        <>
          <p>Create an account to start using AutoMart.</p>

          <form
            onSubmit={handleRegisterSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={regForm.name}
              onChange={handleRegisterChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={regForm.email}
              onChange={handleRegisterChange}
              required
            />
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type={showRegPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={regForm.password}
                onChange={handleRegisterChange}
                required
                style={{ flex: 1 }}
              />

              <button
                type="button"
                onClick={() => setShowRegPassword((prev) => !prev)}
                style={{ padding: "6px 10px", fontSize: "12px", cursor: "pointer" }}
              >
                {showRegPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p
            style={{ marginTop: "20px", cursor: "pointer", color: "#4eaaff" }}
            onClick={() => setMode("login")}
          >
            Already have an account? Log in.
          </p>
        </>
      )}

      {message && <p style={{ marginTop: "15px", color: "orange" }}>{message}</p>}
    </div>
  );
}
