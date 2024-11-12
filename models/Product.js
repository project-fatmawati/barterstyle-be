const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  weatherRecommendation: {
    temperatureRange: {
      min: { type: Number, required: true, min: -50, max: 50 },
      max: { type: Number, required: true, min: -50, max: 50 },
    },
    weatherType: {
      type: String,
      required: true,
      enum: ['Sunny', 'Rainy', 'Snowy', 'Cloudy', 'Windy']
    },
  },
  available: { type: Boolean, default: true },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: { 
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(value);
      },
      message: 'Invalid image URL format'
    }
  }
}, {
  timestamps: true,
});
module.exports = mongoose.model('Product', productSchema);
