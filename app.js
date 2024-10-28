const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');


app.use(cors());

// Middleware
app.use(express.json());

// Koneksi ke MongoDB tanpa opsi yang usang
const db = mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Database connected successfully');
        // Middleware routes setelah koneksi berhasil
        const allRoutes = require("./routes");
        app.use(allRoutes);
    })
    .catch(err => {
        console.log('Database connection failed:', err);
        process.exit(1);
    });

// Jalankan server
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
