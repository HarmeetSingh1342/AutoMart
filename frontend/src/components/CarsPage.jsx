import { useEffect, useState } from "react";
import axios from "axios";
import CarItem from "./CarItem";

const API = "http://localhost:3000/cars";

export default function CarsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setCars(res.data));
  }, []);

  return (
    <div >
      <h1 style={{ textAlign: "center" }}>All Cars</h1>

      {cars.length === 0 ? (
        <p>No cars found...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            justifyItems: "center",          
            padding: "20px 0",
            maxWidth: "1400px",              
            margin: "0 auto",                
          }}
        >
          {cars.map(car => (
            <div style={{ width: "100%", maxWidth: "280px" }} key={car._id}>
              <CarItem car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
