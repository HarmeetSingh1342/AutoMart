
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const pending = localStorage.getItem("pendingEmail");
    if (!pending) {
      setMessage("No pending login. Please login first.");
    } else {
      setEmail(pending);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("No email found. Please login again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "OTP verification failed");
      } else if (data.token) {
        login(data.token);
        localStorage.removeItem("pendingEmail");
        setMessage("Login successful!");
        navigate("/home");
      } else {
        setMessage("Unexpected response from server");
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
      <h1>Verify OTP</h1>
      {email && (
        <p>
          An OTP was sent to <strong>{email}</strong>.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}
      >
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
