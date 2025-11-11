import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { connectDB } from "./shared/middlewares/connect-db.js";
import carsRoutes from "./modules/cars/routes/cars-routes.js";
import usersRoutes from "./modules/users/routes/users-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "screens")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "screens", "homepage.html"));
});

app.use("/cars", carsRoutes);
app.use("/users", usersRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "✅ MongoDB connected successfully!" });
});

app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`AutoMart Phase 3 running at: http://localhost:${PORT}`);
  console.log(`Cars endpoint: http://localhost:${PORT}/cars`);
  console.log(`Users endpoint: http://localhost:${PORT}/users`);
});
