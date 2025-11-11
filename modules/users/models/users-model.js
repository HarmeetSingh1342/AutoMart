import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
}],
});

export const User = mongoose.model("User", userSchema);

export async function addNewUser(data) {
  const newUser = new User(data);
  return await newUser.save();
}

export async function getAllUsers() {
  return await User.find().populate("favorites");
}

export async function getUserById(id) {
  return await User.findById(id).populate("favorites");
}

export async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}
