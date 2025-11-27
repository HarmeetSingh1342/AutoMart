
import { useEffect, useState } from "react";
import axios from "axios";
import CarItem from "./CarItem";

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error loading cars");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading cars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car._id} car={car} />
      ))}
    </div>
  );
}
