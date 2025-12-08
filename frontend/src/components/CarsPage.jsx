import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function CarsPage() {
  const { user, token } = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteCar = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(`http://localhost:3000/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete car.");
    }
  };

  const addFavorite = async (carId) => {
    try {
      const check = await axios.get(
        `http://localhost:3000/users/${user.id}/favorites/check/${carId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (check.data.favorited) {
        alert("Car already added to favorites!");
        return;
      }
      await axios.post(
        `http://localhost:3000/users/${user.id}/favorites/${carId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Failed to add favorite.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Available Cars
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              width: "260px",
              background: "#1b1b1b",
              padding: "20px",
              borderRadius: "12px",
              position: "relative",
              boxShadow: "0 0 10px rgba(255,255,255,0.1)",
            }}
          >
            {user?.role === "admin" && (
              <button
                onClick={() => deleteCar(car._id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            )}

            <h3>
              {car.manufacturer} {car.model}
            </h3>
            <p><strong>Fuel:</strong> {car.fuel}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Price:</strong> ${car.price}</p>

            {user?.role === "customer" && (
              <button
                onClick={() => addFavorite(car._id)}
                style={{
                  marginTop: "10px",
                  background: "#0099ff",
                  border: "none",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Add to Favorites ❤️
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
