const mongoose = require('mongoose');

// Schema untuk Product 
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true }, 
    condition: { type: String, required: true },
    weatherRecommendation: {
        temperatureRange: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        weatherType: { type: String, required: true } // Menggunakan tipe String untuk weatherType
    },
    available: { type: Boolean, default: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
