const express = require('express');
const path = require('path');
const carRoutes = require('./routes/Cars');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/screens', express.static(path.join(__dirname, 'screens')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'screens', 'homepage.html'));
});

app.use('/cars', carRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
