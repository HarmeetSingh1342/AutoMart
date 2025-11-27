
import { useState } from "react";
import axios from "axios";

export default function AddCarPage() {
  const [form, setForm] = useState({
    manufacturer: "",
    model: "",
    fuel: "",
    engine: "",
    year: "",
    mileage: "",
    price: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/cars", form);
      setMsg("Car added successfully!");
    } catch (err) {
      console.error(err);
      setMsg("Error adding car");
    }
  };

  return (
    <div>
      <h1>Add New Car</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "250px"
        }}
      >
        <input type="text" placeholder="Manufacturer" name="manufacturer" onChange={handleChange} />
        <input type="text" placeholder="Model" name="model" onChange={handleChange} />
        <input type="text" placeholder="Fuel Type (e.g. Petrol)" name="fuel" onChange={handleChange} />
        <input type="number" placeholder="Engine Size (e.g. 2.5)" name="engine" step="any" onChange={handleChange}/>
        <input type="number" placeholder="Year" name="year" onChange={handleChange} />
        <input type="number" placeholder="Mileage" name="mileage" onChange={handleChange} />
        <input type="number" placeholder="Price" name="price" onChange={handleChange} />

        <button type="submit">Add Car</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}
