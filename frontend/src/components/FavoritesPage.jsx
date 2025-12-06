
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function FavoritesPage() {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !token) {
      setError("You must be logged in to view favorites.");
      return;
    }

    axios
      .get(`http://localhost:3000/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFavorites(res.data.favorites || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load favorites.");
      });
  }, [user, token]);

  const removeFavorite = async (carId) => {
    try {
      await axios.delete(
        `http://localhost:3000/users/${user.id}/favorites/${carId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFavorites((prev) => prev.filter((c) => c._id !== carId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove favorite");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Favorite Cars
      </h1>

      {favorites.length === 0 && (
        <p style={{ textAlign: "center" }}>You have no favorites yet.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {favorites.map((car) => (
          <div
            key={car._id}
            style={{
              position: "relative",
              background: "#222",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              border: "1px solid #555",
            }}
          >
            <button
              onClick={() => removeFavorite(car._id)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            <h2 style={{ marginTop: "5px" }}>
              {car.manufacturer} {car.model}
            </h2>

            <p>
              <strong>Engine:</strong> {car.engine}
            </p>
            <p>
              <strong>Fuel:</strong> {car.fuel}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage} km</p>
            <p>
              <strong>Price:</strong> ${car.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
