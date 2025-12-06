
import Button from "./Button";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function CarItem({ car, onDelete }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleAddFavorite = async () => {
    try {
      if (!user || !token) {
        alert("Please login first to add favorites.");
        navigate("/login");
        return;
      }

      if (user.role !== "customer") {
        alert("Only customers can add favorites.");
        return;
      }

      await axios.post(
        `http://localhost:3000/users/${user.id}/favorites/${car._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite.");
    }
  };

  return (
        <div
      style={{
        border: "1px solid #555",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "8px",
        background: "#222",
        color: "white",
        width: "300px",
      }}
    >
      {user?.role === "admin" && onDelete && (
        <button
          onClick={onDelete}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Delete
        </button>
      )}

      <h2>
        {car.manufacturer} {car.model}
      </h2>

      <p>
        <strong>Fuel:</strong> {car.fuel}
      </p>
      <p>
        <strong>Engine:</strong> {car.engine}
      </p>
      <p>
        <strong>Year:</strong> {car.year}
      </p>
      <p>
        <strong>Mileage (km):</strong> {car.mileage}
      </p>
      <p>
        <strong>Price:</strong> ${car.price}
      </p>

      {user?.role === "customer" && (
        <Button text="Add to Favorites" onClick={handleAddFavorite} />
      )}
    </div>
  );
}

