const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

// Koneksi ke MongoDB dengan async/await untuk menangani error
(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed:', error);
    process.exit(1);
  }
})();

// Menggunakan semua rute
const allRoutes = require('./routes');
app.use(allRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
