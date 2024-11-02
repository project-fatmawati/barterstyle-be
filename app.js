const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB tanpa opsi yang usang
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Database connected successfully');

        const allRoutes = require("./routes");
        app.use(allRoutes);
    })
    .catch(err => {
        console.log('Database connection failed:', err);
        process.exit(1);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
