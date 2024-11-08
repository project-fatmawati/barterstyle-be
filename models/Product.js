const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    size: { type: String, required: true },
    condition: { type: String, required: true },
    weatherRecommendation: {
      temperatureRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
      },
      weatherType: { type: String, required: true },
    },
    available: { type: Boolean, default: true },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
