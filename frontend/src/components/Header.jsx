
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    background: "#111",
    color: "white",
    fontSize: "18px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <Link to="/home" style={linkStyle}>
        Home
      </Link>

      <Link to="/cars" style={linkStyle}>
        Cars
      </Link>

      {user.role === "customer" && (
        <Link to="/favorites" style={linkStyle}>
          My Favorites
        </Link>
      )}

      {user.role === "admin" && (
        <>
          <Link to="/users" style={linkStyle}>
            Users
          </Link>
          <Link to="/add-user" style={linkStyle}>
            Add User
          </Link>
          <Link to="/add-car" style={linkStyle}>
            Add Car
          </Link>
        </>
      )}

      <button
        onClick={handleLogout}
        style={{
          background: "transparent",
          border: "1px solid white",
          color: "white",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Logout ({user.role})
      </button>
    </nav>
  );
}
