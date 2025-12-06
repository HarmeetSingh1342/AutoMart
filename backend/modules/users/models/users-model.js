
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  otpCode: { type: String },
  otpExpiresAt: { type: Date },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

export const User = mongoose.model("User", userSchema);

export async function getAllUsers() {
  return await User.find().populate("favorites");
}

export async function addNewUser(data) {
  const newUser = new User(data);
  return await newUser.save();
}

export async function getUserById(id) {
  return await User.findById(id).populate("favorites");
}

export async function updateUser(id, data) {
  const user = await User.findById(id);
  if (!user) return null;

  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;
  if (data.password !== undefined) user.password = data.password;
  if (data.role !== undefined) user.role = data.role;

  return await user.save();
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

export async function findUserByEmail(email) {
  return await User.findOne({ email });
}

export async function comparePassword(user, plainPassword) {
  return await bcrypt.compare(plainPassword, user.password);
}
