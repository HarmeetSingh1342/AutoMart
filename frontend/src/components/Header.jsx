
import { Link } from "react-router-dom";

export default function Header() {
  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    background: "#111",
    color: "white",
    fontSize: "18px"
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/cars" style={linkStyle}>Cars</Link>
      <Link to="/add-car" style={linkStyle}>Add Car</Link>
      <Link to="/users" style={linkStyle}>Users</Link>
       <Link to="/add-user" style={linkStyle}>Add User</Link>
      <Link to="/favorites" style={linkStyle}>Favorites</Link>
    </nav>
  );
}
