import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  fuel: { type: String, required: true },
  engine: { type: Number, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const Car = mongoose.model("Car", carSchema);

export async function addNewCar(data) {
  const newCar = new Car(data);
  return await newCar.save();
}

export async function getAllCars() {
  return await Car.find();
}

export async function getCarById(id) {
  return await Car.findById(id);
}

export async function updateCar(id, data) {
  return await Car.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCar(id) {
  return await Car.findByIdAndDelete(id);
}
