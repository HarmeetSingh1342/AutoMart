import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import carsRoutes from "./modules/cars/routes/cars-routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "screens")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "screens", "homepage.html"));
});

app.use("/cars", carsRoutes);

app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`AutoMart Phase 2 running at: http://localhost:${PORT}`);
});
