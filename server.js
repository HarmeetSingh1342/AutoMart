import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import carsRoutes from "./modules/cars/routes/cars-routes.js";
import usersRoutes from "./modules/users/routes/users-routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static homepage and CSS
app.use(express.static(path.join(__dirname, "screens")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "screens", "homepage.html"));
});

// Register API routes
app.use("/cars", carsRoutes);
app.use("/users", usersRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`AutoMart API running at: http://localhost:${PORT}`);
  console.log(`Cars endpoint: http://localhost:${PORT}/cars`);
  console.log(`Users endpoint: http://localhost:${PORT}/users`);
});
