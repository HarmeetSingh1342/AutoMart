import fs from "fs";
import path from "path";



const dataPath = path.resolve("data/cars.json");
console.log("Reading from:", dataPath);

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

export function getAllCars() {
  return readData();
}

export function getCarById(id) {
  const cars = readData();
  return cars.find((car) => car.id === Number(id));
}

export function addNewCar(newCar) {
  const cars = readData();
  const nextId = cars.length ? cars[cars.length - 1].id + 1 : 1;
  const carToAdd = { id: nextId, ...newCar };
  cars.push(carToAdd);
  writeData(cars);
  return carToAdd;
}

export function updateCar(id, updates) {
  const cars = readData();
  const index = cars.findIndex((car) => car.id === Number(id));
  if (index === -1) return null;
  cars[index] = { ...cars[index], ...updates };
  writeData(cars);
  return cars[index];
}

export function deleteCar(id) {
  const cars = readData();
  const filtered = cars.filter((car) => car.id !== Number(id));
  if (filtered.length === cars.length) return false;
  writeData(filtered);
  return true;
}
