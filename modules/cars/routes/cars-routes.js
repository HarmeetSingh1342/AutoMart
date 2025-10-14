import express from "express";
import { validationResult } from "express-validator";
import {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCar,
} from "../models/cars-model.js";
import { createCarRules } from "../middlewares/create-car-rules.js";
import { updateCarRules } from "../middlewares/update-car-rules.js";

const router = express.Router();

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

router.get("/", (req, res) => {
  res.status(200).json(getAllCars());
});

router.get("/:id", (req, res) => {
  const car = getCarById(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.status(200).json(car);
});

router.post("/", createCarRules, handleValidation, (req, res) => {
  const newCar = addNewCar(req.body);
  res.status(201).json(newCar);
});

router.put("/:id", updateCarRules, handleValidation, (req, res) => {
  const updated = updateCar(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Car not found" });
  res.status(200).json(updated);
});

router.delete("/:id", (req, res) => {
  const deleted = deleteCar(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Car not found" });
  res.status(200).json({ message: "Car deleted" });
});

export default router;
