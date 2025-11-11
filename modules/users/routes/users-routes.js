import express from "express";
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
} from "../models/users-model.js";
import { Car } from "../../cars/models/cars-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await addNewUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Error creating user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Error updating user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/:id/favorites/:carId", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    const car = await Car.findById(req.params.carId);

    if (!user || !car)
      return res.status(404).json({ message: "User or car not found" });

    if (!user.favorites.includes(car._id)) {
      user.favorites.push(car._id);
      await user.save();
    }

    const updatedUser = await getUserById(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error adding favorite car:", error);
    res.status(500).json({ message: "Error adding favorite car" });
  }
});

export default router;
