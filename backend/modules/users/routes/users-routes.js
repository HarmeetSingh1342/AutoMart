import express from "express";
import {
  User,
  getAllUsers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  comparePassword,
} from "../models/users-model.js";
import { Car } from "../../cars/models/cars-model.js";
import { sendOTPEmail } from "../../../shared/email/send-otp.js";
import jwt from "jsonwebtoken";
import { auth } from "../../../shared/middlewares/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const validPassword = await comparePassword(user, password);
  if (!validPassword) return res.status(400).json({ message: "Invalid email or password" });

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
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });

  res.json({
    message: "Login successful",
    token,
    id: user._id.toString(),
    role: user.role,
    email: user.email,
  });
});


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = await findUserByEmail(email);
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const newUser = await addNewUser({ name, email, password });

  res.status(201).json({
    message: "Account created successfully",
    userId: newUser._id,
  });
});


router.get("/", auth(["admin"]), async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

router.post("/", auth(["admin"]), async (req, res) => {
  const newUser = await addNewUser(req.body);
  res.status(201).json(newUser);
});

router.put("/:id", auth(["admin"]), async (req, res) => {
  const updated = await updateUser(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
});

router.delete("/:id", auth(["admin"]), async (req, res) => {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted successfully" });
});


router.get("/:id", auth(["admin", "customer"]), async (req, res) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

router.post("/:id/favorites/:carId", auth(["admin", "customer"]), async (req, res) => {
  const { id, carId } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const carExists = await Car.exists({ _id: carId });
  if (!carExists) return res.status(404).json({ message: "Car not found" });

  const updated = await User.findByIdAndUpdate(
    id,
    { $addToSet: { favorites: carId } },
    { new: true }
  ).populate("favorites");

  if (!updated) return res.status(404).json({ message: "User not found" });

  res.json({
    message: "Favorite added",
    favorites: updated.favorites,
  });
});


router.delete("/:id/favorites/:carId", auth(["admin", "customer"]), async (req, res) => {
  const { id, carId } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $pull: { favorites: carId } },
    { new: true }
  ).populate("favorites");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Favorite removed",
    favorites: updatedUser.favorites,
  });
});

router.post("/:id/favorites/toggle/:carId", auth(["admin", "customer"]), async (req, res) => {
  const { id, carId } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const alreadyFav = user.favorites.some(f => f.toString() === carId);

  let updated;
  if (alreadyFav) {
    updated = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: carId } },
      { new: true }
    );
  } else {
    updated = await User.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: carId } },
      { new: true }
    );
  }

  updated = await updated.populate("favorites");

  res.json({
    favored: !alreadyFav,
    favorites: updated.favorites,
  });
});


router.get("/:id/favorites/check/:carId", auth(["admin", "customer"]), async (req, res) => {
  const { id, carId } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const favorited = user.favorites.some(f => f.toString() === carId);

  res.json({ favorited });
});

router.get("/:id/favorites/raw", auth(["admin", "customer"]), async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && req.user.id !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ favorites: user.favorites });
});

export default router;
