
import Button from "./Button";
import axios from "axios";

export default function CarItem({ car }) {
  const handleAddFavorite = async () => {
    try {
      const userId = "6911087c107a027c90007daf";   //Hardcoded for now every add to favorite will be for user with this id (Harmeet Singh)

      await axios.post(
        `http://localhost:3000/users/${userId}/favorites/${car._id}`
      );

      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to favorites");
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
      <h2>
        {car.manufacturer} {car.model}
      </h2>

      <p><strong>Fuel:</strong> {car.fuel}</p>
      <p><strong>Engine:</strong> {car.engine}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Mileage in Km/h:</strong> {car.mileage}</p>
      <p><strong>Price:</strong> ${car.price}</p>

      <Button text="Add to Favorites" onClick={handleAddFavorite} />
    </div>
  );
}

