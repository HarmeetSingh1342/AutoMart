import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./shared/middlewares/connect-db.js";

import carsRoutes from "./modules/cars/routes/cars-routes.js";
import usersRoutes from "./modules/users/routes/users-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB();

app.use("/cars", carsRoutes);
app.use("/users", usersRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "MongoDB connection successful!" });
});

app.use((req, res) => {
  res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

app.use((err, req, res, next) => {
  console.error("INTERNAL ERROR:", err);
  res.status(500).send("Oops! Internal Server Error!");
});

app.listen(PORT, () => {
  console.log(`AutoMart backend running at http://localhost:${PORT}`);
});
