import fs from "fs";
import path from "path";

const usersPath = path.resolve("data/users.json");
const carsPath = path.resolve("data/cars.json");

const readUsers = () => JSON.parse(fs.readFileSync(usersPath));
const writeUsers = (data) => fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
const readCars = () => JSON.parse(fs.readFileSync(carsPath));

// 🟩 READ all users (with full favorite car details)
export function getAllUsers() {
  const users = readUsers();
  const cars = readCars();

  return users.map((user) => ({
    ...user,
    favorites: user.favorites
      .map((carId) => cars.find((c) => c.id === Number(carId)))
      .filter((car) => car !== undefined),
  }));
}

// 🟩 READ single user by ID (with full favorite car details)
export function getUserById(id) {
  const users = readUsers();
  const cars = readCars();
  const user = users.find((u) => u.id === Number(id));
  if (!user) return null;

  return {
    ...user,
    favorites: user.favorites
      .map((carId) => cars.find((c) => c.id === Number(carId)))
      .filter((car) => car !== undefined),
  };
}

// 🟨 CREATE user
export function addNewUser(newUser) {
  const users = readUsers();
  const nextId = users.length ? users[users.length - 1].id + 1 : 1;
  const userToAdd = { id: nextId, favorites: [], ...newUser };
  users.push(userToAdd);
  writeUsers(users);
  return userToAdd;
}

// 🟦 UPDATE user
export function updateUser(id, updates) {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  writeUsers(users);
  return users[index];
}

// 🟥 DELETE user
export function deleteUser(id) {
  const users = readUsers();
  const filtered = users.filter((u) => u.id !== Number(id));
  if (filtered.length === users.length) return false;
  writeUsers(filtered);
  return true;
}

// ⭐ ADD favorite car to user
export function addFavoriteCar(userId, carId) {
  const users = readUsers();
  const cars = readCars();
  const userIndex = users.findIndex((u) => u.id === Number(userId));
  const carExists = cars.some((c) => c.id === Number(carId));

  if (userIndex === -1) return null;
  if (!carExists) return "car-not-found";

  if (!users[userIndex].favorites.includes(Number(carId))) {
    users[userIndex].favorites.push(Number(carId));
    writeUsers(users);
  }
  return users[userIndex];
}
