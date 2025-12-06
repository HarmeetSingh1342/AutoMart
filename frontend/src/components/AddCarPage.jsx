
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export default function AddCarPage() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    manufacturer: "",
    model: "",
    fuel: "",
    engine: "",
    year: "",
    mileage: "",
    price: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!token) {
      setMsg("You must be logged in as admin to add a car.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/cars", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Car added successfully!");
      setForm({
        manufacturer: "",
        model: "",
        fuel: "",
        engine: "",
        year: "",
        mileage: "",
        price: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("Failed to add car.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Add a New Car</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}
      >
        <input
          type="text"
          placeholder="Manufacturer"
          name="manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Model"
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Fuel Type"
          name="fuel"
          value={form.fuel}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Engine Size"
          name="engine"
          step="any"
          value={form.engine}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Year"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Mileage"
          name="mileage"
          value={form.mileage}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Car</button>
      </form>

      {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
    </div>
  );
}

