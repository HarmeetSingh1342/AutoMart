import express from "express";
import {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCar,
} from "../models/cars-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Error fetching cars" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Error fetching car" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCar = await addNewCar(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(400).json({ message: "Error adding car" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await updateCar(req.params.id, req.body);
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(400).json({ message: "Error updating car" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteCar(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Error deleting car" });
  }
});

export default router;
