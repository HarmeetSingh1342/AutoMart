import { useEffect, useState } from "react";
import axios from "axios";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      const favs = [];

      res.data.forEach((user) => {
        user.favorites?.forEach((car) => {
          favs.push({
            user: user.name,
            ...car,
          });
        });
      });

      setFavorites(favs);
    });
  }, []);

  return (
    <div>
      <h1>Favorite Cars</h1>

      {favorites.length === 0 && <p>No favorites found.</p>}

      <ul>
        {favorites.map((fav, i) => (
          <li key={i}>
            <strong>{fav.manufacturer} {fav.model}</strong>  
            — ${fav.price} (Favorited by: {fav.user})
          </li>
        ))}
      </ul>
    </div>
  );
}
