


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import VerifyOtpPage from "./components/VerifyOtpPage";
import CarsPage from "./components/CarsPage";
import FavoritesPage from "./components/FavoritesPage";
import AddCarPage from "./components/AddCarPage";
import UsersPage from "./components/UsersPage";
import AddUserPage from "./components/AddUserPage";
import EditUserPage from "./components/EditUserPage";

function RequireAuth({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function HomePage() {
  const { user } = useAuth();
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Welcome to AutoMart</h1>
      <p>
        Logged in as <strong>{user?.email}</strong> ({user?.role})
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />

            <Route
              path="/cars"
              element={
                <RequireAuth>
                  <CarsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/favorites"
              element={
                <RequireAuth roles={["customer"]}>
                  <FavoritesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/add-car"
              element={
                <RequireAuth roles={["admin"]}>
                  <AddCarPage />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth roles={["admin"]}>
                  <UsersPage />
                </RequireAuth>
              }
            />
            <Route
              path="/add-user"
              element={
                <RequireAuth roles={["admin"]}>
                  <AddUserPage />
                </RequireAuth>
              }
            />
            <Route
              path="/edit-user/:id"
              element={
                <RequireAuth roles={["admin"]}>
                  <EditUserPage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


