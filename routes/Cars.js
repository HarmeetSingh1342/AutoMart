const { Router } = require('express');
let cars = require('../data/SampleCars'); 
const router = Router();

// GET
router.get('/', (req, res) => {
  res.json({ data: cars });
});

// GET car by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find(c => c.id === id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json({ data: car });
});

// POST
router.post('/', (req, res) => {
  const newId = (cars.at(-1)?.id || 0) + 1;
  const newCar = { id: newId, ...req.body };
  cars.push(newCar);
  res.status(201).json({ message: 'Car created', data: newCar });
});

// DELETE 
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  cars = cars.filter(c => c.id !== id);
  res.json({ message: `Car ${id} deleted` });
});

module.exports = router;
