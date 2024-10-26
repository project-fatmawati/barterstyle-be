const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Koneksi ke MongoDB tanpa opsi yang usang
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection failed:', err));

// Jalankan server
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
