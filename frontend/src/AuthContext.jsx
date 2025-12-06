
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const payload = decodeToken(storedToken);
      if (payload) {
        setToken(storedToken);
        setUser({ id: payload.id, email: payload.email, role: payload.role });
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const payload = decodeToken(newToken);
    if (payload) {
      setToken(newToken);
      setUser({ id: payload.id, email: payload.email, role: payload.role });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
