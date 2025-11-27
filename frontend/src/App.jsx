import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import CarsPage from "./components/CarsPage";
import UsersPage from "./components/UsersPage";
import AddCarPage from "./components/AddCarPage";
import FavoritesPage from "./components/FavoritesPage";
import AddUserPage from "./components/AddUserPage";

export default function App() {
  return (
    <Router>
      <Header />

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h1>Welcome to AutoMart</h1>
              </div>
            }
          />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/add-car" element={<AddCarPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/add-user" element={<AddUserPage />} />

        </Routes>
      </div>
    </Router>
  );
}
