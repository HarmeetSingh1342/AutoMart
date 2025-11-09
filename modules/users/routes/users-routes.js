import express from "express";
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  addFavoriteCar,
} from "../models/users-model.js";
import { createUserRules } from "../middlewares/create-user-rules.js";
import { updateUserRules } from "../middlewares/update-user-rules.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Helper for validation
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// GET all users
router.get("/", (req, res) => {
  res.status(200).json(getAllUsers());
});

// GET user by ID
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

// POST new user
router.post("/", createUserRules, handleValidation, (req, res) => {
  const newUser = addNewUser(req.body);
  res.status(201).json(newUser);
});

// PUT update user
router.put("/:id", updateUserRules, handleValidation, (req, res) => {
  const updated = updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.status(200).json(updated);
});

// DELETE user
router.delete("/:id", (req, res) => {
  const deleted = deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User deleted" });
});

// POST add favorite car
router.post("/:id/favorites/:carId", (req, res) => {
  const updated = addFavoriteCar(req.params.id, req.params.carId);
  if (updated === "car-not-found")
    return res.status(404).json({ message: "Car not found" });
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.status(200).json(updated);
});

export default router;
