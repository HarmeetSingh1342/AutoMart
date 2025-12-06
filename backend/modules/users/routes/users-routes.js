
import express from "express";
import {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  comparePassword
} from "../models/users-model.js";
import { Car } from "../../cars/models/cars-model.js";
import { sendOTPEmail } from "../../../shared/email/send-otp.js";
import jwt from "jsonwebtoken";
import { auth } from "../../../shared/middlewares/auth.js";

const router = express.Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const validPassword = await comparePassword(user, password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otpCode = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); 
  await user.save();

  await sendOTPEmail(user.email, otp);

  res.json({ message: "OTP sent to your email" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.otpCode !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otpCode = null;
  user.otpExpiresAt = null;
  await user.save();

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

router.get("/", auth(["admin"]), async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/:id", auth(["admin", "customer"]), async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});

router.post("/", auth(["admin"]), async (req, res) => {
  try {
    const newUser = await addNewUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Error creating user" });
  }
});

router.put("/:id", auth(["admin"]), async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Error updating user" });
  }
});

router.delete("/:id", auth(["admin"]), async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/:id/favorites/:carId", auth(["admin", "customer"]), async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

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

router.delete("/:id/favorites/:carId", auth(["admin", "customer"]), async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const carId = req.params.carId;

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== carId
    );

    await user.save();

    res.json({ message: "Favorite removed", favorites: user.favorites });
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ message: "Error removing favorite" });
  }
});

export default router;


